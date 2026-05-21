import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import { CHAT_DETAILS, SharedLifeGuideContent } from "@/features/chat";
import type { ChatDetail } from "@/features/chat/types";

type SharedLifeGuideChatDetail = ChatDetail & Required<Pick<ChatDetail, "age" | "department">>;

function hasSharedLifeGuideData(
  chatDetail: ChatDetail | undefined,
): chatDetail is SharedLifeGuideChatDetail {
  return chatDetail?.age !== undefined && chatDetail.department !== undefined;
}

export default function ChatSharedLifeGuidePage() {
  const navigate = useNavigate();
  const { chatId } = useParams();

  const parsedChatId = Number(chatId);
  const chatDetail = Number.isNaN(parsedChatId) ? undefined : CHAT_DETAILS[parsedChatId];

  useEffect(() => {
    if (!hasSharedLifeGuideData(chatDetail)) {
      navigate("/chat", { replace: true });
    }
  }, [chatDetail, navigate]);

  if (!hasSharedLifeGuideData(chatDetail)) {
    return null;
  }

  return (
    <SharedLifeGuideContent
      age={chatDetail.age}
      avatarSeed={chatDetail.id}
      department={chatDetail.department}
      matchRate={chatDetail.matchRate}
      nickname={chatDetail.nickname}
      onBack={() => navigate(`/chat/${chatDetail.id}/roommate-confirmed`)}
      onContinueChat={() => navigate(`/chat/${chatDetail.id}`)}
      onGoHome={() => navigate("/home")}
    />
  );
}
