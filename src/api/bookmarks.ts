import { apiClient } from "@/lib/api";
import type { ApiResponse } from "@/types";
import type { BookmarkedPostsData, GetBookmarksParams } from "@/features/mypage/types";

export const getBookmarkedPosts = async (
  params?: GetBookmarksParams,
): Promise<BookmarkedPostsData> => {
  const { data } = await apiClient.get<ApiResponse<BookmarkedPostsData>>("/posts/bookmarks", {
    params,
  });
  return data.data;
};

export const addBookmark = async (postId: number): Promise<void> => {
  await apiClient.post(`/posts/${postId}/bookmarks`);
};

export const removeBookmark = async (postId: number): Promise<void> => {
  await apiClient.delete(`/posts/${postId}/bookmarks`);
};
