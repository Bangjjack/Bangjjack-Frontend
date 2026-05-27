import { apiClient } from "@/lib/api";
import type { ApiResponse } from "@/types";
import type { UserChecklistData, UserTagsData } from "@/features/user/types";

export const getUserTags = async (): Promise<UserTagsData> => {
  const { data } = await apiClient.get<ApiResponse<UserTagsData>>("/users/me/tags");
  return data.data;
};

export const getUserChecklist = async (): Promise<UserChecklistData> => {
  const { data } = await apiClient.get<ApiResponse<UserChecklistData>>("/users/me/checklist");
  return data.data;
};

export const updateUserChecklist = async (body: UserChecklistData): Promise<UserChecklistData> => {
  const { data } = await apiClient.patch<ApiResponse<UserChecklistData>>(
    "/users/me/checklist",
    body,
  );
  return data.data;
};
