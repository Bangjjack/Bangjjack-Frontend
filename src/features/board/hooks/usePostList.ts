import { useQuery } from "@tanstack/react-query";

import { getPosts } from "@/api/posts";
import type { GetPostsParams } from "@/features/board/types";
import { postQueryKeys } from "@/features/board/queries";

export const usePostList = (params: GetPostsParams) => {
  return useQuery({
    queryKey: postQueryKeys.list(params),
    queryFn: () => getPosts(params),
  });
};
