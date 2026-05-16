import { useQuery } from "@tanstack/react-query";

import { getPostById } from "@/api/posts";

import { postQueryKeys } from "../queries/postQueryKeys";

export const usePostDetail = (postId: number) => {
  return useQuery({
    queryKey: postQueryKeys.detail(postId),
    queryFn: () => getPostById(postId),
    enabled: postId > 0,
  });
};
