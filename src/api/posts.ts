import { apiClient } from "@/lib/api";
import type { ApiResponse } from "@/types";
import type {
  CreatePostRequest,
  GetPostsParams,
  PostDetail,
  PostListData,
  PostMatchRateData,
  UpdatePostRequest,
} from "@/features/board/types";

export const getPosts = async (params: GetPostsParams): Promise<PostListData> => {
  const { data } = await apiClient.get<ApiResponse<PostListData>>("/posts", { params });
  return data.data;
};

export const getPostById = async (postId: number): Promise<PostDetail> => {
  const { data } = await apiClient.get<ApiResponse<PostDetail>>(`/posts/${postId}`);
  return data.data;
};

export const createPost = async (body: CreatePostRequest): Promise<PostDetail> => {
  const { data } = await apiClient.post<ApiResponse<PostDetail>>("/posts", body);
  return data.data;
};

export const updatePost = async (postId: number, body: UpdatePostRequest): Promise<PostDetail> => {
  const { data } = await apiClient.patch<ApiResponse<PostDetail>>(`/posts/${postId}`, body);
  return data.data;
};

export const deletePost = async (postId: number): Promise<string> => {
  const { data } = await apiClient.delete<ApiResponse<string>>(`/posts/${postId}`);
  return data.data;
};

export const getPostMatchRate = async (postId: number): Promise<PostMatchRateData> => {
  const { data } = await apiClient.get<ApiResponse<PostMatchRateData>>(
    `/posts/${postId}/match-rate`,
  );
  return data.data;
};
