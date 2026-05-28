import type { RoommatePreference } from "@/constants";
import {
  DORMITORY_LABEL,
  MY_PROFILE_CAMPUS_LABEL,
  MY_PROFILE_CHECKLIST_FIELD_META,
  MY_PROFILE_DORMITORY_FALLBACK,
  MY_PROFILE_GENDER_LABEL,
  ROOMMATE_PREFERENCE_LABEL,
  SEMESTER_LABEL,
} from "@/features/mypage/constants";
import type { MyProfileEditFormValues } from "@/features/mypage/schemas";
import type { ChecklistEntry } from "@/features/roommate/types/checklist";
import type { UserChecklistData, UserProfileData } from "@/features/user/types";
import type { Campus } from "@/types";

function mapUserProfileToFormValues(profile: UserProfileData): MyProfileEditFormValues {
  return {
    birthYear: String(profile.birthYear),
    campus: MY_PROFILE_CAMPUS_LABEL[profile.campus] ?? profile.campus,
    department: profile.departmentName,
    dormitory: DORMITORY_LABEL[profile.dormitory] ?? MY_PROFILE_DORMITORY_FALLBACK,
    email: profile.email,
    gender: MY_PROFILE_GENDER_LABEL[profile.gender] ?? profile.gender,
    grade: String(profile.grade) as MyProfileEditFormValues["grade"],
    name: profile.username,
    semester: SEMESTER_LABEL[profile.semester] ?? profile.semester,
  };
}

function mapChecklistToEntries(checklist: UserChecklistData | null): ChecklistEntry[] {
  if (!checklist) {
    return [];
  }

  return MY_PROFILE_CHECKLIST_FIELD_META.map(({ id, label, valueLabel }) => {
    const value = checklist[id];
    const displayValue = Array.isArray(value)
      ? value.map((item) => valueLabel[item] ?? item).join(", ")
      : (valueLabel[value] ?? value);

    return {
      id,
      label,
      value: displayValue,
      isMatched: true,
    };
  });
}

function mapRoommatePreferencesToLabels(preferences: string[]) {
  return preferences.map(
    (preference) => ROOMMATE_PREFERENCE_LABEL[preference as RoommatePreference] ?? preference,
  );
}

function mapMyProfileCampusToRequest(campus: string): Campus | null {
  const campusEntry = Object.entries(MY_PROFILE_CAMPUS_LABEL).find(([, label]) => label === campus);

  return (campusEntry?.[0] as Campus | undefined) ?? null;
}

export {
  mapChecklistToEntries,
  mapMyProfileCampusToRequest,
  mapRoommatePreferencesToLabels,
  mapUserProfileToFormValues,
};
