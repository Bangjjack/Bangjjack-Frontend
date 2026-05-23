import { apiClient } from "@/lib/api";

export const addBookmark = async (postId: number): Promise<void> => {
  await apiClient.post(`/posts/${postId}/bookmarks`);
};

export const removeBookmark = async (postId: number): Promise<void> => {
  await apiClient.delete(`/posts/${postId}/bookmarks`);
};
