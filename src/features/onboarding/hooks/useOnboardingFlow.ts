import { useState, type FormEvent } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  NEXT_STEP_MAP,
  PREVIOUS_STEP_MAP,
  SKIP_STEP_MAP,
  getOnBoardingStepMeta,
  type ActiveOnBoardingStep,
} from "@/features/onboarding/config/stepConfig";
import type { OnBoardingFormValues, OnBoardingPageContentProps } from "@/features/onboarding/types";

function createInitialFormValues(
  initialValues?: Partial<OnBoardingFormValues>,
): OnBoardingFormValues {
  return {
    birthYear: initialValues?.birthYear ?? "",
    campus: initialValues?.campus ?? "",
    callHabit: initialValues?.callHabit ?? null,
    cleaningCycle: initialValues?.cleaningCycle ?? null,
    department: initialValues?.department ?? "",
    departmentId: initialValues?.departmentId ?? null,
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
  progressStates,
  userName = "OO",
}: OnBoardingPageContentProps) {
  const [currentStep, setCurrentStep] = useState<ActiveOnBoardingStep>("basic-info");
  const { control, setValue } = useForm<OnBoardingFormValues>({
    defaultValues: createInitialFormValues(initialValues),
  });
  const formValues = useWatch({ control }) as OnBoardingFormValues;

  const defaultCurrentStepMeta = getOnBoardingStepMeta(currentStep, formValues, userName);
  const currentStepMeta = {
    ...defaultCurrentStepMeta,
    progressStates: progressStates ?? defaultCurrentStepMeta.progressStates,
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
    control,
    currentStep,
    currentStepMeta,
    formValues,
    handleBack,
    handleSkipCurrentStep,
    handleSubmit,
    setValue,
  };
}

export { useOnboardingFlow };
