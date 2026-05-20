import { useRef, useState } from "react";

import { toast } from "@/components/ui";
import { useChatWebSocket } from "@/features/chat/hooks/useChatWebSocket";
import type {
  ChatDetail,
  ChatErrorMessage,
  ChatInputMenuAction,
  ChatMessage,
  ChatReceivedMessage,
  ChatRoommateInviteMessageData,
  ChatTextMessage,
} from "@/features/chat/types";
import { useAuthStore } from "@/stores/authStore";

interface UseChatComposerParams {
  chatDetail: ChatDetail;
  roomId?: number;
}

function createInviteMessage(id: number, recipientName: string): ChatMessage {
  return {
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

function formatMessageTime(createdAt: string) {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return createdAt;
  }

  return new Intl.DateTimeFormat("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    "matchMedia" in window &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function useChatComposer({ chatDetail, roomId }: UseChatComposerParams) {
  const currentUserId = useAuthStore((state) => state.userId);
  const pendingOutgoingMessagesRef = useRef<string[]>([]);
  const [draftMessage, setDraftMessage] = useState("");
  const [inputMenuOpen, setInputMenuOpen] = useState(false);
  const [inputMenuClosing, setInputMenuClosing] = useState(false);
  const [inviteSheetOpen, setInviteSheetOpen] = useState(false);
  const [messages, setMessages] = useState(chatDetail.messages);

  const appendReceivedMessage = (receivedMessage: ChatReceivedMessage) => {
    if (roomId == null || receivedMessage.roomId !== roomId) {
      return;
    }

    setMessages((prev) => {
      if (prev.some((message) => message.id === receivedMessage.messageId)) {
        return prev;
      }

      const pendingMessageIndex = pendingOutgoingMessagesRef.current.findIndex(
        (message) => message === receivedMessage.content,
      );
      const isOutgoing =
        (currentUserId != null && receivedMessage.senderId === currentUserId) ||
        pendingMessageIndex >= 0;

      if (pendingMessageIndex >= 0) {
        pendingOutgoingMessagesRef.current.splice(pendingMessageIndex, 1);
      }

      const nextMessage: ChatTextMessage = {
        id: receivedMessage.messageId,
        messageType: receivedMessage.messageType,
        sentAt: formatMessageTime(receivedMessage.createdAt),
        text: receivedMessage.content,
        type: isOutgoing ? "outgoing" : "incoming",
      };

      return [...prev, nextMessage];
    });
  };

  const handleChatErrorMessage = (errorMessage: ChatErrorMessage) => {
    console.error("[chat] WebSocket error message received.", errorMessage);
    toast.error(errorMessage.message);
  };

  const { sendMessage, status: connectionStatus } = useChatWebSocket({
    onErrorMessage: handleChatErrorMessage,
    onMessage: appendReceivedMessage,
  });

  const openInputMenu = () => {
    setInputMenuClosing(false);
    setInputMenuOpen(true);
  };

  const completeInputMenuClose = () => {
    setInputMenuClosing(false);
    setInputMenuOpen(false);
  };

  const closeInputMenu = () => {
    if (!inputMenuOpen || inputMenuClosing) {
      return;
    }

    setInputMenuClosing(true);

    if (prefersReducedMotion()) {
      completeInputMenuClose();
    }
  };

  const toggleInputMenu = () => {
    if (inputMenuOpen) {
      closeInputMenu();
      return;
    }

    openInputMenu();
  };

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
    setMessages((prev) => [
      ...prev,
      createInviteMessage(getNextMessageId(prev), chatDetail.nickname),
    ]);
    closeInviteSheet();
    toast.success(`${chatDetail.nickname}님께 룸메이트 요청을 보냈어요`);
  };

  const handleCancelInviteRequest = (messageId: number) => {
    const canceledInvite = messages.find(
      (message): message is ChatRoommateInviteMessageData =>
        message.id === messageId && isInviteMessage(message),
    );

    setMessages((prev) => prev.filter((message) => message.id !== messageId));

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
    inviteSheetOpen,
    messages,
    setDraftMessage,
    toggleInputMenu,
  };
}

export { useChatComposer };
