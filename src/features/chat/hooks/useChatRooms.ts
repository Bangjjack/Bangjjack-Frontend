import { useInfiniteQuery } from "@tanstack/react-query";

import { getChatRooms } from "@/api/chat";
import { chatQueryKeys } from "@/features/chat/queries";
import type { GetChatRoomsParams } from "@/features/chat/types";

const CHAT_ROOM_PAGE_SIZE = 20;

type UseChatRoomsParams = Pick<GetChatRoomsParams, "category" | "size">;

export const useChatRooms = ({ category, size = CHAT_ROOM_PAGE_SIZE }: UseChatRoomsParams = {}) => {
  return useInfiniteQuery({
    queryKey: chatQueryKeys.roomList(category, size),
    queryFn: ({ pageParam }) => getChatRooms({ category, cursor: pageParam, size }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext && lastPage.nextCursor != null ? lastPage.nextCursor : undefined,
    select: (data) => {
      const lastPage = data.pages.at(-1);

      return {
        ...data,
        hasNext: lastPage?.hasNext ?? false,
        nextCursor: lastPage?.nextCursor ?? null,
        rooms: data.pages.flatMap((page) => page.rooms),
      };
    },
  });
};
