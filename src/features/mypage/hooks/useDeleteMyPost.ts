import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deletePost } from "@/api";
import { postQueryKeys } from "@/features/board/queries";
import { mypageQueryKeys } from "@/features/mypage/queries";

export const useDeleteMyPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: (_data, postId) => {
      queryClient.removeQueries({ queryKey: postQueryKeys.detail(postId) });
      queryClient.invalidateQueries({ queryKey: postQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: mypageQueryKeys.myPosts() });
    },
  });
};
