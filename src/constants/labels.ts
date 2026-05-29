import type { RoomSize } from "@/types";

export const ROOM_SIZE_LABEL: Record<RoomSize, string> = {
  TWO_PERSON: "2인 1실",
  THREE_PERSON: "3인 1실",
  FOUR_PERSON: "4인 1실",
};

export const ROOM_SIZE_MAX: Record<string, number> = {
  TWO_PERSON: 2,
  THREE_PERSON: 3,
  FOUR_PERSON: 4,
};

export const SEMESTER_LABEL: Record<string, string> = {
  SIXTEEN_WEEKS: "학기 (16주)",
  TWENTY_FIVE_WEEKS: "학기 (25주)",
};

export const DORMITORY_LABEL: Record<string, string> = {
  DORM_1: "1 기숙사",
  DORM_2: "2 기숙사",
  DORM_3: "3 기숙사",
};

export const SMOKING_LABEL: Record<string, string> = {
  NON_SMOKER: "비흡연",
  CIGARETTE: "연초",
  ELECTRONIC_CIGARETTE: "전자 담배",
};

export const BEDTIME_LABEL: Record<string, string> = {
  BEFORE_22: "22시 이전",
  BETWEEN_22_24: "22~24시",
  BETWEEN_24_2: "24~2시",
  AFTER_2: "2시 이후",
  IRREGULAR: "불규칙",
};

export const WAKE_UP_TIME_LABEL: Record<string, string> = {
  BEFORE_6: "6시 이전",
  BETWEEN_6_8: "6~8시",
  BETWEEN_8_10: "8~10시",
  AFTER_10: "10시 이후",
  IRREGULAR: "불규칙",
};

export const SLEEP_HABIT_LABEL: Record<string, string> = {
  NONE: "없음",
  TOSSING_AND_TURNING: "뒤척임",
  SNORING: "코골이",
  TEETH_GRINDING: "이갈이",
  FREQUENT_WAKING: "자주 깸",
};

export const CLEANING_CYCLE_LABEL: Record<string, string> = {
  ALMOST_DAILY: "거의 매일",
  ONE_TO_TWO_PER_WEEK: "주 1~2회",
  SOMETIMES: "가끔",
  RARELY: "거의 안 함",
};

export const DORM_STAY_TIME_LABEL: Record<string, string> = {
  MOSTLY_OUTSIDE: "대부분 밖에",
  HALF_AND_HALF: "절반 정도",
  MOSTLY_INSIDE: "대부분 기숙사 안에",
};

export const CALL_HABIT_LABEL: Record<string, string> = {
  INSIDE_OK: "기숙사 내부 가능",
  OUTSIDE_ONLY: "밖에서만",
  QUIET: "소곤소곤",
};

export const INDOOR_TEMPERATURE_LABEL: Record<string, string> = {
  SENSITIVE_TO_HEAT: "더위 잘 탐",
  SENSITIVE_TO_COLD: "추위 잘 탐",
  SENSITIVE_TO_BOTH: "둘 다 예민",
  NOT_SENSITIVE: "둔감한 편",
};

export const NOISE_SENSITIVITY_LABEL: Record<string, string> = {
  VERY_INSENSITIVE: "둔감한 편",
  SOMEWHAT_INSENSITIVE: "약간 둔감",
  MODERATE: "보통",
  SOMEWHAT_SENSITIVE: "약간 예민",
  VERY_SENSITIVE: "예민한 편",
};
