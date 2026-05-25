import {
  LIFESTYLE_MULTI_QUESTIONS,
  LIFESTYLE_SINGLE_QUESTIONS,
} from "@/features/onboarding/constants";
import {
  onboardingBedtimeSchema,
  onboardingCallHabitSchema,
  onboardingChecklistRequestSchema,
  onboardingCleaningCycleSchema,
  onboardingDormStayTimeSchema,
  onboardingIndoorTemperatureSchema,
  onboardingNoiseSensitivitySchema,
  type OnboardingChecklistRequestValues,
  onboardingSleepHabitSchema,
  onboardingSmokingSchema,
  onboardingWakeUpTimeSchema,
} from "@/features/onboarding/schemas";
import type { OnBoardingFormValues } from "@/features/onboarding/types";

type OnboardingChecklistMappingResult =
  | { status: "skipped" }
  | { status: "invalid"; error: string }
  | { status: "valid"; value: OnboardingChecklistRequestValues };

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
): Array<T[number] | undefined> {
  return values.map((value) => {
    const selectedIndex = options.findIndex((option) => option === value);
    return enumValues[selectedIndex];
  });
}

function mapOnboardingChecklistFormToRequest(
  values: OnBoardingFormValues,
): OnboardingChecklistMappingResult {
  const isSkipped =
    values.sleepTime === null &&
    values.wakeUpTime === null &&
    values.sleepingHabit.length === 0 &&
    values.cleaningCycle === null &&
    values.dormStayDuration === null &&
    values.callHabit === null &&
    values.indoorTemperature === null &&
    values.noiseSensitivity === null &&
    values.smoking === null;

  if (isSkipped) {
    return { status: "skipped" };
  }

  const parsed = onboardingChecklistRequestSchema.safeParse({
    bedtime: mapSingleOption(
      values.sleepTime,
      getSingleOptions("sleepTime"),
      onboardingBedtimeSchema.options,
    ),
    wakeUpTime: mapSingleOption(
      values.wakeUpTime,
      getSingleOptions("wakeUpTime"),
      onboardingWakeUpTimeSchema.options,
    ),
    sleepHabits: mapMultiOption(
      values.sleepingHabit,
      sleepingHabitOptions,
      onboardingSleepHabitSchema.options,
    ),
    cleaningCycle: mapSingleOption(
      values.cleaningCycle,
      getSingleOptions("cleaningCycle"),
      onboardingCleaningCycleSchema.options,
    ),
    dormStayTime: mapSingleOption(
      values.dormStayDuration,
      getSingleOptions("dormStayDuration"),
      onboardingDormStayTimeSchema.options,
    ),
    callHabit: mapSingleOption(
      values.callHabit,
      getSingleOptions("callHabit"),
      onboardingCallHabitSchema.options,
    ),
    indoorTemperature: mapSingleOption(
      values.indoorTemperature,
      getSingleOptions("indoorTemperature"),
      onboardingIndoorTemperatureSchema.options,
    ),
    noiseSensitivity: mapSingleOption(
      values.noiseSensitivity,
      getSingleOptions("noiseSensitivity"),
      onboardingNoiseSensitivitySchema.options,
    ),
    smoking: mapSingleOption(
      values.smoking,
      getSingleOptions("smoking"),
      onboardingSmokingSchema.options,
    ),
  });

  if (!parsed.success) {
    return { status: "invalid", error: "생활 습관 체크리스트 정보를 다시 확인해 주세요." };
  }

  return { status: "valid", value: parsed.data };
}

export { mapOnboardingChecklistFormToRequest };
