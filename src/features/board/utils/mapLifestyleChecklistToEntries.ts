import type { PostMemberLifestyleChecklist } from "@/features/board/types";
import type { ChecklistEntry } from "@/features/roommate/types/checklist";

export const BEDTIME_LABEL: Record<string, string> = {
  BEFORE_22: "22시 이전",
  "22_TO_24": "22~24시",
  "24_TO_2": "24~2시",
  AFTER_2: "2시 이후",
  IRREGULAR: "불규칙",
};

export const WAKE_UP_TIME_LABEL: Record<string, string> = {
  BEFORE_6: "6시 이전",
  "6_TO_8": "6~8시",
  "8_TO_10": "8~10시",
  AFTER_10: "10시 이후",
  IRREGULAR: "불규칙",
};

export const SLEEP_HABITS_LABEL: Record<string, string> = {
  NONE: "없음",
  TOSSING: "뒤척임",
  SNORING: "코골이",
  TEETH_GRINDING: "이갈이",
  FREQUENT_WAKING: "자주 깸",
};

export const CLEANING_CYCLE_LABEL: Record<string, string> = {
  ALMOST_DAILY: "거의 매일",
  ONCE_OR_TWICE_A_WEEK: "주 1~2회",
  SOMETIMES: "가끔",
  RARELY: "거의 안 함",
};

export const DORM_STAY_TIME_LABEL: Record<string, string> = {
  MOSTLY_OUTSIDE: "대부분 밖에",
  HALF: "절반 정도",
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
  BOTH_SENSITIVE: "둘 다 예민",
  NOT_SENSITIVE: "둔감한 편",
};

export const NOISE_SENSITIVITY_LABEL: Record<string, string> = {
  VERY_INSENSITIVE: "둔감한 편",
  SLIGHTLY_INSENSITIVE: "약간 둔감",
  MODERATE: "보통",
  SLIGHTLY_SENSITIVE: "약간 예민",
  VERY_SENSITIVE: "예민한 편",
};

export const SMOKING_LABEL: Record<string, string> = {
  NON_SMOKER: "비흡연",
  SMOKER: "연초",
  E_CIGARETTE: "전자 담배",
};

type ChecklistFieldMeta = {
  id: string;
  label: string;
  value: string;
  matched: boolean;
};

function buildFields(checklist: PostMemberLifestyleChecklist): ChecklistFieldMeta[] {
  return [
    {
      id: "bedtime",
      label: "취침 시간",
      value: BEDTIME_LABEL[checklist.bedtime.value] ?? checklist.bedtime.value,
      matched: checklist.bedtime.matched,
    },
    {
      id: "wakeUpTime",
      label: "기상 시간",
      value: WAKE_UP_TIME_LABEL[checklist.wakeUpTime.value] ?? checklist.wakeUpTime.value,
      matched: checklist.wakeUpTime.matched,
    },
    {
      id: "sleepHabits",
      label: "잠버릇",
      value: checklist.sleepHabits.value.map((v) => SLEEP_HABITS_LABEL[v] ?? v).join(", "),
      matched: checklist.sleepHabits.matched,
    },
    {
      id: "cleaningCycle",
      label: "청소 주기",
      value: CLEANING_CYCLE_LABEL[checklist.cleaningCycle.value] ?? checklist.cleaningCycle.value,
      matched: checklist.cleaningCycle.matched,
    },
    {
      id: "dormStayTime",
      label: "기숙사 체류 시간",
      value: DORM_STAY_TIME_LABEL[checklist.dormStayTime.value] ?? checklist.dormStayTime.value,
      matched: checklist.dormStayTime.matched,
    },
    {
      id: "callHabit",
      label: "통화 습관",
      value: CALL_HABIT_LABEL[checklist.callHabit.value] ?? checklist.callHabit.value,
      matched: checklist.callHabit.matched,
    },
    {
      id: "indoorTemperature",
      label: "실내 온도",
      value:
        INDOOR_TEMPERATURE_LABEL[checklist.indoorTemperature.value] ??
        checklist.indoorTemperature.value,
      matched: checklist.indoorTemperature.matched,
    },
    {
      id: "noiseSensitivity",
      label: "소음 민감도",
      value:
        NOISE_SENSITIVITY_LABEL[checklist.noiseSensitivity.value] ??
        checklist.noiseSensitivity.value,
      matched: checklist.noiseSensitivity.matched,
    },
    {
      id: "smoking",
      label: "흡연",
      value: SMOKING_LABEL[checklist.smoking.value] ?? checklist.smoking.value,
      matched: checklist.smoking.matched,
    },
  ];
}

export function mapLifestyleChecklistToEntries(
  checklist: PostMemberLifestyleChecklist,
): ChecklistEntry[] {
  return buildFields(checklist).map(({ id, label, value, matched }) => ({
    id,
    label,
    value,
    isMatched: matched,
  }));
}

export function computeChecklistMatchStats(checklist: PostMemberLifestyleChecklist): {
  matchRate: number;
  matchHighlights: string[];
} {
  const fields = buildFields(checklist);
  const matchedFields = fields.filter((f) => f.matched);
  const matchRate = Math.round((matchedFields.length / fields.length) * 100);
  const matchHighlights = matchedFields.map((f) => f.label);
  return { matchRate, matchHighlights };
}
