import { skipToken, useInfiniteQuery } from "@tanstack/react-query";

import { getChatMessages } from "@/api/chat";
import { chatQueryKeys } from "@/features/chat/queries";

type UseChatMessagesParams = {
  cursor?: number;
  roomId?: number;
  size?: number;
};

export const useChatMessages = ({ cursor, roomId, size = 30 }: UseChatMessagesParams) => {
  const messageListParams = roomId == null ? undefined : { roomId, size };

  return useInfiniteQuery({
    queryKey: messageListParams
      ? chatQueryKeys.messageList(messageListParams)
      : chatQueryKeys.messages(),
    queryFn: messageListParams
      ? ({ pageParam }) => getChatMessages({ ...messageListParams, cursor: pageParam })
      : skipToken,
    initialPageParam: cursor,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext && lastPage.nextCursor != null ? lastPage.nextCursor : undefined,
    select: (data) => {
      const lastPage = data.pages.at(-1);

      return {
        ...data,
        hasNext: lastPage?.hasNext ?? false,
        messages: data.pages.flatMap((page) => page.messages),
        nextCursor: lastPage?.nextCursor ?? null,
      };
    },
  });
};
