import { useAddBookmark, usePostDetail, useRemoveBookmark } from "@/features/board/hooks";

export const useBookmarkToggle = (postId: number) => {
  const { data: post } = usePostDetail(postId);
  const addBookmark = useAddBookmark();
  const removeBookmark = useRemoveBookmark();

  const isBookmarked = post?.isBookmarked ?? false;
  const isOwner = post?.isOwner ?? false;

  const toggle = () => {
    if (isBookmarked) {
      removeBookmark.mutate(postId);
    } else {
      addBookmark.mutate(postId);
    }
  };

  return { isBookmarked, isOwner, toggle };
};
