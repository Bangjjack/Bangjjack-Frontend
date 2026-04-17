import { useMemo, useState, type FormEvent } from "react";
import {
  BASIC_INFO_PROGRESS_STATES,
  LIFESTYLE_PROGRESS_STATES,
  SCHOOL_INFO_PROGRESS_STATES,
} from "../constants";
import type {
  LifestyleMultiFieldKey,
  LifestyleSingleFieldKey,
  OnBoardingFormValues,
  OnBoardingPageContentProps,
  OnBoardingStepId,
  SemesterType,
} from "../types";
import { OnBoardingLayout } from "./OnBoardingLayout";
import { OnBoardingBasicInfoStep, isBasicInfoStepComplete } from "./steps/OnBoardingBasicInfoStep";
import { OnBoardingLifestyleStep, isLifestyleStepComplete } from "./steps/OnBoardingLifestyleStep";
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
    callHabit: initialValues?.callHabit ?? null,
    cleaningCycle: initialValues?.cleaningCycle ?? null,
    department: initialValues?.department ?? "",
    dormStayDuration: initialValues?.dormStayDuration ?? null,
    dormitory: initialValues?.dormitory ?? null,
    gender: initialValues?.gender ?? null,
    grade: initialValues?.grade ?? "",
    indoorTemperature: initialValues?.indoorTemperature ?? null,
    noiseSensitivity: initialValues?.noiseSensitivity ?? null,
    semesterType: initialValues?.semesterType ?? null,
    sleepTime: initialValues?.sleepTime ?? null,
    sleepingHabit: initialValues?.sleepingHabit ?? [],
    smoking: initialValues?.smoking ?? null,
    wakeUpTime: initialValues?.wakeUpTime ?? null,
  });

  const currentStepMeta = useMemo(() => {
    if (currentStep === "lifestyle") {
      return {
        actionLabel: "다음으로",
        description: "룸메이트 매칭에 활용돼요",
        headerActionLabel: "건너뛰기",
        isComplete: isLifestyleStepComplete(formValues),
        progressStates: LIFESTYLE_PROGRESS_STATES,
        title: "나의 생활습관을\n알려주세요",
      };
    }

    if (currentStep === "school-info") {
      return {
        actionLabel: "다음으로",
        description: undefined,
        headerActionLabel: undefined,
        isComplete: isSchoolInfoStepComplete(formValues),
        progressStates: SCHOOL_INFO_PROGRESS_STATES,
        title: "학교 정보에 대해\n알려주세요",
      };
    }

    return {
      actionLabel: "다음으로",
      description: undefined,
      headerActionLabel: undefined,
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

  const handleSelectLifestyleSingle = (key: LifestyleSingleFieldKey, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleToggleLifestyleMulti = (key: LifestyleMultiFieldKey, value: string) => {
    setFormValues((prev) => {
      const nextValues = prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value];

      return { ...prev, [key]: nextValues };
    });
  };

  const handleBack = () => {
    if (currentStep === "lifestyle") {
      setCurrentStep("school-info");
      return;
    }

    if (currentStep === "school-info") {
      setCurrentStep("basic-info");
      return;
    }

    onBack?.();
  };

  const handleSkipLifestyle = () => {
    onNext?.(formValues);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (currentStep === "basic-info") {
      if (!currentStepMeta.isComplete) return;
      setCurrentStep("school-info");
      return;
    }

    if (currentStep === "school-info") {
      if (!currentStepMeta.isComplete) return;
      setCurrentStep("lifestyle");
      return;
    }

    if (!currentStepMeta.isComplete) {
      return;
    }

    onNext?.(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <OnBoardingLayout
        actionDisabled={!currentStepMeta.isComplete}
        actionLabel={currentStepMeta.actionLabel}
        description={currentStepMeta.description}
        headerActionLabel={currentStepMeta.headerActionLabel}
        onBack={handleBack}
        onHeaderAction={currentStep === "lifestyle" ? handleSkipLifestyle : undefined}
        progressStates={currentStepMeta.progressStates}
        title={currentStepMeta.title}
      >
        {currentStep === "basic-info" ? (
          <OnBoardingBasicInfoStep
            values={formValues}
            onFieldChange={handleChangeBasicInfoField}
            onGenderChange={handleSelectGender}
          />
        ) : null}

        {currentStep === "school-info" ? (
          <OnBoardingSchoolInfoStep
            values={formValues}
            onFieldChange={handleChangeSchoolInfoField}
            onDormitoryChange={handleSelectDormitory}
            onSemesterTypeChange={handleSelectSemesterType}
          />
        ) : null}

        {currentStep === "lifestyle" ? (
          <OnBoardingLifestyleStep
            values={formValues}
            onSingleSelectChange={handleSelectLifestyleSingle}
            onMultiSelectChange={handleToggleLifestyleMulti}
          />
        ) : null}
      </OnBoardingLayout>
    </form>
  );
}

export { OnBoardingPageContent };
