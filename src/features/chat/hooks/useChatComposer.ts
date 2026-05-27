import { useRef, useState } from "react";
import { isAxiosError } from "axios";

import type { ApiResponse } from "@/api";
import { toast } from "@/components/ui";
import { useSendRoommateApplication } from "@/features/chat/hooks/useSendRoommateApplication";
import { useChatWebSocket } from "@/features/chat/hooks/useChatWebSocket";
import { useInputMenuState } from "@/features/chat/hooks/useInputMenuState";
import type {
  ChatDetail,
  ChatErrorMessage,
  ChatInputMenuAction,
  ChatMessage,
  ChatReceivedMessage,
  ChatRoommateInviteMessageData,
} from "@/features/chat/types";
import { formatMessageDateLabel, formatMessageTime } from "@/features/chat/utils";

interface UseChatComposerParams {
  chatDetail: ChatDetail;
  currentUserId?: number | null;
  initialMessages?: ChatMessage[];
  roomId?: number;
}

function createInviteMessage(
  id: number,
  recipientName: string,
  applicationId?: number,
): ChatMessage {
  return {
    applicationId,
    id,
    recipientName,
    type: "roommate_invite",
  };
}

function getNextMessageId(messages: ChatMessage[]) {
  return Math.max(0, ...messages.map((message) => message.id)) + 1;
}

function isInviteMessage(message: ChatMessage): message is ChatRoommateInviteMessageData {
  return message.type === "roommate_invite";
}

function hasRoommateApplicationMessage(messages: ChatMessage[], isOutgoing: boolean) {
  return messages.some((message) =>
    isOutgoing ? message.type === "roommate_invite" : message.type === "roommate_request",
  );
}

function getApiErrorMessage(error: unknown, fallbackMessage: string) {
  if (!isAxiosError<ApiResponse<null>>(error)) {
    return fallbackMessage;
  }

  return error.response?.data.message ?? fallbackMessage;
}

