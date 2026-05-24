import { createElement } from "react";
import type { ReactNode } from "react";
import {
  BASIC_INFO_PROGRESS_STATES,
  LIFESTYLE_PROGRESS_STATES,
  PRIORITY_PROGRESS_STATES,
  SCHOOL_INFO_PROGRESS_STATES,
} from "@/features/onboarding/constants";
import type {
  OnBoardingFormValues,
  OnBoardingStepId,
  ProgressState,
} from "@/features/onboarding/types";
import {
  isBasicInfoStepComplete,
  isLifestyleStepComplete,
  isPriorityStepComplete,
  isSchoolInfoStepComplete,
} from "@/features/onboarding/validation";

type ActiveOnBoardingStep = Extract<
  OnBoardingStepId,
  "basic-info" | "school-info" | "lifestyle" | "preferences"
>;

type OnBoardingStepMeta = {
  actionLabel: string;
  description?: string;
  footerDescription?: ReactNode;
  footerDescriptionKey?: string;
  headerActionLabel?: string;
  isComplete: boolean;
  progressStates: readonly ProgressState[];
  title: string;
};

const STEP_PROGRESS_STATE_MAP: Record<ActiveOnBoardingStep, readonly ProgressState[]> = {
  "basic-info": BASIC_INFO_PROGRESS_STATES,
  "school-info": SCHOOL_INFO_PROGRESS_STATES,
  lifestyle: LIFESTYLE_PROGRESS_STATES,
  preferences: PRIORITY_PROGRESS_STATES,
};

const NEXT_STEP_MAP: Partial<Record<ActiveOnBoardingStep, ActiveOnBoardingStep>> = {
  "basic-info": "school-info",
  "school-info": "lifestyle",
  lifestyle: "preferences",
};

const PREVIOUS_STEP_MAP: Partial<Record<ActiveOnBoardingStep, ActiveOnBoardingStep>> = {
  "school-info": "basic-info",
  lifestyle: "school-info",
  preferences: "lifestyle",
};

const SKIP_STEP_MAP: Partial<Record<ActiveOnBoardingStep, ActiveOnBoardingStep>> = {
  lifestyle: "preferences",
};

function renderPriorityFooter(selectedFactors: string[]) {
  if (selectedFactors.length === 0) {
    return "선호 순서대로 1~3순위를 정해 주세요";
  }

  return createElement(
    "p",
    { className: "typo-caption2 leading-[16px] text-text-placeholder" },
    ...selectedFactors.flatMap((factor, index) => {
      const children: ReactNode[] = [
        createElement(
          "span",
          { key: "label", className: "text-text-primary-alternative" },
          `${index + 1}. ${factor}`,
        ),
      ];

      if (index < selectedFactors.length - 1) {
        children.push(createElement("span", { key: "separator" }, "  →  "));
      }

      return createElement("span", { key: `${factor}-${index}` }, ...children);
    }),
  );
}

function getOnBoardingStepMeta(
  step: ActiveOnBoardingStep,
  formValues: OnBoardingFormValues,
  userName: string,
): OnBoardingStepMeta {
  switch (step) {
    case "preferences":
      return {
        actionLabel: "완료하기",
        description: "중요한 순서대로 3가지를 골라주세요",
        footerDescription: renderPriorityFooter(formValues.priorityFactors),
        footerDescriptionKey: `priority-${formValues.priorityFactors.join("|") || "empty"}`,
        headerActionLabel: "건너뛰기",
        isComplete: isPriorityStepComplete(formValues.priorityFactors),
        progressStates: STEP_PROGRESS_STATE_MAP[step],
        title: "룸메이트를 고를 때\n가장 중요하게 생각하는 건?",
      };
    case "lifestyle":
      return {
        actionLabel: "다음으로",
        description: "룸메이트 매칭에 사용돼요",
        headerActionLabel: "건너뛰기",
        isComplete: isLifestyleStepComplete(formValues),
        progressStates: STEP_PROGRESS_STATE_MAP[step],
        title: "당신의 생활 습관을\n알려주세요",
      };
    case "school-info":
      return {
        actionLabel: "다음으로",
        isComplete: isSchoolInfoStepComplete(formValues),
        progressStates: STEP_PROGRESS_STATE_MAP[step],
        title: "학교 정보를\n알려주세요",
      };
    case "basic-info":
    default:
      return {
        actionLabel: "다음으로",
        isComplete: isBasicInfoStepComplete(formValues),
        progressStates: STEP_PROGRESS_STATE_MAP["basic-info"],
        title: `${userName}님에 대해 알려주세요`,
      };
  }
}

export { NEXT_STEP_MAP, PREVIOUS_STEP_MAP, SKIP_STEP_MAP, getOnBoardingStepMeta };
export type { ActiveOnBoardingStep, OnBoardingStepMeta };
