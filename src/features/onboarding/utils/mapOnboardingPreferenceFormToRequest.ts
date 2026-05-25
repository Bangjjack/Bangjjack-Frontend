import { PRIORITY_FACTOR_OPTIONS } from "@/features/onboarding/constants";
import {
  onboardingPreferenceRequestSchema,
  type OnboardingPreferenceRequestValues,
} from "@/features/onboarding/schemas";
import type { OnBoardingFormValues } from "@/features/onboarding/types";

type OnboardingPreferenceMappingResult =
  | { status: "skipped" }
  | { status: "invalid"; error: string }
  | { status: "valid"; value: OnboardingPreferenceRequestValues };

const PREFERENCE_VALUES = [
  "BEDTIME",
  "WAKE_UP_TIME",
  "SLEEP_HABIT",
  "DORM_STAY_TIME",
  "CLEANING_HABIT",
  "INDOOR_TEMPERATURE",
  "NOISE_SENSITIVITY",
  "ITEM_SHARING",
  "SMOKING",
  "CALL_HABIT",
] as const;

function mapOnboardingPreferenceFormToRequest(
  values: OnBoardingFormValues,
): OnboardingPreferenceMappingResult {
  if (values.priorityFactors.length === 0) {
    return { status: "skipped" };
  }

  const parsed = onboardingPreferenceRequestSchema.safeParse({
    preferences: values.priorityFactors.map((factor) => {
      const selectedIndex = PRIORITY_FACTOR_OPTIONS.findIndex((option) => option === factor);
      return PREFERENCE_VALUES[selectedIndex];
    }),
  });

  if (!parsed.success) {
    return { status: "invalid", error: "룸메이트 선호도 정보를 다시 확인해 주세요." };
  }

  return { status: "valid", value: parsed.data };
}

export { mapOnboardingPreferenceFormToRequest };
