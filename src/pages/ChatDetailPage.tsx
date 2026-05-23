import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import { toast } from "@/components/ui";
import {
  ChatDetailContent,
  CHAT_DETAILS,
  useChatMessages,
  useCreateChatRoom,
} from "@/features/chat";
import type { ChatMessage, ChatMessageHistoryItem } from "@/features/chat/types";
import { formatMessageDateLabel, formatMessageTime } from "@/features/chat/utils";
import { useAuthStore } from "@/stores/authStore";

function mapHistoryMessageToChatMessage(
  message: ChatMessageHistoryItem,
  currentUserId: number | null,
): ChatMessage {
  const { dateKey, dateLabel } = formatMessageDateLabel(message.createdAt);

  return {
    dateKey,
    dateLabel,
    id: message.messageId,
    sentAt: formatMessageTime(message.createdAt),
    text: message.content,
    type: currentUserId != null && message.senderId === currentUserId ? "outgoing" : "incoming",
  };
}

function compareHistoryMessageByCreatedAt(
  firstMessage: ChatMessageHistoryItem,
  secondMessage: ChatMessageHistoryItem,
) {
  const firstCreatedAt = new Date(firstMessage.createdAt).getTime();
  const secondCreatedAt = new Date(secondMessage.createdAt).getTime();

  if (Number.isNaN(firstCreatedAt) || Number.isNaN(secondCreatedAt)) {
    return firstMessage.messageId - secondMessage.messageId;
  }

  return firstCreatedAt - secondCreatedAt;
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
  const {
    data: chatMessagesData,
    fetchNextPage: fetchPreviousMessages,
    hasNextPage: hasPreviousMessages,
    isError: isChatMessagesError,
    isFetchingNextPage: isLoadingPreviousMessages,
  } = useChatMessages({
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

  const initialMessages = chatMessagesData?.messages
    .toSorted(compareHistoryMessageByCreatedAt)
    .map((message) => mapHistoryMessageToChatMessage(message, currentUserId));

  return (
    <ChatDetailContent
      key={chatDetail.id}
      chatDetail={chatDetail}
      currentUserId={currentUserId}
      hasPreviousMessages={hasPreviousMessages}
      initialMessages={initialMessages}
      isLoadingPreviousMessages={isLoadingPreviousMessages}
      roomId={chatRoom?.roomId}
      onBack={() => navigate("/chat")}
      onLoadPreviousMessages={fetchPreviousMessages}
      onRecruitClick={handleRecruitClick}
      onRoommateRequestAccept={() => navigate(`/chat/${chatDetail.id}/roommate-confirmed`)}
      onProfileClick={() => navigate(`/roommate/${chatDetail.id}`)}
    />
  );
}
