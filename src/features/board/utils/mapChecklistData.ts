import type { UserChecklistData } from "@/features/user/types";

import {
  BEDTIME_LABEL,
  CALL_HABIT_LABEL,
  CLEANING_CYCLE_LABEL,
  DORM_STAY_TIME_LABEL,
  INDOOR_TEMPERATURE_LABEL,
  NOISE_SENSITIVITY_LABEL,
  SLEEP_HABITS_LABEL,
  SMOKING_LABEL,
  WAKE_UP_TIME_LABEL,
} from "./mapLifestyleChecklistToEntries";

type ChecklistState = Record<string, string | string[]>;

function invertMap(map: Record<string, string>): Record<string, string> {
  return Object.fromEntries(Object.entries(map).map(([k, v]) => [v, k]));
}

const BEDTIME_INV = invertMap(BEDTIME_LABEL);
const WAKE_UP_TIME_INV = invertMap(WAKE_UP_TIME_LABEL);
const SLEEP_HABITS_INV = invertMap(SLEEP_HABITS_LABEL);
const CLEANING_CYCLE_INV = invertMap(CLEANING_CYCLE_LABEL);
const DORM_STAY_TIME_INV = invertMap(DORM_STAY_TIME_LABEL);
const CALL_HABIT_INV = invertMap(CALL_HABIT_LABEL);
const INDOOR_TEMPERATURE_INV = invertMap(INDOOR_TEMPERATURE_LABEL);
const NOISE_SENSITIVITY_INV = invertMap(NOISE_SENSITIVITY_LABEL);
const SMOKING_INV = invertMap(SMOKING_LABEL);

export function apiChecklistToFormState(data: UserChecklistData): ChecklistState {
  return {
    sleepTime: BEDTIME_LABEL[data.bedtime] ?? "",
    wakeUpTime: WAKE_UP_TIME_LABEL[data.wakeUpTime] ?? "",
    sleepingHabit: data.sleepHabits.map((v) => SLEEP_HABITS_LABEL[v] ?? v),
    cleaningCycle: CLEANING_CYCLE_LABEL[data.cleaningCycle] ?? "",
    dormStayDuration: DORM_STAY_TIME_LABEL[data.dormStayTime] ?? "",
    callHabit: CALL_HABIT_LABEL[data.callHabit] ?? "",
    indoorTemperature: INDOOR_TEMPERATURE_LABEL[data.indoorTemperature] ?? "",
    noiseSensitivity: NOISE_SENSITIVITY_LABEL[data.noiseSensitivity] ?? "",
    smoking: SMOKING_LABEL[data.smoking] ?? "",
  };
}

export function formStateToApiChecklist(state: ChecklistState): UserChecklistData {
  return {
    bedtime: BEDTIME_INV[state.sleepTime as string] ?? "",
    wakeUpTime: WAKE_UP_TIME_INV[state.wakeUpTime as string] ?? "",
    sleepHabits: (state.sleepingHabit as string[]).map((v) => SLEEP_HABITS_INV[v] ?? v),
    cleaningCycle: CLEANING_CYCLE_INV[state.cleaningCycle as string] ?? "",
    dormStayTime: DORM_STAY_TIME_INV[state.dormStayDuration as string] ?? "",
    callHabit: CALL_HABIT_INV[state.callHabit as string] ?? "",
    indoorTemperature: INDOOR_TEMPERATURE_INV[state.indoorTemperature as string] ?? "",
    noiseSensitivity: NOISE_SENSITIVITY_INV[state.noiseSensitivity as string] ?? "",
    smoking: SMOKING_INV[state.smoking as string] ?? "",
  };
}
