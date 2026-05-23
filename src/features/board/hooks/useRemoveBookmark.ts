import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeBookmark } from "@/api/bookmarks";
import { postQueryKeys } from "@/features/board/queries";
import type { PostDetail } from "@/features/board/types";

export const useRemoveBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeBookmark,
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: postQueryKeys.detail(postId) });
      const previous = queryClient.getQueryData<PostDetail>(postQueryKeys.detail(postId));
      queryClient.setQueryData<PostDetail>(postQueryKeys.detail(postId), (old) =>
        old ? { ...old, isBookmarked: false } : old,
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
