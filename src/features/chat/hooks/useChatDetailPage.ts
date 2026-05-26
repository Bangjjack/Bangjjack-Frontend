import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import { toast } from "@/components/ui";
import { useChatMessages } from "@/features/chat/hooks/useChatMessages";
import { useChatRooms } from "@/features/chat/hooks/useChatRooms";
import type { ChatDetail, ChatMessage, ChatRoom, ChatRoomListItem } from "@/features/chat/types";
import { mapHistoryMessagesToChatMessages } from "@/features/chat/utils/chatHistoryMessages";
import { getChatRoomImportanceTags } from "@/features/chat/utils/chatRoomList";
import { useAuthStore } from "@/stores/authStore";

export type ChatDetailPageState = {
  chatDetail?: ChatDetail;
  composer: {
    currentUserId?: number | null;
    initialMessages?: ChatMessage[];
    roomId?: number;
  };
  messageList: {
    hasPreviousMessages?: boolean;
    isLoadingPreviousMessages?: boolean;
    onLoadPreviousMessages?: () => void | Promise<unknown>;
  };
  navigation: {
    onBack: () => void;
    onProfileClick?: () => void;
    onRecruitClick?: () => void;
    onReportClick?: () => void;
    onRoommateRequestAccept?: () => void;
  };
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
    profileSummary: getChatRoomImportanceTags(chatRoom),
    profileImage: chatRoom.partnerProfileImage,
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

  const handleRecruitClick = () => {
    if (!chatDetail?.recruitPostId) {
      return;
    }

    navigate(`/board/${chatDetail.recruitPostId}`);
  };

  const currentUserId = chatDetail
    ? getCurrentUserIdFromChatRoom(activeChatRoom, chatDetail.id, authUserId)
    : authUserId;
  const initialMessages = chatMessagesData
    ? mapHistoryMessagesToChatMessages(chatMessagesData.messages, currentUserId)
    : undefined;

  const pageState: ChatDetailPageState = {
    chatDetail,
    composer: {
      currentUserId,
      initialMessages,
      roomId: Number.isNaN(parsedChatId) || !chatDetail ? undefined : parsedChatId,
    },
    messageList: {
      hasPreviousMessages,
      isLoadingPreviousMessages,
      onLoadPreviousMessages: fetchPreviousMessages,
    },
    navigation: {
      onBack: () => navigate("/chat"),
      onProfileClick: chatDetail ? () => navigate(`/roommate/${chatDetail.id}`) : undefined,
      onRecruitClick: chatDetail ? handleRecruitClick : undefined,
      onReportClick: chatDetail
        ? () => navigate(`/roommate/${chatDetail.id}/matching-report`)
        : undefined,
      onRoommateRequestAccept: chatDetail
        ? () => navigate(`/chat/${parsedChatId}/roommate-confirmed`, { state: { chatDetail } })
        : undefined,
    },
  };

  return pageState;
}

export { useChatDetailPage };
