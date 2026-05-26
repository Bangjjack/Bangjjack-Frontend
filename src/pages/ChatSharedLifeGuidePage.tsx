import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import { SharedLifeGuideContent, type ChatDetail } from "@/features/chat";

type SharedLifeGuideChatDetail = ChatDetail & Required<Pick<ChatDetail, "age" | "department">>;

function hasSharedLifeGuideData(
  chatDetail: ChatDetail | undefined,
): chatDetail is SharedLifeGuideChatDetail {
  return chatDetail?.age !== undefined && chatDetail.department !== undefined;
}

function getChatDetailFromState(state: unknown) {
  return typeof state === "object" && state !== null && "chatDetail" in state
    ? (state as { chatDetail?: ChatDetail }).chatDetail
    : undefined;
}

export default function ChatSharedLifeGuidePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { chatId } = useParams();

  const parsedChatId = Number(chatId);
  const chatDetail = getChatDetailFromState(location.state);

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
      onBack={() => navigate(`/chat/${parsedChatId}/roommate-confirmed`, { state: location.state })}
      onContinueChat={() => navigate(`/chat/${parsedChatId}`, { state: location.state })}
      onGoHome={() => navigate("/home")}
    />
  );
}
