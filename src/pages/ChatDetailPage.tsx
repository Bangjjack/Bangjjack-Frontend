import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import { ChatDetailContent } from "@/features/chat/components";
import { CHAT_DETAILS } from "@/features/chat/mocks";

export default function ChatDetailPage() {
  const navigate = useNavigate();
  const { chatId } = useParams();

  const parsedChatId = Number(chatId);
  const chatDetail = Number.isNaN(parsedChatId) ? undefined : CHAT_DETAILS[parsedChatId];

  useEffect(() => {
    if (!chatDetail) {
      navigate("/chat", { replace: true });
    }
  }, [chatDetail, navigate]);

  if (!chatDetail) {
    return null;
  }

  return (
    <ChatDetailContent
      key={chatDetail.id}
      chatDetail={chatDetail}
      onBack={() => navigate("/chat")}
    />
  );
}
