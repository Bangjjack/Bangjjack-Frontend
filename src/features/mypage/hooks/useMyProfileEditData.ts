import { MY_PROFILE_EDIT_DEFAULT_VALUES } from "@/features/mypage/constants";
import {
  mapChecklistToEntries,
  mapRoommatePreferencesToLabels,
  mapUserProfileToFormValues,
} from "@/features/mypage/utils";
import { useUserProfile } from "@/features/user/hooks";

function useMyProfileEditData() {
  const { data: userProfile, isLoading } = useUserProfile();
  const apiProfileForm = userProfile ? mapUserProfileToFormValues(userProfile) : null;

  return {
    apiProfileForm,
    checklistItems: mapChecklistToEntries(userProfile?.checklist ?? null),
    defaultProfileForm: apiProfileForm ?? MY_PROFILE_EDIT_DEFAULT_VALUES,
    importanceItems: userProfile
      ? mapRoommatePreferencesToLabels(userProfile.roommatePreferences)
      : [],
    isLoading,
  };
}

export { useMyProfileEditData };
