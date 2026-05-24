import { apiClient } from "@/lib/api";
import type { ApiResponse } from "@/types";
import type { OnboardingRequestValues } from "@/features/onboarding/schemas";

export const saveOnboarding = async (body: OnboardingRequestValues): Promise<string> => {
  const { data } = await apiClient.patch<ApiResponse<string>>("/users/onboarding", body);
  return data.data;
};