function useChatComposer({
  chatDetail,
  currentUserId,
  initialMessages,
  roomId,
}: UseChatComposerParams) {
  const pendingOutgoingMessagesRef = useRef<string[]>([]);
  const [draftMessage, setDraftMessage] = useState("");
  const [inviteSheetOpen, setInviteSheetOpen] = useState(false);
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]);
  const {
    closeInputMenu,
    completeInputMenuClose,
    inputMenuClosing,
    inputMenuOpen,
    toggleInputMenu,
  } = useInputMenuState();
  const { isPending: isSendingInviteRequest, mutate: sendRoommateApplication } =
    useSendRoommateApplication();
  const baseMessages = initialMessages ?? chatDetail.messages;
  const messages = [
    ...baseMessages,
    ...localMessages.filter(
      (localMessage) =>
        !baseMessages.some((baseMessage) => baseMessage.id === localMessage.id) &&
        !(
          localMessage.type === "roommate_invite" &&
          hasRoommateApplicationMessage(baseMessages, true)
        ) &&
        !(
          localMessage.type === "roommate_request" &&
          hasRoommateApplicationMessage(baseMessages, false)
        ),
    ),
  ];

  const appendReceivedMessage = (receivedMessage: ChatReceivedMessage) => {
    console.log("[chat] appendReceivedMessage called", { receivedMessage, roomId });

    if (roomId == null || receivedMessage.roomId !== roomId) {
      console.log("[chat] appendReceivedMessage skipped by room mismatch", {
        receivedRoomId: receivedMessage.roomId,
        roomId,
      });
      return;
    }

    setLocalMessages((prev) => {
      if (
        baseMessages.some((message) => message.id === receivedMessage.messageId) ||
        prev.some((message) => message.id === receivedMessage.messageId)
      ) {
        console.log("[chat] appendReceivedMessage skipped by duplicated message", {
          messageId: receivedMessage.messageId,
        });
        return prev;
      }

      const pendingMessageIndex = pendingOutgoingMessagesRef.current.findIndex(
        (message) => message === receivedMessage.content,
      );
      const isOutgoing =
        currentUserId != null
          ? receivedMessage.senderId === currentUserId
          : pendingMessageIndex >= 0;

      if (currentUserId == null && pendingMessageIndex >= 0) {
        pendingOutgoingMessagesRef.current.splice(pendingMessageIndex, 1);
      }

      const isApplicationMessage = receivedMessage.messageType === "APPLICATION_SENT";
      console.log("[chat] appendReceivedMessage parsed", {
        isApplicationMessage,
        isOutgoing,
        messageType: receivedMessage.messageType,
      });

      if (
        isApplicationMessage &&
        hasRoommateApplicationMessage([...baseMessages, ...prev], isOutgoing)
      ) {
        console.log("[chat] appendReceivedMessage skipped by existing application bubble", {
          isOutgoing,
        });
        return prev;
      }

      const nextMessage: ChatMessage = isApplicationMessage
        ? isOutgoing
          ? createInviteMessage(receivedMessage.messageId, chatDetail.nickname)
          : {
              applicationId: receivedMessage.applicationId,
              ...formatMessageDateLabel(receivedMessage.createdAt),
              id: receivedMessage.messageId,
              requesterName: chatDetail.nickname,
              sentAt: formatMessageTime(receivedMessage.createdAt),
              type: "roommate_request",
            }
        : {
            ...formatMessageDateLabel(receivedMessage.createdAt),
            id: receivedMessage.messageId,
            messageType: receivedMessage.messageType,
            sentAt: formatMessageTime(receivedMessage.createdAt),
            text: receivedMessage.content,
            type: isOutgoing ? "outgoing" : "incoming",
          };

      console.log("[chat] appendReceivedMessage added local message", nextMessage);
      return [...prev, nextMessage];
    });
  };

  const handleChatErrorMessage = (errorMessage: ChatErrorMessage) => {
    console.error("[chat] WebSocket error message received.", errorMessage);
    toast.error(errorMessage.message);
  };

  const { sendMessage, status: connectionStatus } = useChatWebSocket({
    enabled: roomId != null,
    onErrorMessage: handleChatErrorMessage,
    onMessage: appendReceivedMessage,
  });

  const closeInviteSheet = () => {
    setInviteSheetOpen(false);
  };

  const openInviteSheet = () => {
    setInviteSheetOpen(true);
  };

  const handleSubmitMessage = () => {
    const nextMessage = draftMessage.trim();

    if (!nextMessage) {
      return;
    }

    if (roomId == null) {
      toast.error("채팅방을 준비 중입니다. 잠시 후 다시 시도해 주세요.");
      return;
    }

    const isSent = sendMessage({
      content: nextMessage,
      roomId,
      type: "SEND",
    });

    if (!isSent) {
      toast.error("채팅 서버에 연결 중입니다. 잠시 후 다시 시도해 주세요.");
      return;
    }

    pendingOutgoingMessagesRef.current.push(nextMessage);
    setDraftMessage("");
    completeInputMenuClose();
  };

  const handleSendInviteRequest = () => {
    console.log("[chat] roommate invite confirm clicked", {
      roomId,
      targetUserId: chatDetail.id,
      targetUsername: chatDetail.nickname,
    });

    sendRoommateApplication(chatDetail.id, {
      onError: (error) => {
        console.error("[chat] sendRoommateApplication failed", error);
        toast.error(getApiErrorMessage(error, "룸메이트 요청을 보내지 못했어요."));
      },
      onSuccess: (application) => {
        console.log("[chat] sendRoommateApplication succeeded", application);
        setLocalMessages((prev) => {
          const currentMessages = [...messages, ...prev];

          if (hasRoommateApplicationMessage(currentMessages, true)) {
            console.log("[chat] invite bubble skipped by existing outgoing application bubble", {
              application,
            });
            return prev;
          }

          const nextMessageId = currentMessages.some(
            (message) => message.id === application.applicationId,
          )
            ? getNextMessageId(currentMessages)
            : application.applicationId;

          console.log("[chat] invite bubble appended", {
            application,
            nextMessageId,
          });
          return [
            ...prev,
            createInviteMessage(nextMessageId, chatDetail.nickname, application.applicationId),
          ];
        });
        closeInviteSheet();
        toast.success(`${chatDetail.nickname}님께 룸메이트 요청을 보냈어요`);
      },
    });
  };

  const handleCancelInviteRequest = (messageId: number) => {
    const canceledInvite = messages.find(
      (message): message is ChatRoommateInviteMessageData =>
        message.id === messageId && isInviteMessage(message),
    );

    setLocalMessages((prev) => prev.filter((message) => message.id !== messageId));

    if (canceledInvite) {
      toast.success(`${canceledInvite.recipientName}님께 보낸 룸메이트 요청을 취소했어요`);
    }
  };

  const handleInputMenuAction = (action: ChatInputMenuAction) => {
    completeInputMenuClose();

    if (action === "invite") {
      openInviteSheet();
    }
  };

  return {
    closeInputMenu,
    closeInviteSheet,
    completeInputMenuClose,
    connectionStatus,
    draftMessage,
    handleCancelInviteRequest,
    handleInputMenuAction,
    handleSendInviteRequest,
    handleSubmitMessage,
    inputMenuClosing,
    inputMenuOpen,
    isSendingInviteRequest,
    inviteSheetOpen,
    messages,
    setDraftMessage,
    toggleInputMenu,
  };
}

export { useChatComposer };
