import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import { ChatRoommateConfirmedContent } from "@/features/chat";
import type { ChatDetail } from "@/features/chat/types";

type ConfirmedRoommateChatDetail = ChatDetail & Required<Pick<ChatDetail, "age" | "department">>;

function hasConfirmedRoommateData(
  chatDetail: ChatDetail | undefined,
): chatDetail is ConfirmedRoommateChatDetail {
  return chatDetail?.age !== undefined && chatDetail.department !== undefined;
}

function getChatDetailFromState(state: unknown) {
  return typeof state === "object" && state !== null && "chatDetail" in state
    ? (state as { chatDetail?: ChatDetail }).chatDetail
    : undefined;
}

export default function ChatRoommateConfirmedPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { chatId } = useParams();

  const parsedChatId = Number(chatId);
  const chatDetail = getChatDetailFromState(location.state);

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
      onContinueChat={() => navigate(`/chat/${parsedChatId}`, { state: location.state })}
      onGuideClick={() =>
        navigate(`/chat/${parsedChatId}/shared-life-guide`, { state: location.state })
      }
      onGoHome={() => navigate("/home")}
    />
  );
}
