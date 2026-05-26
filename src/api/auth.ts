import { apiClient } from "@/lib/api";
import type { ApiResponse } from "@/api/types";

export type AuthTokenRequest = {
  code: string;
};

export type AuthTokenResponse = {
  accessToken: string;
  isChecklistRegistered: boolean;
  isOnboarded: boolean;
  isRoommatePreferenceRegistered: boolean;
  userId: number;
  username: string;
};

export const exchangeAuthToken = async ({ code }: AuthTokenRequest): Promise<AuthTokenResponse> => {
  const { data } = await apiClient.post<ApiResponse<AuthTokenResponse>>("/auth/token", { code });
  return data.data;
};
