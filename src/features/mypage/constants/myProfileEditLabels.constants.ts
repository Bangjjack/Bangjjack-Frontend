import { DORMITORY_LABEL, ROOMMATE_PREFERENCE_LABEL, SEMESTER_LABEL } from "@/constants";
import {
  CAMPUS_OPTIONS,
  DORMITORY_OPTIONS,
  GENDER_OPTIONS,
} from "@/features/mypage/constants/myProfileEditContent.constants";
import type { MyProfileChecklistFieldMeta } from "@/features/mypage/types";

const MY_PROFILE_CAMPUS_LABEL: Record<string, string> = {
  GLOBAL_CAMPUS: CAMPUS_OPTIONS[0],
  MEDICAL_CAMPUS: CAMPUS_OPTIONS[1],
};

const MY_PROFILE_GENDER_LABEL: Record<string, string> = {
  MALE: GENDER_OPTIONS[0],
  FEMALE: GENDER_OPTIONS[1],
};

const MY_PROFILE_DORMITORY_FALLBACK = DORMITORY_OPTIONS[0];

const MY_PROFILE_CHECKLIST_FIELD_META: MyProfileChecklistFieldMeta[] = [
  {
    id: "bedtime",
    label: "취침 시간",
    valueLabel: {
      BEFORE_22: "22시 이전",
      BETWEEN_22_24: "22~24시",
      BETWEEN_24_2: "24~2시",
      AFTER_2: "2시 이후",
      IRREGULAR: "불규칙",
    },
  },
  {
    id: "wakeUpTime",
    label: "기상 시간",
    valueLabel: {
      BEFORE_6: "6시 이전",
      BETWEEN_6_8: "6~8시",
      BETWEEN_8_10: "8~10시",
      AFTER_10: "10시 이후",
      IRREGULAR: "불규칙",
    },
  },
  {
    id: "sleepHabits",
    label: "잠버릇",
    valueLabel: {
      NONE: "없음",
      TOSS_AND_TURN: "뒤척임",
      SNORING: "코골이",
      TEETH_GRINDING: "이갈이",
      FREQUENT_WAKING: "자주 깸",
    },
  },
  {
    id: "cleaningCycle",
    label: "청소 주기",
    valueLabel: {
      ALMOST_DAILY: "거의 매일",
      ONCE_OR_TWICE_A_WEEK: "주 1~2회",
      SOMETIMES: "가끔",
      RARELY: "거의 안 함",
    },
  },
  {
    id: "dormStayTime",
    label: "기숙사 체류 시간",
    valueLabel: {
      MOSTLY_OUTSIDE: "대부분 밖에",
      HALF_AND_HALF: "반반 정도",
      MOSTLY_INSIDE: "대부분 기숙사에",
    },
  },
  {
    id: "callHabit",
    label: "통화 습관",
    valueLabel: {
      INSIDE_OK: "기숙사 안에서 가능",
      OUTSIDE_ONLY: "밖에서만",
      WHISPER: "작게 통화",
    },
  },
  {
    id: "indoorTemperature",
    label: "실내 온도",
    valueLabel: {
      SENSITIVE_TO_HEAT: "더위 탐",
      SENSITIVE_TO_COLD: "추위 탐",
      BOTH_SENSITIVE: "둘 다 민감",
      INSENSITIVE: "둔감한 편",
    },
  },
  {
    id: "noiseSensitivity",
    label: "소음 민감도",
    valueLabel: {
      VERY_INSENSITIVE: "매우 둔감",
      SLIGHTLY_INSENSITIVE: "약간 둔감",
      NORMAL: "보통",
      SLIGHTLY_SENSITIVE: "약간 민감",
      VERY_SENSITIVE: "매우 민감",
    },
  },
  {
    id: "smoking",
    label: "흡연 여부",
    valueLabel: {
      NON_SMOKER: "비흡연",
      CIGARETTE: "연초",
      ELECTRONIC_CIGARETTE: "전자담배",
    },
  },
];

export {
  DORMITORY_LABEL,
  MY_PROFILE_CAMPUS_LABEL,
  MY_PROFILE_CHECKLIST_FIELD_META,
  MY_PROFILE_DORMITORY_FALLBACK,
  MY_PROFILE_GENDER_LABEL,
  ROOMMATE_PREFERENCE_LABEL,
  SEMESTER_LABEL,
};
