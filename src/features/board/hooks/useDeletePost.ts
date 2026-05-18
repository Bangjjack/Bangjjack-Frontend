import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deletePost } from "@/api/posts";
import { postQueryKeys } from "@/features/board/queries";

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.lists() });
    },
  });
};
