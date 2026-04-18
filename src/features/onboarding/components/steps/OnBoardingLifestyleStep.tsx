import { Chip } from "@/components/ui";
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

type ChipQuestionSectionProps = {
  helperText?: string;
  isMulti?: boolean;
  label: string;
  onToggle: (value: string) => void;
  options: readonly string[];
  selectedValues: readonly string[];
};

function toSelectedValues(value: string | null) {
  return value ? [value] : [];
}

function ChipQuestionSection({
  helperText,
  isMulti = false,
  label,
  onToggle,
  options,
  selectedValues,
}: ChipQuestionSectionProps) {
  return (
    <div className="flex w-full flex-col gap-300 px-400">
      <div className="flex items-center gap-300">
        <h2 className="typo-title1 text-text-strong">{label}</h2>
        {helperText ? (
          <span className="typo-caption2 text-text-placeholder">{helperText}</span>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-200">
        {options.map((option) => {
          const selected = selectedValues.includes(option);

          return (
            <Chip
              key={option}
              variant={isMulti ? "multi" : "single"}
              selected={selected}
              onClick={() => onToggle(option)}
              className="cursor-pointer"
            >
              {option}
            </Chip>
          );
        })}
      </div>
    </div>
  );
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
          label={question.label}
          options={question.options}
          selectedValues={toSelectedValues(values[question.key])}
          onToggle={(value) => onSingleSelectChange(question.key, value)}
        />
      ))}

      {LIFESTYLE_MULTI_QUESTIONS.map((question) => (
        <ChipQuestionSection
          key={question.key}
          helperText={question.helperText}
          isMulti
          label={question.label}
          options={question.options}
          selectedValues={values[question.key]}
          onToggle={(value) => onMultiSelectChange(question.key, value)}
        />
      ))}

      {LIFESTYLE_SINGLE_QUESTIONS.slice(2).map((question) => (
        <ChipQuestionSection
          key={question.key}
          label={question.label}
          options={question.options}
          selectedValues={toSelectedValues(values[question.key])}
          onToggle={(value) => onSingleSelectChange(question.key, value)}
        />
      ))}
    </div>
  );
}

export { OnBoardingLifestyleStep };
