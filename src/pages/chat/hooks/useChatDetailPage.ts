import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import { toast } from "@/components/ui";
import {
  CHAT_DETAILS,
  type ChatDetailContentProps,
  type ChatRoom,
  mapHistoryMessagesToChatMessages,
  useChatMessages,
  useCreateChatRoom,
} from "@/features/chat";
import { useAuthStore } from "@/stores/authStore";

type ChatDetailPageContentProps = ChatDetailContentProps;

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

  const contentProps: ChatDetailPageContentProps = {
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
