import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import { SharedLifeGuideContent, type ChatDetail } from "@/features/chat";
import { useMatchReport } from "@/features/board/hooks";

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

  const {
    data: matchReport,
    isLoading,
    isError,
  } = useMatchReport(chatDetail?.id ?? 0, !!chatDetail);

  useEffect(() => {
    if (!chatDetail) {
      navigate("/chat", { replace: true });
    }
  }, [chatDetail, navigate]);

  if (!chatDetail) {
    return null;
  }

  const targetChatId = Number.isFinite(parsedChatId) ? parsedChatId : chatDetail.id;

  if (isLoading) {
    return (
      <div className="flex h-dvh items-center justify-center bg-bg-primary">
        <div className="size-10 animate-spin rounded-full border-4 border-text-disabled border-t-brand-primary" />
      </div>
    );
  }

  if (isError || !matchReport) {
    return (
      <div className="flex h-dvh flex-col items-center justify-center gap-3 bg-bg-primary">
        <p className="typo-body2 text-text-caption">매칭 리포트를 불러오지 못했어요</p>
      </div>
    );
  }

  return (
    <SharedLifeGuideContent
      age={chatDetail.age}
      avatarSeed={chatDetail.id}
      department={chatDetail.department}
      matchReport={matchReport}
      nickname={chatDetail.nickname}
      profileImage={chatDetail.profileImage}
      onBack={() => navigate(`/chat/${targetChatId}/roommate-confirmed`, { state: location.state })}
      onContinueChat={() => navigate(`/chat/${targetChatId}`, { state: location.state })}
      onGoHome={() => navigate("/home")}
    />
  );
}
