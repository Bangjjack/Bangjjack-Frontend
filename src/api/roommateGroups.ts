import { apiClient } from "@/lib/api";
import type { ApiResponse } from "@/api/types";
import type { MyRoommateGroup } from "@/features/roommate-group/types";

const ROOMMATE_GROUP_API_PATHS = {
  me: "/roommate-groups/me",
} as const;

export const getMyRoommateGroups = async (): Promise<MyRoommateGroup[]> => {
  const { data } = await apiClient.get<ApiResponse<MyRoommateGroup[]>>(ROOMMATE_GROUP_API_PATHS.me);

  return data.data;
};

export const leaveRoommateGroup = async (groupId: number): Promise<void> => {
  await apiClient.delete(`/roommate-groups/${groupId}/members/me`);
};
