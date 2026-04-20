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
  const [inviteSheetOpen, setInviteSheetOpen] = useState(false);
  const [messages, setMessages] = useState(chatDetail.messages);

  const closeInputMenu = () => {
    setInputMenuOpen(false);
  };

  const toggleInputMenu = () => {
    setInputMenuOpen((prev) => !prev);
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
    closeInputMenu();
  };

  const handleInputMenuAction = (action: ChatInputMenuAction) => {
    closeInputMenu();

    if (action === "invite") {
      openInviteSheet();
    }
  };

  return {
    closeInputMenu,
    closeInviteSheet,
    draftMessage,
    handleInputMenuAction,
    handleSubmitMessage,
    inputMenuOpen,
    inviteSheetOpen,
    messages,
    setDraftMessage,
    toggleInputMenu,
  };
}

export { useChatComposer };
