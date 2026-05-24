import {
  CAMPUS_OPTIONS,
  DEPARTMENT_OPTIONS,
  DORMITORY_OPTIONS,
} from "@/features/onboarding/constants";
import {
  onboardingRequestSchema,
  type OnboardingRequestValues,
} from "@/features/onboarding/schemas";
import type { OnBoardingFormValues } from "@/features/onboarding/types";

const CAMPUS_VALUES = ["GLOBAL_CAMPUS", "MEDICAL_CAMPUS"] as const;
const DORMITORY_VALUES = ["DORM_1", "DORM_2", "DORM_3"] as const;

function mapOnboardingFormToRequest(values: OnBoardingFormValues): OnboardingRequestValues {
  const campusIndex = CAMPUS_OPTIONS.findIndex((option) => option === values.campus);
  const departmentIndex = DEPARTMENT_OPTIONS.findIndex((option) => option === values.department);
  const dormitoryIndex = DORMITORY_OPTIONS.findIndex((option) => option === values.dormitory);
  const grade = Number(values.grade);

  return onboardingRequestSchema.parse({
    birthYear: Number(values.birthYear),
    campus: CAMPUS_VALUES[campusIndex],
    departmentId: departmentIndex,
    dormitory: DORMITORY_VALUES[dormitoryIndex],
    gender: values.gender === "male" ? "MALE" : "FEMALE",
    grade: Number.isNaN(grade) ? 0 : grade,
    semester: values.semesterType === "semester" ? "SIXTEEN_WEEKS" : "TWENTY_FIVE_WEEKS",
  });
}

export { mapOnboardingFormToRequest };
