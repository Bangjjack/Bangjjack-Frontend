import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updatePost } from "@/api/posts";
import type { UpdatePostRequest } from "@/features/board/types";
import { postQueryKeys } from "@/features/board/queries";

export const useUpdatePost = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdatePostRequest) => updatePost(postId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.detail(postId) });
      queryClient.invalidateQueries({ queryKey: postQueryKeys.lists() });
    },
  });
};
