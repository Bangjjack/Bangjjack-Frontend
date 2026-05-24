import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import { ChatRoommateConfirmedContent, CHAT_DETAILS } from "@/features/chat";
import type { ChatDetail } from "@/features/chat/types";

type ConfirmedRoommateChatDetail = ChatDetail & Required<Pick<ChatDetail, "age" | "department">>;

function hasConfirmedRoommateData(
  chatDetail: ChatDetail | undefined,
): chatDetail is ConfirmedRoommateChatDetail {
  return chatDetail?.age !== undefined && chatDetail.department !== undefined;
}

export default function ChatRoommateConfirmedPage() {
  const navigate = useNavigate();
  const { chatId } = useParams();

  const parsedChatId = Number(chatId);
  const chatDetail = Number.isNaN(parsedChatId) ? undefined : CHAT_DETAILS[parsedChatId];

  useEffect(() => {
    if (!hasConfirmedRoommateData(chatDetail)) {
      navigate("/chat", { replace: true });
    }
  }, [chatDetail, navigate]);

  if (!hasConfirmedRoommateData(chatDetail)) {
    return null;
  }

  return (
    <ChatRoommateConfirmedContent
      age={chatDetail.age}
      avatarSeed={chatDetail.id}
      department={chatDetail.department}
      matchRate={chatDetail.matchRate}
      nickname={chatDetail.nickname}
      onContinueChat={() => navigate(`/chat/${chatDetail.id}`)}
      onGuideClick={() => navigate(`/chat/${chatDetail.id}/shared-life-guide`)}
      onGoHome={() => navigate("/home")}
    />
  );
}
