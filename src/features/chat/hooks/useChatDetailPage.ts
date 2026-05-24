import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import { toast } from "@/components/ui";
import { useChatMessages } from "@/features/chat/hooks/useChatMessages";
import { useCreateChatRoom } from "@/features/chat/hooks/useCreateChatRoom";
import { CHAT_DETAILS } from "@/features/chat/mocks";
import type { ChatDetail, ChatMessage, ChatRoom } from "@/features/chat/types";
import { mapHistoryMessagesToChatMessages } from "@/features/chat/utils/chatHistoryMessages";
import { useAuthStore } from "@/stores/authStore";

export type ChatDetailPageProps = {
  chatDetail: ChatDetail;
  className?: string;
  currentUserId?: number | null;
  hasPreviousMessages?: boolean;
  initialMessages?: ChatMessage[];
  isLoadingPreviousMessages?: boolean;
  roomId?: number;
  onBack: () => void;
  onLoadPreviousMessages?: () => void | Promise<unknown>;
  onProfileClick?: () => void;
  onRecruitClick?: () => void;
  onRoommateRequestAccept?: () => void;
};

function getCurrentUserIdFromChatRoom(
  chatRoom: ChatRoom | undefined,
  targetUserId: number,
  fallbackUserId: number | null,
) {
  const participantUserIds = chatRoom?.participants.map((participant) => participant.userId) ?? [];
  const viewerUserId = participantUserIds.find((userId) => userId !== targetUserId);

  return viewerUserId ?? fallbackUserId;
}

function useChatDetailPage() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const authUserId = useAuthStore((state) => state.userId);

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

  const currentUserId = getCurrentUserIdFromChatRoom(chatRoom, chatDetail.id, authUserId);
  const initialMessages = chatMessagesData
    ? mapHistoryMessagesToChatMessages(chatMessagesData.messages, currentUserId)
    : undefined;

  const contentProps: ChatDetailPageProps = {
    chatDetail,
    currentUserId,
    hasPreviousMessages,
    initialMessages,
    isLoadingPreviousMessages,
    roomId: chatRoom?.roomId,
    onBack: () => navigate("/chat"),
    onLoadPreviousMessages: fetchPreviousMessages,
    onProfileClick: () => navigate(`/roommate/${chatDetail.id}`),
    onRecruitClick: handleRecruitClick,
    onRoommateRequestAccept: () => navigate(`/chat/${chatDetail.id}/roommate-confirmed`),
  };

  return contentProps;
}

export { useChatDetailPage };
