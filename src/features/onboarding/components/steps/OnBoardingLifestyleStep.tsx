import { Controller, type Control } from "react-hook-form";
import { ChipQuestionSection } from "@/components/ui";
import {
  LIFESTYLE_MULTI_QUESTIONS,
  LIFESTYLE_SINGLE_QUESTIONS,
} from "@/features/onboarding/constants";
import type { OnBoardingFormValues } from "@/features/onboarding/types";

type OnBoardingLifestyleStepProps = {
  control: Control<OnBoardingFormValues>;
  values: OnBoardingFormValues;
};

function toSelectedValues(value: string | null) {
  return value ? [value] : [];
}

function toggleMultiValue(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

function OnBoardingLifestyleStep({ control, values }: OnBoardingLifestyleStepProps) {
  return (
    <div className="flex flex-1 flex-col gap-8.75">
      {LIFESTYLE_SINGLE_QUESTIONS.slice(0, 2).map((question) => (
        <Controller
          key={question.key}
          control={control}
          name={question.key}
          render={({ field }) => (
            <ChipQuestionSection
              title={question.label}
              options={question.options}
              selectedValues={toSelectedValues(values[question.key])}
              selectionType="single"
              onToggle={field.onChange}
            />
          )}
        />
      ))}

      {LIFESTYLE_MULTI_QUESTIONS.map((question) => (
        <Controller
          key={question.key}
          control={control}
          name={question.key}
          render={({ field }) => (
            <ChipQuestionSection
              helperText={question.helperText}
              title={question.label}
              options={question.options}
              selectedValues={values[question.key]}
              selectionType="multi"
              onToggle={(value) => field.onChange(toggleMultiValue(field.value, value))}
            />
          )}
        />
      ))}

      {LIFESTYLE_SINGLE_QUESTIONS.slice(2).map((question) => (
        <Controller
          key={question.key}
          control={control}
          name={question.key}
          render={({ field }) => (
            <ChipQuestionSection
              title={question.label}
              options={question.options}
              selectedValues={toSelectedValues(values[question.key])}
              selectionType="single"
              onToggle={field.onChange}
            />
          )}
        />
      ))}
    </div>
  );
}

export { OnBoardingLifestyleStep };
