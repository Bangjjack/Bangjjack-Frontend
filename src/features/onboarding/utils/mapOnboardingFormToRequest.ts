import { CAMPUS_OPTIONS, DORMITORY_OPTIONS } from "@/features/onboarding/constants";
import {
  onboardingRequestSchema,
  type OnboardingRequestValues,
} from "@/features/onboarding/schemas";
import type { OnBoardingFormValues } from "@/features/onboarding/types";

const CAMPUS_VALUES = ["GLOBAL_CAMPUS", "MEDICAL_CAMPUS"] as const;
const DORMITORY_VALUES = ["DORM_1", "DORM_2", "DORM_3"] as const;

function mapOnboardingCampusToRequest(campus: string): OnboardingRequestValues["campus"] | null {
  const campusIndex = CAMPUS_OPTIONS.findIndex((option) => option === campus);
  return CAMPUS_VALUES[campusIndex] ?? null;
}

function mapOnboardingFormToRequest(values: OnBoardingFormValues): OnboardingRequestValues {
  const dormitoryIndex = DORMITORY_OPTIONS.findIndex((option) => option === values.dormitory);
  const grade = Number(values.grade);

  return onboardingRequestSchema.parse({
    birthYear: Number(values.birthYear),
    campus: mapOnboardingCampusToRequest(values.campus),
    departmentId: values.departmentId,
    dormitory: DORMITORY_VALUES[dormitoryIndex],
    gender: values.gender === "male" ? "MALE" : "FEMALE",
    grade: Number.isNaN(grade) ? 0 : grade,
    semester: values.semesterType === "semester" ? "SIXTEEN_WEEKS" : "TWENTY_FIVE_WEEKS",
  });
}

export { mapOnboardingCampusToRequest, mapOnboardingFormToRequest };
