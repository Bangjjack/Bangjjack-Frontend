import { CAMPUS_OPTIONS, DORMITORY_OPTIONS } from "@/features/onboarding/constants";
import {
  onboardingRequestSchema,
  type OnboardingRequestValues,
} from "@/features/onboarding/schemas";
import type { OnBoardingFormValues } from "@/features/onboarding/types";

const CAMPUS_VALUES = ["GLOBAL_CAMPUS", "MEDICAL_CAMPUS"] as const;
const DORMITORY_VALUES = ["DORM_1", "DORM_2", "DORM_3"] as const;

function mapOnboardingCampusToRequest(
  campus: string,
): OnboardingRequestValues["campus"] | undefined {
  const campusIndex = CAMPUS_OPTIONS.findIndex((option) => option === campus);
  return CAMPUS_VALUES[campusIndex];
}

function mapOnboardingFormToRequest(values: OnBoardingFormValues): OnboardingRequestValues {
  const dormitoryIndex = DORMITORY_OPTIONS.findIndex((option) => option === values.dormitory);
  const gender =
    values.gender === "male" ? "MALE" : values.gender === "female" ? "FEMALE" : undefined;
  const semester =
    values.semesterType === "semester"
      ? "SIXTEEN_WEEKS"
      : values.semesterType === "half"
        ? "TWENTY_FIVE_WEEKS"
        : undefined;

  return onboardingRequestSchema.parse({
    birthYear: Number(values.birthYear),
    campus: mapOnboardingCampusToRequest(values.campus),
    departmentId: values.departmentId,
    dormitory: DORMITORY_VALUES[dormitoryIndex],
    gender,
    grade: Number(values.grade),
    semester,
  });
}

export { mapOnboardingCampusToRequest, mapOnboardingFormToRequest };
