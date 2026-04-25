import { useNavigate, useParams } from "react-router";

import { ChatRoommateConfirmedContent, CHAT_DETAILS } from "@/features/chat";

export default function ChatRoommateConfirmedPage() {
  const navigate = useNavigate();
  const { chatId } = useParams();

  const parsedChatId = Number(chatId);
  const chatDetail = Number.isNaN(parsedChatId) ? undefined : CHAT_DETAILS[parsedChatId];

  return (
    <ChatRoommateConfirmedContent
      age={chatDetail?.age}
      department={chatDetail?.department}
      matchRate={chatDetail?.matchRate}
      nickname={chatDetail?.nickname}
      onContinueChat={() => navigate(chatDetail ? `/chat/${chatDetail.id}` : "/chat")}
      onGoHome={() => navigate("/home")}
    />
  );
}
