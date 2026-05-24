import { z } from "zod";

const onboardingBedtimeSchema = z.enum([
  "BEFORE_22",
  "BETWEEN_22_24",
  "BETWEEN_24_2",
  "AFTER_2",
  "IRREGULAR",
]);
const onboardingWakeUpTimeSchema = z.enum([
  "BEFORE_6",
  "BETWEEN_6_8",
  "BETWEEN_8_10",
  "AFTER_10",
  "IRREGULAR",
]);
const onboardingSleepHabitSchema = z.enum([
  "NONE",
  "TEETH_GRINDING",
  "SNORING",
  "SLEEP_TALKING",
  "OFTEN_WAKES_UP",
]);
const onboardingCleaningCycleSchema = z.enum([
  "ALMOST_DAILY",
  "ONCE_OR_TWICE_A_WEEK",
  "SOMETIMES",
  "ALMOST_NEVER",
]);
const onboardingDormStayTimeSchema = z.enum(["MOSTLY_OUTSIDE", "HALF_AND_HALF", "MOSTLY_INSIDE"]);
const onboardingCallHabitSchema = z.enum(["INSIDE_OK", "OUTSIDE_ONLY", "OCCASIONALLY"]);
const onboardingIndoorTemperatureSchema = z.enum([
  "SENSITIVE_TO_HEAT",
  "SENSITIVE_TO_COLD",
  "NOT_SENSITIVE",
  "VERY_SENSITIVE",
]);
const onboardingNoiseSensitivitySchema = z.enum([
  "VERY_SENSITIVE",
  "SENSITIVE",
  "NORMAL",
  "INSENSITIVE",
  "VERY_INSENSITIVE",
]);
const onboardingSmokingSchema = z.enum(["NON_SMOKER", "SMOKER", "E_CIGARETTE"]);

const onboardingChecklistRequestSchema = z.object({
  bedtime: onboardingBedtimeSchema,
  wakeUpTime: onboardingWakeUpTimeSchema,
  sleepHabits: z.array(onboardingSleepHabitSchema).min(1),
  cleaningCycle: onboardingCleaningCycleSchema,
  dormStayTime: onboardingDormStayTimeSchema,
  callHabit: onboardingCallHabitSchema,
  indoorTemperature: onboardingIndoorTemperatureSchema,
  noiseSensitivity: onboardingNoiseSensitivitySchema,
  smoking: onboardingSmokingSchema,
});

export {
  onboardingBedtimeSchema,
  onboardingCallHabitSchema,
  onboardingChecklistRequestSchema,
  onboardingCleaningCycleSchema,
  onboardingDormStayTimeSchema,
  onboardingIndoorTemperatureSchema,
  onboardingNoiseSensitivitySchema,
  onboardingSleepHabitSchema,
  onboardingSmokingSchema,
  onboardingWakeUpTimeSchema,
};

export type OnboardingChecklistRequestValues = z.infer<typeof onboardingChecklistRequestSchema>;
