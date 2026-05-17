import { apiClient } from "@/lib/api";
import type { ApiResponse, CreatePostRequest, PostDetail } from "@/features/board/types";

export const getPostById = async (postId: number): Promise<PostDetail> => {
  const { data } = await apiClient.get<ApiResponse<PostDetail>>(`/posts/${postId}`);
  return data.data;
};

export const createPost = async (body: CreatePostRequest): Promise<PostDetail> => {
  const { data } = await apiClient.post<ApiResponse<PostDetail>>("/posts", body);
  return data.data;
};
