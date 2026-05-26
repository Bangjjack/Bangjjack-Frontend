import type { UserChecklistData } from "@/features/user/types";

type ChecklistState = Record<string, string | string[]>;

function invertMap(map: Record<string, string>): Record<string, string> {
  return Object.fromEntries(Object.entries(map).map(([k, v]) => [v, k]));
}

const BEDTIME: Record<string, string> = {
  BEFORE_22: "22시 이전",
  "22_TO_24": "22~24시",
  "24_TO_2": "24~2시",
  AFTER_2: "2시 이후",
  IRREGULAR: "불규칙",
};

const WAKE_UP_TIME: Record<string, string> = {
  BEFORE_6: "6시 이전",
  "6_TO_8": "6~8시",
  "8_TO_10": "8~10시",
  AFTER_10: "10시 이후",
  IRREGULAR: "불규칙",
};

const SLEEP_HABITS: Record<string, string> = {
  NONE: "없음",
  TOSSING: "뒤척임",
  SNORING: "코골이",
  TEETH_GRINDING: "이갈이",
  FREQUENT_WAKING: "자주 깸",
};

const CLEANING_CYCLE: Record<string, string> = {
  ALMOST_DAILY: "거의 매일",
  ONCE_TWICE_WEEKLY: "주 1~2회",
  SOMETIMES: "가끔",
  RARELY: "거의 안 함",
};

const DORM_STAY_TIME: Record<string, string> = {
  MOSTLY_OUTSIDE: "대부분 밖에",
  HALF: "절반 정도",
  MOSTLY_INSIDE: "대부분 기숙사 안에",
};

const CALL_HABIT: Record<string, string> = {
  INSIDE_OK: "기숙사 내부 가능",
  OUTSIDE_ONLY: "밖에서만",
  QUIET: "소곤소곤",
};

const INDOOR_TEMPERATURE: Record<string, string> = {
  SENSITIVE_TO_HEAT: "더위 잘 탐",
  SENSITIVE_TO_COLD: "추위 잘 탐",
  BOTH_SENSITIVE: "둘 다 예민",
  NOT_SENSITIVE: "둔감한 편",
};

const NOISE_SENSITIVITY: Record<string, string> = {
  VERY_INSENSITIVE: "둔감한 편",
  SLIGHTLY_INSENSITIVE: "약간 둔감",
  MODERATE: "보통",
  SLIGHTLY_SENSITIVE: "약간 예민",
  VERY_SENSITIVE: "예민한 편",
};

const SMOKING: Record<string, string> = {
  NON_SMOKER: "비흡연",
  SMOKER: "연초",
  E_CIGARETTE: "전자 담배",
};

const BEDTIME_INV = invertMap(BEDTIME);
const WAKE_UP_TIME_INV = invertMap(WAKE_UP_TIME);
const SLEEP_HABITS_INV = invertMap(SLEEP_HABITS);
const CLEANING_CYCLE_INV = invertMap(CLEANING_CYCLE);
const DORM_STAY_TIME_INV = invertMap(DORM_STAY_TIME);
const CALL_HABIT_INV = invertMap(CALL_HABIT);
const INDOOR_TEMPERATURE_INV = invertMap(INDOOR_TEMPERATURE);
const NOISE_SENSITIVITY_INV = invertMap(NOISE_SENSITIVITY);
const SMOKING_INV = invertMap(SMOKING);

export function apiChecklistToFormState(data: UserChecklistData): ChecklistState {
  return {
    sleepTime: BEDTIME[data.bedtime] ?? "",
    wakeUpTime: WAKE_UP_TIME[data.wakeUpTime] ?? "",
    sleepingHabit: data.sleepHabits.map((v) => SLEEP_HABITS[v] ?? v),
    cleaningCycle: CLEANING_CYCLE[data.cleaningCycle] ?? "",
    dormStayDuration: DORM_STAY_TIME[data.dormStayTime] ?? "",
    callHabit: CALL_HABIT[data.callHabit] ?? "",
    indoorTemperature: INDOOR_TEMPERATURE[data.indoorTemperature] ?? "",
    noiseSensitivity: NOISE_SENSITIVITY[data.noiseSensitivity] ?? "",
    smoking: SMOKING[data.smoking] ?? "",
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
