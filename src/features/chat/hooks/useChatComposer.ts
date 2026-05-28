import { useRef, useState } from "react";

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
import {
  createInviteMessage,
  createReceivedChatMessage,
  createRoommateResultMessage,
  getNextMessageId,
  hasRoommateApplicationMessage,
  isInviteMessage,
} from "@/features/chat/utils";
import { getApiErrorMessage } from "@/lib/api-error";

interface UseChatComposerParams {
  chatDetail: ChatDetail;
  currentUserId?: number | null;
  initialMessages?: ChatMessage[];
  onLeaveChatRoom?: () => void;
  onRoommateRequestAccept?: (
    applicationId?: number,
    options?: { onSuccess?: (processedAt?: string) => void },
  ) => void;
  roomId?: number;
}

function useChatComposer({
  chatDetail,
  currentUserId,
  initialMessages,
  onLeaveChatRoom,
  onRoommateRequestAccept,
  roomId,
}: UseChatComposerParams) {
  const pendingOutgoingMessagesRef = useRef<string[]>([]);
  const [draftMessage, setDraftMessage] = useState("");
  const [inviteSheetOpen, setInviteSheetOpen] = useState(false);
  const [leaveSheetOpen, setLeaveSheetOpen] = useState(false);
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
    if (roomId == null || receivedMessage.roomId !== roomId) {
      return;
    }

    setLocalMessages((prev) => {
      if (
        baseMessages.some((message) => message.id === receivedMessage.messageId) ||
        prev.some((message) => message.id === receivedMessage.messageId)
      ) {
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
      if (
        isApplicationMessage &&
        hasRoommateApplicationMessage([...baseMessages, ...prev], isOutgoing)
      ) {
        return prev;
      }

      const nextMessage = createReceivedChatMessage({
        isOutgoing,
        partnerName: chatDetail.nickname,
        receivedMessage,
      });

      return [...prev, nextMessage];
    });
  };

  const handleChatErrorMessage = (errorMessage: ChatErrorMessage) => {
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

  const closeLeaveSheet = () => {
    setLeaveSheetOpen(false);
  };

  const openInviteSheet = () => {
    setInviteSheetOpen(true);
  };

  const openLeaveSheet = () => {
    setLeaveSheetOpen(true);
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
    sendRoommateApplication(chatDetail.id, {
      onError: (error) => {
        toast.error(getApiErrorMessage(error, "룸메이트 요청을 보내지 못했어요."));
      },
      onSuccess: (application) => {
        setLocalMessages((prev) => {
          const currentMessages = [...baseMessages, ...prev];

          if (hasRoommateApplicationMessage(currentMessages, true)) {
            return prev;
          }

          const nextMessageId = currentMessages.some(
            (message) => message.id === application.applicationId,
          )
            ? getNextMessageId(currentMessages)
            : application.applicationId;

          return [
            ...prev,
            createInviteMessage({
              applicationId: application.applicationId,
              createdAt: application.createdAt,
              id: nextMessageId,
              recipientName: chatDetail.nickname,
            }),
          ];
        });
        closeInviteSheet();
        toast.success(`${chatDetail.nickname}님께 룸메이트 요청을 보냈어요`);
      },
    });
  };

  const handleCancelInviteRequest = (messageId: number) => {
    const isCanceledInviteMessage = (
      message: ChatMessage,
    ): message is ChatRoommateInviteMessageData =>
      message.id === messageId && isInviteMessage(message);

    const canceledInvite = messages.find(isCanceledInviteMessage);

    setLocalMessages((prev) => prev.filter((message) => message.id !== messageId));

    if (canceledInvite) {
      toast.success(`${canceledInvite.recipientName}님께 보낸 룸메이트 요청을 취소했어요`);
    }
  };

  const appendAcceptedRequestMessage = (applicationId?: number, processedAt?: string) => {
    const createdAt = processedAt ?? new Date().toISOString();

    setLocalMessages((prev) => {
      const currentMessages = [...messages, ...prev];
      const hasAcceptedApplication = currentMessages.some(
        (message) =>
          message.type === "roommate_accept" &&
          applicationId != null &&
          message.applicationId === applicationId,
      );

      if (hasAcceptedApplication) {
        return prev;
      }

      return [
        ...prev,
        createRoommateResultMessage({
          applicationId,
          createdAt,
          id: getNextMessageId(currentMessages),
          partnerName: chatDetail.nickname,
          type: "roommate_accept",
          variant: "sent",
        }),
      ];
    });
  };

  const handleRoommateRequestAccept = (applicationId?: number) => {
    onRoommateRequestAccept?.(applicationId, {
      onSuccess: (processedAt) => appendAcceptedRequestMessage(applicationId, processedAt),
    });
  };

  const handleInputMenuAction = (action: ChatInputMenuAction) => {
    completeInputMenuClose();

    if (action === "invite") {
      openInviteSheet();
      return;
    }

    if (action === "leave") {
      openLeaveSheet();
    }
  };

  const handleConfirmLeaveChatRoom = () => {
    closeLeaveSheet();
    onLeaveChatRoom?.();
  };

  return {
    closeInputMenu,
    closeInviteSheet,
    closeLeaveSheet,
    completeInputMenuClose,
    connectionStatus,
    draftMessage,
    handleCancelInviteRequest,
    handleConfirmLeaveChatRoom,
    handleRoommateRequestAccept,
    handleInputMenuAction,
    handleSendInviteRequest,
    handleSubmitMessage,
    inputMenuClosing,
    inputMenuOpen,
    isSendingInviteRequest,
    inviteSheetOpen,
    leaveSheetOpen,
    messages,
    setDraftMessage,
    toggleInputMenu,
  };
}

export { useChatComposer };
