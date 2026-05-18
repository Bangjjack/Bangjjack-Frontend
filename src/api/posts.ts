import { apiClient } from "@/lib/api";
import type { PostDetail } from "@/features/board/types";
import type { ApiResponse } from "@/api/types";

export const getPostById = async (postId: number): Promise<PostDetail> => {
  const { data } = await apiClient.get<ApiResponse<PostDetail>>(`/posts/${postId}`);
  return data.data;
};
