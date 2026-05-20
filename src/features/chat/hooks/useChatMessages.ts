import { useQuery } from "@tanstack/react-query";

import { getChatMessages } from "@/api/chat";
import { chatQueryKeys } from "@/features/chat/queries";

type UseChatMessagesParams = {
  cursor?: number;
  roomId?: number;
  size?: number;
};

export const useChatMessages = ({ cursor, roomId, size = 30 }: UseChatMessagesParams) => {
  return useQuery({
    queryKey: chatQueryKeys.messageList({ cursor, roomId: roomId ?? 0, size }),
    queryFn: () => getChatMessages({ cursor, roomId: roomId ?? 0, size }),
    enabled: roomId != null,
  });
};
