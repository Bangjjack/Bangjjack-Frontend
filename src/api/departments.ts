import { apiClient } from "@/lib/api";
import type { ApiResponse, Campus } from "@/types";

export type Department = {
  campus: Campus;
  departmentId: number;
  name: string;
};

export type GetDepartmentsParams = {
  campus: Campus;
};

export const getDepartments = async (params: GetDepartmentsParams): Promise<Department[]> => {
  const { data } = await apiClient.get<ApiResponse<Department[]>>("/departments", { params });
  return data.data;
};
