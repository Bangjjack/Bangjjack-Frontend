import type { Gender, OnBoardingStepId, ProgressState } from "./types";

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
  "active",
  "default",
  "default",
  "default",
];

const DIGITS_ONLY_MESSAGE = "숫자만 입력해주세요.";

const BASIC_INFO_FIELDS = [
  {
    key: "birthYear",
    label: "출생연도",
    placeholder: "연도를 입력해주세요",
    suffix: "년",
    maxLength: 4,
  },
  {
    key: "grade",
    label: "학년",
    placeholder: "해당하는 학년을 입력해주세요",
    suffix: "학년",
    maxLength: 2,
  },
] as const;

const GENDER_OPTIONS: readonly { label: string; value: Gender }[] = [
  { label: "남성", value: "male" },
  { label: "여성", value: "female" },
];

export {
  BASIC_INFO_FIELDS,
  BASIC_INFO_PROGRESS_STATES,
  DIGITS_ONLY_MESSAGE,
  GENDER_OPTIONS,
  ONBOARDING_STEP_ORDER,
};
