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
  "TOSS_AND_TURN",
  "FREQUENT_WAKING",
]);
const onboardingCleaningCycleSchema = z.enum([
  "ALMOST_DAILY",
  "ONCE_OR_TWICE_A_WEEK",
  "SOMETIMES",
  "RARELY",
]);
const onboardingDormStayTimeSchema = z.enum(["MOSTLY_OUTSIDE", "HALF_AND_HALF", "MOSTLY_INSIDE"]);
const onboardingCallHabitSchema = z.enum(["INSIDE_OK", "OUTSIDE_ONLY", "WHISPER"]);
const onboardingIndoorTemperatureSchema = z.enum([
  "SENSITIVE_TO_HEAT",
  "SENSITIVE_TO_COLD",
  "INSENSITIVE",
  "BOTH_SENSITIVE",
]);
const onboardingNoiseSensitivitySchema = z.enum([
  "VERY_SENSITIVE",
  "SLIGHTLY_SENSITIVE",
  "NORMAL",
  "SLIGHTLY_INSENSITIVE",
  "VERY_INSENSITIVE",
]);
const onboardingSmokingSchema = z.enum(["NON_SMOKER", "CIGARETTE", "ELECTRONIC_CIGARETTE"]);

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
