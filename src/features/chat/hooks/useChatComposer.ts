import { useState } from "react";

import { toast } from "@/components/ui";
import type {
  ChatDetail,
  ChatInputMenuAction,
  ChatMessage,
  ChatRoommateInviteMessageData,
} from "@/features/chat/types";

interface UseChatComposerParams {
  chatDetail: ChatDetail;
}

function createOutgoingMessage(id: number, text: string): ChatMessage {
  return {
    id,
    sentAt: new Intl.DateTimeFormat("ko-KR", {
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date()),
    text,
    type: "outgoing",
  };
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

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    "matchMedia" in window &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function useChatComposer({ chatDetail }: UseChatComposerParams) {
  const [draftMessage, setDraftMessage] = useState("");
  const [inputMenuOpen, setInputMenuOpen] = useState(false);
  const [inputMenuClosing, setInputMenuClosing] = useState(false);
  const [inviteSheetOpen, setInviteSheetOpen] = useState(false);
  const [messages, setMessages] = useState(chatDetail.messages);

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

    setMessages((prev) => [...prev, createOutgoingMessage(getNextMessageId(prev), nextMessage)]);
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
