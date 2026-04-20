import { useState } from "react";

import type { ChatDetail, ChatInputMenuAction, ChatMessage } from "@/features/chat/types";

type UseChatComposerParams = {
  chatDetail: ChatDetail;
};

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

  const closeInputMenu = () => {
    if (!inputMenuOpen || inputMenuClosing) {
      return;
    }

    setInputMenuClosing(true);
  };

  const completeInputMenuClose = () => {
    setInputMenuClosing(false);
    setInputMenuOpen(false);
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

    setMessages((prev) => [...prev, createOutgoingMessage(prev.length + 1, nextMessage)]);
    setDraftMessage("");
    completeInputMenuClose();
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
    handleInputMenuAction,
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
