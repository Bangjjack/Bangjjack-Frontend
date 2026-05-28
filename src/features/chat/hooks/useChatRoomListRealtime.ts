import type { InfiniteData } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { toast } from "@/components/ui";
import { useChatWebSocket } from "@/features/chat/hooks/useChatWebSocket";
import { chatQueryKeys } from "@/features/chat/queries";
import type { ChatErrorMessage, ChatReceivedMessage, ChatRoomsData } from "@/features/chat/types";
import { useAuthStore } from "@/stores/authStore";

function updateChatRoomsWithReceivedMessage(
  data: InfiniteData<ChatRoomsData> | undefined,
  receivedMessage: ChatReceivedMessage,
  currentUserId: number | null,
) {
  if (!data) {
    return data;
  }

  let hasUpdatedRoom = false;

  const pages = data.pages.map((page) => ({
    ...page,
    rooms: page.rooms.map((room) => {
      if (room.roomId !== receivedMessage.roomId) {
        return room;
      }

      hasUpdatedRoom = true;

      return {
        ...room,
        lastMessage: receivedMessage.content,
        lastMessageAt: receivedMessage.createdAt,
        unreadCount:
          receivedMessage.senderId === currentUserId ? room.unreadCount : room.unreadCount + 1,
      };
    }),
  }));

  return hasUpdatedRoom ? { ...data, pages } : data;
}

export const useChatRoomListRealtime = () => {
  const queryClient = useQueryClient();
  const currentUserId = useAuthStore((state) => state.userId);

  const handleMessage = (receivedMessage: ChatReceivedMessage) => {
    queryClient.setQueriesData<InfiniteData<ChatRoomsData>>(
      { queryKey: chatQueryKeys.rooms() },
      (data) => updateChatRoomsWithReceivedMessage(data, receivedMessage, currentUserId),
    );
  };

  const handleErrorMessage = (errorMessage: ChatErrorMessage) => {
    toast.error(errorMessage.message);
  };

  useChatWebSocket({
    onErrorMessage: handleErrorMessage,
    onMessage: handleMessage,
  });
};
