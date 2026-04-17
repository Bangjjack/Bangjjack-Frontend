import type {
  Gender,
  LifestyleMultiFieldKey,
  LifestyleSingleFieldKey,
  OnBoardingStepId,
  ProgressState,
  SemesterType,
} from "./types";

const ONBOARDING_STEP_ORDER: readonly OnBoardingStepId[] = [
  "basic-info",
  "school-info",
  "lifestyle",
  "preferences",
  "matching",
  "complete",
];

const BASIC_INFO_PROGRESS_STATES: readonly ProgressState[] = [
  "active",
  "default",
  "default",
  "default",
];

const SCHOOL_INFO_PROGRESS_STATES: readonly ProgressState[] = [
  "active",
  "active",
  "default",
  "default",
];

const LIFESTYLE_PROGRESS_STATES: readonly ProgressState[] = [
  "active",
  "active",
  "active",
  "default",
];

const PRIORITY_PROGRESS_STATES: readonly ProgressState[] = ["active", "active", "active", "active"];

const GENDER_OPTIONS: readonly { label: string; value: Gender }[] = [
  { label: "남성", value: "male" },
  { label: "여성", value: "female" },
];

const CAMPUS_OPTIONS = ["글로벌 캠퍼스", "메디컬 캠퍼스"] as const;

const DEPARTMENT_OPTIONS = ["컴퓨터공학과", "경영학과", "디자인학과", "심리학과"] as const;

const SEMESTER_OPTIONS: readonly { label: string; value: SemesterType }[] = [
  { label: "학기 (16주)", value: "semester" },
  { label: "반기 (25주)", value: "half" },
];

const DORMITORY_OPTIONS = ["1 기숙사", "2 기숙사", "3 기숙사"] as const;

type LifestyleSingleQuestion = {
  key: LifestyleSingleFieldKey;
  label: string;
  options: readonly string[];
};

type LifestyleMultiQuestion = {
  helperText: string;
  key: LifestyleMultiFieldKey;
  label: string;
  options: readonly string[];
};

const LIFESTYLE_SINGLE_QUESTIONS: readonly LifestyleSingleQuestion[] = [
  {
    key: "sleepTime",
    label: "취침 시간",
    options: ["22시 이전", "22~24시", "24~2시", "2시 이후", "불규칙"],
  },
  {
    key: "wakeUpTime",
    label: "기상 시간",
    options: ["6시 이전", "6~8시", "8~10시", "10시 이후", "불규칙"],
  },
  {
    key: "cleaningCycle",
    label: "청소 주기",
    options: ["거의 매일", "주 1~2회", "가끔", "거의 안 함"],
  },
  {
    key: "dormStayDuration",
    label: "기숙사 체류 시간",
    options: ["대부분 밖에", "절반 정도", "대부분 기숙사 안에"],
  },
  {
    key: "callHabit",
    label: "통화 습관",
    options: ["기숙사 내부 가능", "밖에서만", "소곤소곤"],
  },
  {
    key: "indoorTemperature",
    label: "실내 온도",
    options: ["더위 잘 탐", "추위 잘 탐", "둘 다 예민", "둔감한 편"],
  },
  {
    key: "noiseSensitivity",
    label: "소음 민감도",
    options: ["둔감한 편", "약간 둔감", "보통", "약간 예민", "예민한 편"],
  },
  {
    key: "smoking",
    label: "흡연",
    options: ["비흡연", "연초", "전자 담배"],
  },
];

const LIFESTYLE_MULTI_QUESTIONS: readonly LifestyleMultiQuestion[] = [
  {
    key: "sleepingHabit",
    label: "잠버릇",
    helperText: "복수 선택",
    options: ["없음", "뒤척임", "코골이", "이갈이", "자주 깸"],
  },
];

const PRIORITY_FACTOR_OPTIONS = [
  "취침 시간",
  "기상 시간",
  "잠버릇",
  "기숙사 체류 시간",
  "청결 습관",
  "실내 온도",
  "소음 민감도",
  "물건 공유",
  "흡연 여부",
  "통화 습관",
] as const;

export {
  BASIC_INFO_PROGRESS_STATES,
  CAMPUS_OPTIONS,
  DEPARTMENT_OPTIONS,
  DORMITORY_OPTIONS,
  GENDER_OPTIONS,
  LIFESTYLE_MULTI_QUESTIONS,
  LIFESTYLE_PROGRESS_STATES,
  LIFESTYLE_SINGLE_QUESTIONS,
  ONBOARDING_STEP_ORDER,
  PRIORITY_FACTOR_OPTIONS,
  PRIORITY_PROGRESS_STATES,
  SCHOOL_INFO_PROGRESS_STATES,
  SEMESTER_OPTIONS,
};
