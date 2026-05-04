import { ChipQuestionSection } from "@/components/ui";
import {
  LIFESTYLE_MULTI_QUESTIONS,
  LIFESTYLE_SINGLE_QUESTIONS,
} from "@/features/onboarding/constants";
import type {
  LifestyleMultiFieldKey,
  LifestyleSingleFieldKey,
  OnBoardingFormValues,
} from "@/features/onboarding/types";

type OnBoardingLifestyleStepProps = {
  onMultiSelectChange: (key: LifestyleMultiFieldKey, value: string) => void;
  onSingleSelectChange: (key: LifestyleSingleFieldKey, value: string) => void;
  values: OnBoardingFormValues;
};

function toSelectedValues(value: string | null) {
  return value ? [value] : [];
}

function OnBoardingLifestyleStep({
  onMultiSelectChange,
  onSingleSelectChange,
  values,
}: OnBoardingLifestyleStepProps) {
  return (
    <div className="flex flex-1 flex-col gap-8.75">
      {LIFESTYLE_SINGLE_QUESTIONS.slice(0, 2).map((question) => (
        <ChipQuestionSection
          key={question.key}
          title={question.label}
          options={question.options}
          selectedValues={toSelectedValues(values[question.key])}
          selectionType="single"
          onToggle={(value) => onSingleSelectChange(question.key, value)}
        />
      ))}

      {LIFESTYLE_MULTI_QUESTIONS.map((question) => (
        <ChipQuestionSection
          key={question.key}
          helperText={question.helperText}
          title={question.label}
          options={question.options}
          selectedValues={values[question.key]}
          selectionType="multi"
          onToggle={(value) => onMultiSelectChange(question.key, value)}
        />
      ))}

      {LIFESTYLE_SINGLE_QUESTIONS.slice(2).map((question) => (
        <ChipQuestionSection
          key={question.key}
          title={question.label}
          options={question.options}
          selectedValues={toSelectedValues(values[question.key])}
          selectionType="single"
          onToggle={(value) => onSingleSelectChange(question.key, value)}
        />
      ))}
    </div>
  );
}

export { OnBoardingLifestyleStep };
