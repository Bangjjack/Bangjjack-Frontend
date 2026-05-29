import type { RoommatePreference } from "@/constants";
import { DORMITORY_LABEL, ROOMMATE_PREFERENCE_LABEL, SEMESTER_LABEL } from "@/constants";
import {
  MY_PROFILE_CAMPUS_LABEL,
  MY_PROFILE_CHECKLIST_FIELD_META,
  MY_PROFILE_DORMITORY_FALLBACK,
  MY_PROFILE_GENDER_LABEL,
} from "@/features/mypage/constants";
import type { UpdateUserProfileRequest } from "@/features/user/types";
import type { MyChecklistSectionMock } from "@/features/mypage/types";
import {
  onboardingChecklistRequestSchema,
  type OnboardingChecklistRequestValues,
} from "@/features/onboarding/schemas";
import type { MyProfileEditFormValues } from "@/features/mypage/schemas";
import type { ChecklistEntry } from "@/features/roommate/types/checklist";
import type { UserChecklistData, UserProfileData } from "@/features/user/types";
import type { Campus } from "@/types";

type ChecklistRequestMappingResult =
  | { status: "invalid"; error: string }
  | { status: "valid"; value: OnboardingChecklistRequestValues };

function mapUserProfileToFormValues(profile: UserProfileData): MyProfileEditFormValues {
  return {
    birthYear: String(profile.birthYear),
    campus: MY_PROFILE_CAMPUS_LABEL[profile.campus] ?? profile.campus,
    department: profile.departmentName,
    departmentId: profile.departmentId,
    dormitory: DORMITORY_LABEL[profile.dormitory] ?? MY_PROFILE_DORMITORY_FALLBACK,
    email: profile.email,
    gender: MY_PROFILE_GENDER_LABEL[profile.gender] ?? profile.gender,
    grade: String(profile.grade) as MyProfileEditFormValues["grade"],
    name: profile.username,
    semester: SEMESTER_LABEL[profile.semester] ?? profile.semester,
  };
}

function reverseLookup(record: Record<string, string>, label: string): string | undefined {
  return Object.entries(record).find(([, v]) => v === label)?.[0];
}

function mapFormToProfileRequest(
  values: MyProfileEditFormValues,
  importanceItems: string[],
): UpdateUserProfileRequest | null {
  const campus = reverseLookup(MY_PROFILE_CAMPUS_LABEL, values.campus);
  const gender = reverseLookup(MY_PROFILE_GENDER_LABEL, values.gender);
  const semester = reverseLookup(SEMESTER_LABEL, values.semester);
  const dormitory = reverseLookup(DORMITORY_LABEL, values.dormitory);

  if (!campus || !gender || !semester || !dormitory || values.departmentId == null) {
    return null;
  }

  const preferences = importanceItems
    .map((label) => reverseLookup(ROOMMATE_PREFERENCE_LABEL, label))
    .filter((v): v is string => Boolean(v));

  return {
    birthYear: Number(values.birthYear),
    campus,
    departmentId: values.departmentId,
    dormitory,
    gender,
    grade: Number(values.grade),
    preferences,
    semester,
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

function createMyChecklistSections(checklist: UserChecklistData | null): MyChecklistSectionMock[] {
  return MY_PROFILE_CHECKLIST_FIELD_META.map(({ id, label, valueLabel }) => {
    const value = checklist?.[id];
    const values = Array.isArray(value) ? value : value ? [value] : [];

    return {
      id,
      helperText: id === "sleepHabits" ? "복수 선택" : undefined,
      options: Object.values(valueLabel),
      selectedOptions: values.map((item) => valueLabel[item] ?? item),
      selectionType: id === "sleepHabits" ? "multi" : "single",
      title: label,
    };
  });
}

function getChecklistValueByLabel(
  section: MyChecklistSectionMock | undefined,
  valueLabel: Record<string, string>,
) {
  const selectedOption = section?.selectedOptions[0];

  if (!selectedOption) {
    return undefined;
  }

  return Object.entries(valueLabel).find(([, label]) => label === selectedOption)?.[0];
}

function getChecklistValuesByLabel(
  section: MyChecklistSectionMock | undefined,
  valueLabel: Record<string, string>,
) {
  return (
    section?.selectedOptions
      .map(
        (selectedOption) =>
          Object.entries(valueLabel).find(([, label]) => label === selectedOption)?.[0],
      )
      .filter((value): value is string => Boolean(value)) ?? []
  );
}

function mapMyChecklistSectionsToRequest(
  sections: MyChecklistSectionMock[],
): ChecklistRequestMappingResult {
  const sectionMap = new Map(sections.map((section) => [section.id, section]));
  const fieldMetaMap = new Map(MY_PROFILE_CHECKLIST_FIELD_META.map((meta) => [meta.id, meta]));
  const payload = {
    bedtime: getChecklistValueByLabel(
      sectionMap.get("bedtime"),
      fieldMetaMap.get("bedtime")?.valueLabel ?? {},
    ),
    wakeUpTime: getChecklistValueByLabel(
      sectionMap.get("wakeUpTime"),
      fieldMetaMap.get("wakeUpTime")?.valueLabel ?? {},
    ),
    sleepHabits: getChecklistValuesByLabel(
      sectionMap.get("sleepHabits"),
      fieldMetaMap.get("sleepHabits")?.valueLabel ?? {},
    ),
    cleaningCycle: getChecklistValueByLabel(
      sectionMap.get("cleaningCycle"),
      fieldMetaMap.get("cleaningCycle")?.valueLabel ?? {},
    ),
    dormStayTime: getChecklistValueByLabel(
      sectionMap.get("dormStayTime"),
      fieldMetaMap.get("dormStayTime")?.valueLabel ?? {},
    ),
    callHabit: getChecklistValueByLabel(
      sectionMap.get("callHabit"),
      fieldMetaMap.get("callHabit")?.valueLabel ?? {},
    ),
    indoorTemperature: getChecklistValueByLabel(
      sectionMap.get("indoorTemperature"),
      fieldMetaMap.get("indoorTemperature")?.valueLabel ?? {},
    ),
    noiseSensitivity: getChecklistValueByLabel(
      sectionMap.get("noiseSensitivity"),
      fieldMetaMap.get("noiseSensitivity")?.valueLabel ?? {},
    ),
    smoking: getChecklistValueByLabel(
      sectionMap.get("smoking"),
      fieldMetaMap.get("smoking")?.valueLabel ?? {},
    ),
  };
  const parsed = onboardingChecklistRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return { status: "invalid", error: "생활 습관 체크리스트를 모두 선택해 주세요" };
  }

  return { status: "valid", value: parsed.data };
}

export {
  createMyChecklistSections,
  mapChecklistToEntries,
  mapFormToProfileRequest,
  mapMyChecklistSectionsToRequest,
  mapMyProfileCampusToRequest,
  mapRoommatePreferencesToLabels,
  mapUserProfileToFormValues,
};
