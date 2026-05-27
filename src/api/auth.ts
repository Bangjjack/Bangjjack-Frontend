import { apiClient } from "@/lib/api";
import type { ApiResponse } from "@/api/types";
import type { AuthTokenRequest, AuthTokenResponse } from "@/features/auth/types";

export const exchangeAuthToken = async ({ code }: AuthTokenRequest): Promise<AuthTokenResponse> => {
  const { data } = await apiClient.post<ApiResponse<AuthTokenResponse>>("/auth/token", { code });
  return data.data;
};
