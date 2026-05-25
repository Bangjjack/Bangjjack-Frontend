import { apiClient } from "@/lib/api";
import type { Department, GetDepartmentsParams } from "@/features/onboarding/types";
import type { ApiResponse } from "@/types";

export const getDepartments = async (params: GetDepartmentsParams): Promise<Department[]> => {
  const { data } = await apiClient.get<ApiResponse<Department[]>>("/departments", { params });
  return data.data;
};
