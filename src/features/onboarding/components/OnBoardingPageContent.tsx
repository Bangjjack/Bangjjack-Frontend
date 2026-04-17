import { useState, type FormEvent } from "react";
import { BASIC_INFO_PROGRESS_STATES } from "../constants";
import type { OnBoardingFormValues, OnBoardingPageContentProps } from "../types";
import { OnBoardingLayout } from "./OnBoardingLayout";
import { OnBoardingBasicInfoStep, isBasicInfoStepComplete } from "./steps/OnBoardingBasicInfoStep";

function OnBoardingPageContent({
  initialValues,
  onBack,
  onNext,
  progressStates = BASIC_INFO_PROGRESS_STATES,
  userName = "OO",
}: OnBoardingPageContentProps) {
  const [formValues, setFormValues] = useState<OnBoardingFormValues>({
    birthYear: initialValues?.birthYear ?? "",
    gender: initialValues?.gender ?? null,
    grade: initialValues?.grade ?? "",
  });

  const isComplete = isBasicInfoStepComplete(formValues);

  const handleChangeField = (key: "birthYear" | "grade", value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSelectGender = (gender: NonNullable<OnBoardingFormValues["gender"]>) => {
    setFormValues((prev) => ({ ...prev, gender }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isComplete) {
      return;
    }

    onNext?.(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <OnBoardingLayout
        actionDisabled={!isComplete}
        actionLabel="다음으로"
        onBack={onBack}
        progressStates={progressStates}
        title={`${userName}님에 대해\n알려주세요`}
      >
        <OnBoardingBasicInfoStep
          values={formValues}
          onFieldChange={handleChangeField}
          onGenderChange={handleSelectGender}
        />
      </OnBoardingLayout>
    </form>
  );
}

export { OnBoardingPageContent };
