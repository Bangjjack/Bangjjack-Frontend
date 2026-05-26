import { apiClient } from "@/lib/api";
import type { ApiResponse } from "@/api/types";
import type {
  ChatMessagesData,
  ChatRoom,
  ChatRoomsData,
  CreateChatRoomRequest,
  GetChatMessagesParams,
  GetChatRoomsParams,
} from "@/features/chat/types";

const CHAT_API_PATHS = {
  chatRooms: "/chat-rooms",
  messages: (roomId: number) => `/chat-rooms/${roomId}/messages`,
  wsToken: "/auth/ws-token",
} as const;

export type IssueChatWsTokenResponse = {
  wsToken: string;
};

export const issueChatWsToken = async (): Promise<IssueChatWsTokenResponse> => {
  const { data } = await apiClient.post<ApiResponse<IssueChatWsTokenResponse>>(
    CHAT_API_PATHS.wsToken,
  );
  return data.data;
};

export const createChatRoom = async (body: CreateChatRoomRequest): Promise<ChatRoom> => {
  console.log("[chat] createChatRoom request", body);
  const { data } = await apiClient.post<ApiResponse<ChatRoom>>(CHAT_API_PATHS.chatRooms, body);
  console.log("[chat] createChatRoom response", data);
  return data.data;
};

export const getChatRooms = async ({
  category,
  cursor,
  size = 20,
}: GetChatRoomsParams = {}): Promise<ChatRoomsData> => {
  const { data } = await apiClient.get<ApiResponse<ChatRoomsData>>(CHAT_API_PATHS.chatRooms, {
    params: {
      category,
      cursor,
      size,
    },
  });

  return data.data;
};

export const getChatMessages = async ({
  cursor,
  roomId,
  size = 30,
}: GetChatMessagesParams): Promise<ChatMessagesData> => {
  const { data } = await apiClient.get<ApiResponse<ChatMessagesData>>(
    CHAT_API_PATHS.messages(roomId),
    {
      params: {
        cursor,
        size,
      },
    },
  );

  return data.data;
};
