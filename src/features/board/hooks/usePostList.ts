import { useInfiniteQuery } from "@tanstack/react-query";

import { getPosts } from "@/api/posts";
import { postQueryKeys } from "@/features/board/queries";
import type { PostListFilterParams } from "@/features/board/types";

const PAGE_SIZE = 20;

export const usePostList = (params: PostListFilterParams) => {
  return useInfiniteQuery({
    queryKey: postQueryKeys.list(params),
    queryFn: ({ pageParam }) =>
      getPosts({
        ...params,
        pageable: { page: pageParam, size: PAGE_SIZE, sort: [] },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.hasNext ? lastPageParam + 1 : undefined,
  });
};
