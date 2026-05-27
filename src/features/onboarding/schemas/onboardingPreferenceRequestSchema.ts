import { z } from "zod";

const onboardingPreferenceSchema = z.enum([
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
]);

const onboardingPreferenceRequestSchema = z.object({
  preferences: z.array(onboardingPreferenceSchema).length(3),
});

export { onboardingPreferenceRequestSchema, onboardingPreferenceSchema };

export type OnboardingPreferenceRequestValues = z.infer<typeof onboardingPreferenceRequestSchema>;
