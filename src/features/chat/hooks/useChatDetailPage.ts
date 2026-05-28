import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import { toast } from "@/components/ui";
import { useChatMessages } from "@/features/chat/hooks/useChatMessages";
import { useChatRooms } from "@/features/chat/hooks/useChatRooms";
import { useLeaveChatRoom } from "@/features/chat/hooks/useLeaveChatRoom";
import { useProcessRoommateApplication } from "@/features/chat/hooks/useProcessRoommateApplication";
import type { ChatDetail, ChatMessage, ChatRoom, ChatRoomListItem } from "@/features/chat/types";
import { mapHistoryMessagesToChatMessages } from "@/features/chat/utils/chatHistoryMessages";
import { getChatRoomImportanceTags } from "@/features/chat/utils/chatRoomList";
import { getApiErrorMessage } from "@/lib/api-error";
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
  isLeavingChatRoom: boolean;
  navigation: {
    onBack: () => void;
    onProfileClick?: () => void;
    onRecruitClick?: () => void;
    onLeaveChatRoom?: () => void;
    onReportClick?: () => void;
    onRoommateRequestAccept?: (
      applicationId?: number,
      options?: { onSuccess?: (processedAt?: string) => void },
    ) => void;
    onRoommateRequestReject?: (applicationId?: number) => void;
  };
  isProcessingRoommateRequest: boolean;
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
  const { isPending: isLeavingChatRoom, mutate: leaveChatRoom } = useLeaveChatRoom();
  const { isPending: isProcessingRoommateRequest, mutate: processRoommateApplication } =
    useProcessRoommateApplication();

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

  const handleLeaveChatRoom = () => {
    if (Number.isNaN(parsedChatId)) {
      toast.error("채팅방 정보를 확인할 수 없어요.");
      return;
    }

    leaveChatRoom(parsedChatId, {
      onError: (error) => {
        toast.error(getApiErrorMessage(error, "채팅방을 나가지 못했어요."));
      },
      onSuccess: () => {
        toast.success("채팅방을 나갔어요.");
        navigate("/chat", { replace: true });
      },
    });
  };

  const handleRoommateRequestAccept = (
    applicationId?: number,
    options?: { onSuccess?: (processedAt?: string) => void },
  ) => {
    if (applicationId == null) {
      toast.error("룸메이트 신청 정보를 확인할 수 없어요.");
      return;
    }

    processRoommateApplication(
      { applicationId, status: "ACCEPTED" },
      {
        onError: (error) => {
          toast.error(getApiErrorMessage(error, "룸메이트 신청 수락에 실패했어요."));
        },
        onSuccess: (application) => {
          options?.onSuccess?.(application.processedAt);
          toast.success("룸메이트 신청을 수락했어요.");

          if (chatDetail) {
            navigate(`/chat/${parsedChatId}/roommate-confirmed`, { state: { chatDetail } });
          }
        },
      },
    );
  };

  const handleRoommateRequestReject = (applicationId?: number) => {
    if (applicationId == null) {
      toast.error("룸메이트 신청 정보를 확인할 수 없어요.");
      return;
    }

    processRoommateApplication(
      { applicationId, status: "REJECTED" },
      {
        onError: (error) => {
          toast.error(getApiErrorMessage(error, "룸메이트 신청 거절에 실패했어요."));
        },
        onSuccess: () => {
          toast.success("룸메이트 신청을 거절했어요.");
        },
      },
    );
  };

  const currentUserId = chatDetail
    ? getCurrentUserIdFromChatRoom(activeChatRoom, chatDetail.id, authUserId)
    : authUserId;
  const initialMessages = chatMessagesData
    ? mapHistoryMessagesToChatMessages(
        chatMessagesData.messages,
        currentUserId,
        chatDetail?.nickname ?? "",
      )
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
    isLeavingChatRoom,
    isProcessingRoommateRequest,
    navigation: {
      onBack: () => navigate("/chat"),
      onLeaveChatRoom: chatDetail ? handleLeaveChatRoom : undefined,
      onProfileClick: chatDetail ? () => navigate(`/roommate/${chatDetail.id}`) : undefined,
      onRecruitClick: chatDetail ? handleRecruitClick : undefined,
      onReportClick: chatDetail
        ? () => navigate(`/roommate/${chatDetail.id}/matching-report`)
        : undefined,
      onRoommateRequestAccept: chatDetail ? handleRoommateRequestAccept : undefined,
      onRoommateRequestReject: chatDetail ? handleRoommateRequestReject : undefined,
    },
  };

  return pageState;
}

export { useChatDetailPage };
