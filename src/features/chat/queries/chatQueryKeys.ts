import type { GetChatMessagesParams } from "@/features/chat/types";

export const chatQueryKeys = {
  all: ["chat"] as const,
  messages: () => [...chatQueryKeys.all, "messages"] as const,
  messageList: (params: GetChatMessagesParams) => [...chatQueryKeys.messages(), params] as const,
  rooms: () => [...chatQueryKeys.all, "rooms"] as const,
};
