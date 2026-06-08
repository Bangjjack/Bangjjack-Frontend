import { skipToken, useQuery } from "@tanstack/react-query";

import { getPostById } from "@/api/posts";

import { postQueryKeys } from "@/features/board/queries";

export const usePostDetail = (postId?: number) => {
  const validPostId = typeof postId === "number" && postId > 0 ? postId : undefined;

  return useQuery({
    queryKey: postQueryKeys.detail(validPostId ?? 0),
    queryFn: validPostId ? () => getPostById(validPostId) : skipToken,
    staleTime: 0,
    gcTime: 0,
  });
};
