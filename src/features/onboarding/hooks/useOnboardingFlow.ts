import { useMemo, useState, type FormEvent } from "react";
import {
  NEXT_STEP_MAP,
  PREVIOUS_STEP_MAP,
  SKIP_STEP_MAP,
  getOnBoardingStepMeta,
  type ActiveOnBoardingStep,
} from "../config/stepConfig";
import type {
  LifestyleMultiFieldKey,
  LifestyleSingleFieldKey,
  OnBoardingFormValues,
  OnBoardingPageContentProps,
  SemesterType,
} from "../types";

function createInitialFormValues(
  initialValues?: Partial<OnBoardingFormValues>,
): OnBoardingFormValues {
  return {
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
    itemSharingPreference: initialValues?.itemSharingPreference ?? [],
    noiseSensitivity: initialValues?.noiseSensitivity ?? null,
    priorityFactors: initialValues?.priorityFactors ?? [],
    semesterType: initialValues?.semesterType ?? null,
    sleepTime: initialValues?.sleepTime ?? null,
    sleepingHabit: initialValues?.sleepingHabit ?? [],
    smoking: initialValues?.smoking ?? null,
    wakeUpTime: initialValues?.wakeUpTime ?? null,
  };
}

function useOnboardingFlow({
  initialValues,
  onBack,
  onNext,
  userName = "OO",
}: OnBoardingPageContentProps) {
  const [currentStep, setCurrentStep] = useState<ActiveOnBoardingStep>("basic-info");
  const [formValues, setFormValues] = useState<OnBoardingFormValues>(() =>
    createInitialFormValues(initialValues),
  );

  const currentStepMeta = useMemo(
    () => getOnBoardingStepMeta(currentStep, formValues, userName),
    [currentStep, formValues, userName],
  );

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

  const handleTogglePriorityFactor = (value: string) => {
    setFormValues((prev) => {
      const isSelected = prev.priorityFactors.includes(value);

      if (isSelected) {
        return {
          ...prev,
          priorityFactors: prev.priorityFactors.filter((item) => item !== value),
        };
      }

      if (prev.priorityFactors.length >= 3) {
        return prev;
      }

      return {
        ...prev,
        priorityFactors: [...prev.priorityFactors, value],
      };
    });
  };

  const handleBack = () => {
    const previousStep = PREVIOUS_STEP_MAP[currentStep];

    if (previousStep) {
      setCurrentStep(previousStep);
      return;
    }

    onBack?.();
  };

  const handleSkipCurrentStep = () => {
    const nextStep = SKIP_STEP_MAP[currentStep];

    if (nextStep) {
      setCurrentStep(nextStep);
      return;
    }

    onNext?.(formValues);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!currentStepMeta.isComplete) {
      return;
    }

    const nextStep = NEXT_STEP_MAP[currentStep];

    if (nextStep) {
      setCurrentStep(nextStep);
      return;
    }

    onNext?.(formValues);
  };

  return {
    currentStep,
    currentStepMeta,
    formValues,
    handleBack,
    handleChangeBasicInfoField,
    handleChangeSchoolInfoField,
    handleSelectDormitory,
    handleSelectGender,
    handleSelectLifestyleSingle,
    handleSelectSemesterType,
    handleSkipCurrentStep,
    handleSubmit,
    handleToggleLifestyleMulti,
    handleTogglePriorityFactor,
  };
}

export { useOnboardingFlow };
