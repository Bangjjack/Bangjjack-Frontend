import { LIFESTYLE_MULTI_QUESTIONS, LIFESTYLE_SINGLE_QUESTIONS } from "@/constants";
import type { LifestyleMultiFieldKey, LifestyleSingleFieldKey } from "@/constants";
import type {
  Gender,
  OnBoardingStepId,
  ProgressState,
  SemesterType,
} from "@/features/onboarding/types";

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

export type { LifestyleMultiQuestion, LifestyleSingleQuestion };
