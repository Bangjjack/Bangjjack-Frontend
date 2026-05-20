import { useAddBookmark } from "./useAddBookmark";
import { usePostDetail } from "./usePostDetail";
import { useRemoveBookmark } from "./useRemoveBookmark";

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
