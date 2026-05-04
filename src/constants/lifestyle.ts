export type LifestyleSingleFieldKey =
  | "sleepTime"
  | "wakeUpTime"
  | "cleaningCycle"
  | "dormStayDuration"
  | "callHabit"
  | "indoorTemperature"
  | "noiseSensitivity"
  | "smoking";

export type LifestyleMultiFieldKey = "sleepingHabit";

export type LifestyleSingleQuestion = {
  key: LifestyleSingleFieldKey;
  label: string;
  options: readonly string[];
};

export type LifestyleMultiQuestion = {
  helperText: string;
  key: LifestyleMultiFieldKey;
  label: string;
  options: readonly string[];
};

export const LIFESTYLE_SINGLE_QUESTIONS: readonly LifestyleSingleQuestion[] = [
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

export const LIFESTYLE_MULTI_QUESTIONS: readonly LifestyleMultiQuestion[] = [
  {
    key: "sleepingHabit",
    label: "잠버릇",
    helperText: "복수 선택",
    options: ["없음", "뒤척임", "코골이", "이갈이", "자주 깸"],
  },
];
