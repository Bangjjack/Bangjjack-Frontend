import { useMemo, useState, type FormEvent } from "react";
import { BASIC_INFO_PROGRESS_STATES, SCHOOL_INFO_PROGRESS_STATES } from "../constants";
import type {
  OnBoardingFormValues,
  OnBoardingPageContentProps,
  OnBoardingStepId,
  SemesterType,
} from "../types";
import { OnBoardingLayout } from "./OnBoardingLayout";
import { OnBoardingBasicInfoStep, isBasicInfoStepComplete } from "./steps/OnBoardingBasicInfoStep";
import {
  OnBoardingSchoolInfoStep,
  isSchoolInfoStepComplete,
} from "./steps/OnBoardingSchoolInfoStep";

function OnBoardingPageContent({
  initialValues,
  onBack,
  onNext,
  userName = "OO",
}: OnBoardingPageContentProps) {
  const [currentStep, setCurrentStep] = useState<OnBoardingStepId>("basic-info");
  const [formValues, setFormValues] = useState<OnBoardingFormValues>({
    birthYear: initialValues?.birthYear ?? "",
    campus: initialValues?.campus ?? "",
    department: initialValues?.department ?? "",
    dormitory: initialValues?.dormitory ?? null,
    gender: initialValues?.gender ?? null,
    grade: initialValues?.grade ?? "",
    semesterType: initialValues?.semesterType ?? null,
  });

  const currentStepMeta = useMemo(() => {
    if (currentStep === "school-info") {
      return {
        actionLabel: "다음으로",
        isComplete: isSchoolInfoStepComplete(formValues),
        progressStates: SCHOOL_INFO_PROGRESS_STATES,
        title: "학교 정보에 대해\n알려주세요",
      };
    }

    return {
      actionLabel: "다음으로",
      isComplete: isBasicInfoStepComplete(formValues),
      progressStates: BASIC_INFO_PROGRESS_STATES,
      title: `${userName}님에 대해\n알려주세요`,
    };
  }, [currentStep, formValues, userName]);

  const handleChangeBasicInfoField = (key: "birthYear" | "grade", value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleChangeSchoolInfoField = (key: "campus" | "department", value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSelectGender = (gender: NonNullable<OnBoardingFormValues["gender"]>) => {
    setFormValues((prev) => ({ ...prev, gender }));
  };

  const handleSelectSemesterType = (semesterType: SemesterType) => {
    setFormValues((prev) => ({ ...prev, semesterType }));
  };

  const handleSelectDormitory = (dormitory: string) => {
    setFormValues((prev) => ({ ...prev, dormitory }));
  };

  const handleBack = () => {
    if (currentStep === "school-info") {
      setCurrentStep("basic-info");
      return;
    }

    onBack?.();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!currentStepMeta.isComplete) {
      return;
    }

    if (currentStep === "basic-info") {
      setCurrentStep("school-info");
      return;
    }

    onNext?.(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <OnBoardingLayout
        actionDisabled={!currentStepMeta.isComplete}
        actionLabel={currentStepMeta.actionLabel}
        onBack={handleBack}
        progressStates={currentStepMeta.progressStates}
        title={currentStepMeta.title}
      >
        {currentStep === "basic-info" ? (
          <OnBoardingBasicInfoStep
            values={formValues}
            onFieldChange={handleChangeBasicInfoField}
            onGenderChange={handleSelectGender}
          />
        ) : (
          <OnBoardingSchoolInfoStep
            values={formValues}
            onFieldChange={handleChangeSchoolInfoField}
            onDormitoryChange={handleSelectDormitory}
            onSemesterTypeChange={handleSelectSemesterType}
          />
        )}
      </OnBoardingLayout>
    </form>
  );
}

export { OnBoardingPageContent };
