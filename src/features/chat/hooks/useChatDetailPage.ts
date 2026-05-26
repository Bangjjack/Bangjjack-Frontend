import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import { toast } from "@/components/ui";
import { useChatMessages } from "@/features/chat/hooks/useChatMessages";
import { useChatRooms } from "@/features/chat/hooks/useChatRooms";
import type { ChatDetail, ChatMessage, ChatRoom, ChatRoomListItem } from "@/features/chat/types";
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

type ChatDetailLocationState = {
  chatDetail: ChatDetail;
  chatRoom: ChatRoom;
};

function isChatDetailLocationState(state: unknown): state is ChatDetailLocationState {
  return (
    typeof state === "object" &&
    state !== null &&
    "chatDetail" in state &&
    "chatRoom" in state &&
    typeof (state as ChatDetailLocationState).chatRoom.roomId === "number"
  );
}

function mapChatRoomListItemToChatDetail(chatRoom: ChatRoomListItem): ChatDetail {
  return {
    dateLabel: "",
    id: chatRoom.partnerId,
    matchRate: 0,
    messages: [],
    nickname: chatRoom.partnerName,
    profileSummary: [],
    startSource: "ai_recommendation",
  };
}

function mapChatRoomListItemToChatRoom(chatRoom: ChatRoomListItem): ChatRoom {
  return {
    createdAt: chatRoom.lastMessageAt ?? "",
    isNewRoom: false,
    participants: [{ userId: chatRoom.partnerId }],
    roomId: chatRoom.roomId,
    roomType: "DIRECT",
  };
}

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
  const location = useLocation();
  const { chatId } = useParams();
  const authUserId = useAuthStore((state) => state.userId);

  const parsedChatId = Number(chatId);
  const locationState =
    isChatDetailLocationState(location.state) && location.state.chatRoom.roomId === parsedChatId
      ? location.state
      : undefined;
  const {
    data: chatRoomsData,
    isError: isChatRoomsError,
    isPending: isChatRoomsPending,
  } = useChatRooms();
  const chatRoomFromList = chatRoomsData?.rooms.find(
    (chatRoom) => chatRoom.roomId === parsedChatId,
  );
  const chatDetail =
    locationState?.chatDetail ??
    (chatRoomFromList ? mapChatRoomListItemToChatDetail(chatRoomFromList) : undefined);
  const activeChatRoom =
    locationState?.chatRoom ??
    (chatRoomFromList ? mapChatRoomListItemToChatRoom(chatRoomFromList) : undefined);
  const {
    data: chatMessagesData,
    fetchNextPage: fetchPreviousMessages,
    hasNextPage: hasPreviousMessages,
    isError: isChatMessagesError,
    isFetchingNextPage: isLoadingPreviousMessages,
  } = useChatMessages({
    roomId: Number.isNaN(parsedChatId) ? undefined : parsedChatId,
  });

  useEffect(() => {
    if (Number.isNaN(parsedChatId)) {
      navigate("/chat", { replace: true });
      return;
    }

    if (chatDetail || isChatRoomsPending) {
      return;
    }

    navigate("/chat", { replace: true });
  }, [chatDetail, isChatRoomsPending, navigate, parsedChatId]);

  useEffect(() => {
    if (isChatRoomsError) {
      toast.error("채팅방을 불러오지 못했습니다.");
    }
  }, [isChatRoomsError]);

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

  const currentUserId = getCurrentUserIdFromChatRoom(activeChatRoom, chatDetail.id, authUserId);
  const initialMessages = chatMessagesData
    ? mapHistoryMessagesToChatMessages(chatMessagesData.messages, currentUserId)
    : undefined;

  const contentProps: ChatDetailPageProps = {
    chatDetail,
    currentUserId,
    hasPreviousMessages,
    initialMessages,
    isLoadingPreviousMessages,
    roomId: parsedChatId,
    onBack: () => navigate("/chat"),
    onLoadPreviousMessages: fetchPreviousMessages,
    onProfileClick: () => navigate(`/roommate/${chatDetail.id}`),
    onRecruitClick: handleRecruitClick,
    onRoommateRequestAccept: () =>
      navigate(`/chat/${parsedChatId}/roommate-confirmed`, { state: { chatDetail } }),
  };

  return contentProps;
}

export { useChatDetailPage };
