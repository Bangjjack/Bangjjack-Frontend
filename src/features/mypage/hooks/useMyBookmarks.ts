import { useInfiniteQuery } from "@tanstack/react-query";

import { getBookmarkedPosts } from "@/api/bookmarks";
import { mypageQueryKeys } from "@/features/mypage/queries";

const PAGE_SIZE = 20;

export const useMyBookmarks = () => {
  return useInfiniteQuery({
    queryKey: mypageQueryKeys.bookmarks(),
    queryFn: ({ pageParam }) =>
      getBookmarkedPosts({
        page: pageParam,
        size: PAGE_SIZE,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.hasNext ? lastPageParam + 1 : undefined,
  });
};
