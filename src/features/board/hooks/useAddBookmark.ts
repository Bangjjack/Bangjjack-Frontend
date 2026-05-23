import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addBookmark } from "@/api/bookmarks";
import { postQueryKeys } from "@/features/board/queries";
import type { PostDetail } from "@/features/board/types";

export const useAddBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addBookmark,
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: postQueryKeys.detail(postId) });
      const previous = queryClient.getQueryData<PostDetail>(postQueryKeys.detail(postId));
      queryClient.setQueryData<PostDetail>(postQueryKeys.detail(postId), (old) =>
        old ? { ...old, isBookmarked: true } : old,
      );
      return { previous };
    },
    onError: (_err, postId, context) => {
      queryClient.setQueryData(postQueryKeys.detail(postId), context?.previous);
    },
    onSettled: (_data, _err, postId) => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.detail(postId) });
    },
  });
};
