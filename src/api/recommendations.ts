import { apiClient } from "@/lib/api";
import type { ApiResponse } from "@/types";
import type { RecommendedRoommate } from "@/features/home/types";

export const getRecommendedRoommates = async (): Promise<RecommendedRoommate[]> => {
  const { data } = await apiClient.get<ApiResponse<RecommendedRoommate[]>>(
    "/users/recommended-roommates",
  );
  return data.data;
};
