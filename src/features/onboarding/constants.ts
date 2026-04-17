import type { Gender, OnBoardingStepId, ProgressState, SemesterType } from "./types";

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

const SCHOOL_INFO_PROGRESS_STATES: readonly ProgressState[] = [
  "active",
  "active",
  "active",
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

const CAMPUS_OPTIONS = ["글로벌 캠퍼스", "메디컬 캠퍼스"] as const;

const DEPARTMENT_OPTIONS = ["컴퓨터공학과", "경영학과", "디자인학과", "심리학과"] as const;

const SEMESTER_OPTIONS: readonly { label: string; value: SemesterType }[] = [
  { label: "학기 (16주)", value: "semester" },
  { label: "반기 (25주)", value: "half" },
];

const DORMITORY_OPTIONS = ["1 기숙사", "2 기숙사", "3 기숙사"] as const;

export {
  BASIC_INFO_FIELDS,
  BASIC_INFO_PROGRESS_STATES,
  CAMPUS_OPTIONS,
  DEPARTMENT_OPTIONS,
  DIGITS_ONLY_MESSAGE,
  DORMITORY_OPTIONS,
  GENDER_OPTIONS,
  ONBOARDING_STEP_ORDER,
  SCHOOL_INFO_PROGRESS_STATES,
  SEMESTER_OPTIONS,
};
