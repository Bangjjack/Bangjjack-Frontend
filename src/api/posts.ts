import { apiClient } from "@/lib/api";
import type { ApiResponse, PostDetail } from "@/features/board/types";

export const getPostById = async (postId: number): Promise<PostDetail> => {
  const { data } = await apiClient.get<ApiResponse<PostDetail>>(`/posts/${postId}`);
  return data.data;
};
