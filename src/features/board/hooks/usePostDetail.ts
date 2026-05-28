import { useQuery } from "@tanstack/react-query";

import { getPostById } from "@/api/posts";

import { postQueryKeys } from "@/features/board/queries";

export const usePostDetail = (postId?: number) => {
  const enabled = typeof postId === "number" && postId > 0;

  return useQuery({
    queryKey: postQueryKeys.detail(postId ?? 0),
    queryFn: () => getPostById(postId ?? 0),
    enabled,
  });
};
