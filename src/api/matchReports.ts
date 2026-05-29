import { apiClient } from "@/lib/api";
import type { ApiResponse } from "@/types";
import type { PostMatchRateData } from "@/features/board/types";

export const getMatchReport = async (targetUserId: number): Promise<PostMatchRateData> => {
  const { data } = await apiClient.get<ApiResponse<PostMatchRateData>>(
    `/match-reports/${targetUserId}`,
  );
  return data.data;
};
