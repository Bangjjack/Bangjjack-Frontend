import type { RoommatePreference } from "@/constants";
import { apiClient } from "@/lib/api";
import type { ApiResponse, Dormitory, Semester } from "@/types";

type UserTagsData = {
  semester: Semester;
  dormitory: Dormitory;
  roommatePreferences: RoommatePreference[];
};

export const getUserTags = async (): Promise<UserTagsData> => {
  const { data } = await apiClient.get<ApiResponse<UserTagsData>>("/users/me/tags");
  return data.data;
};

export type { UserTagsData };
