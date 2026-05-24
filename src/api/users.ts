import { apiClient } from "@/lib/api";
import type { ApiResponse } from "@/types";
import type {
  OnboardingChecklistRequestValues,
  OnboardingRequestValues,
} from "@/features/onboarding/schemas";

export const saveOnboarding = async (body: OnboardingRequestValues): Promise<string> => {
  const { data } = await apiClient.patch<ApiResponse<string>>("/users/onboarding", body);
  return data.data;
};

export const saveOnboardingChecklist = async (
  body: OnboardingChecklistRequestValues,
): Promise<string> => {
  const { data } = await apiClient.post<ApiResponse<string>>("/users/onboarding/checklist", body);
  return data.data;
};
