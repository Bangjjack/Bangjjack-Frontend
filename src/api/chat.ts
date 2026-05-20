import { apiClient } from "@/lib/api";
import { MASTER_ACCESS_TOKEN } from "@/constants";
import type { ApiResponse } from "@/features/board/types";
import type { ChatRoom, CreateChatRoomRequest } from "@/features/chat/types";

export type IssueChatWsTokenResponse = {
  wsToken: string;
};

export const issueChatWsToken = async (): Promise<IssueChatWsTokenResponse> => {
  try {
    const { data } = await apiClient.post<ApiResponse<IssueChatWsTokenResponse>>("/auth/ws-token");
    return data.data;
  } catch (error) {
    if (!MASTER_ACCESS_TOKEN) {
      throw error;
    }

    console.warn("[chat] Failed to issue WS token with local token. Retrying with master token.");

    const { data } = await apiClient.post<ApiResponse<IssueChatWsTokenResponse>>(
      "/auth/ws-token",
      undefined,
      {
        headers: {
          Authorization: `Bearer ${MASTER_ACCESS_TOKEN}`,
        },
      },
    );

    return data.data;
  }
};

export const createChatRoom = async (body: CreateChatRoomRequest): Promise<ChatRoom> => {
  const { data } = await apiClient.post<ApiResponse<ChatRoom>>("/chat-rooms", body);
  return data.data;
};
