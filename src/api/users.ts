import { apiClient } from "@/lib/api";
import type { ApiResponse } from "@/types";
import type {
  OnboardingChecklistRequestValues,
  OnboardingPreferenceRequestValues,
  OnboardingRequestValues,
} from "@/features/onboarding/schemas";
import type {
  UpdateUserProfileRequest,
  UserChecklistData,
  UserProfile,
  UserProfileData,
  UserTagsData,
} from "@/features/user/types";

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

export const saveOnboardingPreference = async (
  body: OnboardingPreferenceRequestValues,
): Promise<string> => {
  const { data } = await apiClient.post<ApiResponse<string>>("/users/onboarding/preference", body);
  return data.data;
};

export const getUserTags = async (): Promise<UserTagsData> => {
  const { data } = await apiClient.get<ApiResponse<UserTagsData>>("/users/me/tags");
  return data.data;
};

export const getUserChecklist = async (): Promise<UserChecklistData> => {
  const { data } = await apiClient.get<ApiResponse<UserChecklistData>>("/users/me/checklist");
  return data.data;
};

export const getMyProfile = async (): Promise<UserProfileData> => {
  const { data } = await apiClient.get<ApiResponse<UserProfileData>>("/users/me/profile");
  return data.data;
};

export const updateUserChecklist = async (body: UserChecklistData): Promise<UserChecklistData> => {
  const { data } = await apiClient.patch<ApiResponse<UserChecklistData>>(
    "/users/me/checklist",
    body,
  );
  return data.data;
};

export const getUserProfile = async (userId: number): Promise<UserProfile> => {
  const { data } = await apiClient.get<ApiResponse<UserProfile>>(`/users/${userId}/profile`);
  return data.data;
};

export const updateUserProfile = async (body: UpdateUserProfileRequest): Promise<void> => {
  await apiClient.patch("/users/me/profile", body);
};
