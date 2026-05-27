import { CAMPUS_OPTIONS, DORMITORY_OPTIONS } from "@/features/onboarding/constants";
import {
  onboardingCampusSchema,
  onboardingDormitorySchema,
  onboardingRequestSchema,
  type OnboardingRequestValues,
} from "@/features/onboarding/schemas";
import type { OnBoardingFormValues } from "@/features/onboarding/types";

function mapOnboardingCampusToRequest(
  campus: string,
): OnboardingRequestValues["campus"] | undefined {
  const campusIndex = CAMPUS_OPTIONS.findIndex((option) => option === campus);
  return onboardingCampusSchema.options[campusIndex];
}

function mapOnboardingFormToRequest(values: OnBoardingFormValues): OnboardingRequestValues | null {
  const dormitoryIndex = DORMITORY_OPTIONS.findIndex((option) => option === values.dormitory);
  const gender =
    values.gender === "male" ? "MALE" : values.gender === "female" ? "FEMALE" : undefined;
  const semester =
    values.semesterType === "semester"
      ? "SIXTEEN_WEEKS"
      : values.semesterType === "half"
        ? "TWENTY_FIVE_WEEKS"
        : undefined;

  const result = onboardingRequestSchema.safeParse({
    birthYear: Number(values.birthYear),
    campus: mapOnboardingCampusToRequest(values.campus),
    departmentId: values.departmentId,
    dormitory: onboardingDormitorySchema.options[dormitoryIndex],
    gender,
    grade: Number(values.grade),
    semester,
  });

  return result.success ? result.data : null;
}

export { mapOnboardingCampusToRequest, mapOnboardingFormToRequest };
