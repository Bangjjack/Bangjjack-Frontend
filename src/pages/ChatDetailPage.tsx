import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import { toast } from "@/components/ui";
import { ChatDetailContent, CHAT_DETAILS, useChatMessages, useCreateChatRoom } from "@/features/chat";
import type { ChatMessage, ChatMessageHistoryItem } from "@/features/chat/types";
import { useAuthStore } from "@/stores/authStore";

function formatMessageTime(createdAt: string) {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return createdAt;
  }

  return new Intl.DateTimeFormat("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function mapHistoryMessageToChatMessage(
  message: ChatMessageHistoryItem,
  currentUserId: number | null,
): ChatMessage {
  return {
    id: message.messageId,
    sentAt: formatMessageTime(message.createdAt),
    text: message.content,
    type: currentUserId != null && message.senderId === currentUserId ? "outgoing" : "incoming",
  };
}

export default function ChatDetailPage() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const currentUserId = useAuthStore((state) => state.userId);

  const parsedChatId = Number(chatId);
  const chatDetail = Number.isNaN(parsedChatId) ? undefined : CHAT_DETAILS[parsedChatId];
  const {
    data: chatRoom,
    isError: isCreateChatRoomError,
    mutate: createChatRoom,
  } = useCreateChatRoom();
  const { data: chatMessagesData, isError: isChatMessagesError } = useChatMessages({
    roomId: chatRoom?.roomId,
  });

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

  useEffect(() => {
    if (isChatMessagesError) {
      toast.error("채팅 메시지를 불러오지 못했습니다.");
    }
  }, [isChatMessagesError]);

  if (!chatDetail) {
    return null;
  }

  const handleRecruitClick = () => {
    if (!chatDetail.recruitPostId) {
      return;
    }

    navigate(`/board/${chatDetail.recruitPostId}`);
  };

  const initialMessages = chatMessagesData?.messages.map((message) =>
    mapHistoryMessageToChatMessage(message, currentUserId),
  );

  return (
    <ChatDetailContent
      key={chatDetail.id}
      chatDetail={chatDetail}
      initialMessages={initialMessages}
      roomId={chatRoom?.roomId}
      onBack={() => navigate("/chat")}
      onRecruitClick={handleRecruitClick}
      onRoommateRequestAccept={() => navigate(`/chat/${chatDetail.id}/roommate-confirmed`)}
      onProfileClick={() => navigate(`/roommate/${chatDetail.id}`)}
    />
  );
}
