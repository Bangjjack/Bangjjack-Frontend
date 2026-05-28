import type { ChatRoomCategory, GetChatMessagesParams } from "@/features/chat/types";
import { CHAT_ROOM_LIST_DEFAULT_CATEGORY } from "../constants";

export const chatQueryKeys = {
  all: ["chat"] as const,
  messages: () => [...chatQueryKeys.all, "messages"] as const,
  messageList: (params: GetChatMessagesParams) => [...chatQueryKeys.messages(), params] as const,
  rooms: () => [...chatQueryKeys.all, "rooms"] as const,
  roomList: (category?: ChatRoomCategory, size?: number) =>
    [...chatQueryKeys.rooms(), category ?? CHAT_ROOM_LIST_DEFAULT_CATEGORY, size] as const,
};
