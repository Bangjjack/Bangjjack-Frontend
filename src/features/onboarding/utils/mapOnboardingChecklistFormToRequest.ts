import {
  LIFESTYLE_MULTI_QUESTIONS,
  LIFESTYLE_SINGLE_QUESTIONS,
} from "@/features/onboarding/constants";
import {
  onboardingChecklistRequestSchema,
  type OnboardingChecklistRequestValues,
} from "@/features/onboarding/schemas";
import type { OnBoardingFormValues } from "@/features/onboarding/types";

const BEDTIME_VALUES = [
  "BEFORE_22",
  "BETWEEN_22_24",
  "BETWEEN_24_2",
  "AFTER_2",
  "IRREGULAR",
] as const;
const WAKE_UP_TIME_VALUES = [
  "BEFORE_6",
  "BETWEEN_6_8",
  "BETWEEN_8_10",
  "AFTER_10",
  "IRREGULAR",
] as const;
const SLEEP_HABIT_VALUES = [
  "NONE",
  "TEETH_GRINDING",
  "SNORING",
  "SLEEP_TALKING",
  "OFTEN_WAKES_UP",
] as const;
const CLEANING_CYCLE_VALUES = [
  "ALMOST_DAILY",
  "ONCE_OR_TWICE_A_WEEK",
  "SOMETIMES",
  "RARELY",
] as const;
const DORM_STAY_TIME_VALUES = ["MOSTLY_OUTSIDE", "HALF_AND_HALF", "MOSTLY_INSIDE"] as const;
const CALL_HABIT_VALUES = ["INSIDE_OK", "OUTSIDE_ONLY", "WHISPER"] as const;
const INDOOR_TEMPERATURE_VALUES = [
  "SENSITIVE_TO_HEAT",
  "SENSITIVE_TO_COLD",
  "INSENSITIVE",
  "BOTH_SENSITIVE",
] as const;
const NOISE_SENSITIVITY_VALUES = [
  "VERY_SENSITIVE",
  "SLIGHTLY_SENSITIVE",
  "NORMAL",
  "SLIGHTLY_INSENSITIVE",
  "VERY_INSENSITIVE",
] as const;
const SMOKING_VALUES = ["NON_SMOKER", "CIGARETTE", "ELECTRONIC_CIGARETTE"] as const;

const sleepingHabitOptions =
  LIFESTYLE_MULTI_QUESTIONS.find((question) => question.key === "sleepingHabit")?.options ?? [];

function getSingleOptions(key: (typeof LIFESTYLE_SINGLE_QUESTIONS)[number]["key"]) {
  return LIFESTYLE_SINGLE_QUESTIONS.find((question) => question.key === key)?.options ?? [];
}

function mapSingleOption<T extends readonly string[]>(
  value: string | null,
  options: readonly string[],
  enumValues: T,
): T[number] | undefined {
  if (value === null) {
    return undefined;
  }

  const selectedIndex = options.findIndex((option) => option === value);
  return enumValues[selectedIndex];
}

function mapMultiOption<T extends readonly string[]>(
  values: string[],
  options: readonly string[],
  enumValues: T,
): T[number][] {
  return values
    .map((value) => {
      const selectedIndex = options.findIndex((option) => option === value);
      return enumValues[selectedIndex];
    })
    .filter((value): value is T[number] => value !== undefined);
}

function mapOnboardingChecklistFormToRequest(
  values: OnBoardingFormValues,
): OnboardingChecklistRequestValues | null {
  const parsed = onboardingChecklistRequestSchema.safeParse({
    bedtime: mapSingleOption(values.sleepTime, getSingleOptions("sleepTime"), BEDTIME_VALUES),
    wakeUpTime: mapSingleOption(
      values.wakeUpTime,
      getSingleOptions("wakeUpTime"),
      WAKE_UP_TIME_VALUES,
    ),
    sleepHabits: mapMultiOption(values.sleepingHabit, sleepingHabitOptions, SLEEP_HABIT_VALUES),
    cleaningCycle: mapSingleOption(
      values.cleaningCycle,
      getSingleOptions("cleaningCycle"),
      CLEANING_CYCLE_VALUES,
    ),
    dormStayTime: mapSingleOption(
      values.dormStayDuration,
      getSingleOptions("dormStayDuration"),
      DORM_STAY_TIME_VALUES,
    ),
    callHabit: mapSingleOption(values.callHabit, getSingleOptions("callHabit"), CALL_HABIT_VALUES),
    indoorTemperature: mapSingleOption(
      values.indoorTemperature,
      getSingleOptions("indoorTemperature"),
      INDOOR_TEMPERATURE_VALUES,
    ),
    noiseSensitivity: mapSingleOption(
      values.noiseSensitivity,
      getSingleOptions("noiseSensitivity"),
      NOISE_SENSITIVITY_VALUES,
    ),
    smoking: mapSingleOption(values.smoking, getSingleOptions("smoking"), SMOKING_VALUES),
  });

  return parsed.success ? parsed.data : null;
}

export { mapOnboardingChecklistFormToRequest };
