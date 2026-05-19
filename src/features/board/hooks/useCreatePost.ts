import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createPost } from "@/api/posts";
import { postQueryKeys } from "@/features/board/queries";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.lists() });
    },
  });
};
