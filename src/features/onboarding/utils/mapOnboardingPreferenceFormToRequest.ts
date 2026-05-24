import { PRIORITY_FACTOR_OPTIONS } from "@/features/onboarding/constants";
import {
  onboardingPreferenceRequestSchema,
  type OnboardingPreferenceRequestValues,
} from "@/features/onboarding/schemas";
import type { OnBoardingFormValues } from "@/features/onboarding/types";

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
): OnboardingPreferenceRequestValues | null {
  const parsed = onboardingPreferenceRequestSchema.safeParse({
    preferences: values.priorityFactors.map((factor) => {
      const selectedIndex = PRIORITY_FACTOR_OPTIONS.findIndex((option) => option === factor);
      return PREFERENCE_VALUES[selectedIndex];
    }),
  });

  return parsed.success ? parsed.data : null;
}

export { mapOnboardingPreferenceFormToRequest };
