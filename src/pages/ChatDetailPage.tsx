import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import { toast } from "@/components/ui";
import { ChatDetailContent, CHAT_DETAILS, useCreateChatRoom } from "@/features/chat";

export default function ChatDetailPage() {
  const navigate = useNavigate();
  const { chatId } = useParams();

  const parsedChatId = Number(chatId);
  const chatDetail = Number.isNaN(parsedChatId) ? undefined : CHAT_DETAILS[parsedChatId];
  const {
    data: chatRoom,
    isError: isCreateChatRoomError,
    mutate: createChatRoom,
  } = useCreateChatRoom();

  useEffect(() => {
    if (!chatDetail) {
      navigate("/chat", { replace: true });
      return;
    }

    createChatRoom({ targetUserId: chatDetail.id });
  }, [chatDetail, createChatRoom, navigate]);

  useEffect(() => {
    if (isCreateChatRoomError) {
      toast.error("채팅방을 불러오지 못했습니다.");
    }
  }, [isCreateChatRoomError]);

  if (!chatDetail) {
    return null;
  }

  const handleRecruitClick = () => {
    if (!chatDetail.recruitPostId) {
      return;
    }

    navigate(`/board/${chatDetail.recruitPostId}`);
  };

  return (
    <ChatDetailContent
      key={chatDetail.id}
      chatDetail={chatDetail}
      roomId={chatRoom?.roomId}
      onBack={() => navigate("/chat")}
      onRecruitClick={handleRecruitClick}
      onRoommateRequestAccept={() => navigate(`/chat/${chatDetail.id}/roommate-confirmed`)}
      onProfileClick={() => navigate(`/roommate/${chatDetail.id}`)}
    />
  );
}
