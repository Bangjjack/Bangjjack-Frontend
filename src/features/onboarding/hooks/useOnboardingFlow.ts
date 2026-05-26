import { useEffect, type FormEvent } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  NEXT_STEP_MAP,
  PREVIOUS_STEP_MAP,
  SKIP_STEP_MAP,
  getOnBoardingStepMeta,
} from "@/features/onboarding/config/stepConfig";
import { useOnboardingStore } from "@/features/onboarding/stores";
import type { OnBoardingFormValues, OnBoardingPageContentProps } from "@/features/onboarding/types";
import {
  createInitialOnboardingFormValues,
  mapOnboardingCampusToRequest,
} from "@/features/onboarding/utils";

function useOnboardingFlow({
  initialValues,
  onBack,
  onNext,
  progressStates,
  userName = "OO",
}: OnBoardingPageContentProps) {
  const currentStep = useOnboardingStore((state) => state.currentStep);
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const setStoredFormValues = useOnboardingStore((state) => state.setFormValues);
  const storedFormValues = useOnboardingStore.getState().formValues;
  const { control, setValue } = useForm<OnBoardingFormValues>({
    defaultValues: createInitialOnboardingFormValues({
      ...initialValues,
      ...storedFormValues,
    }),
  });
  const formValues = useWatch({ control }) as OnBoardingFormValues;

  useEffect(() => {
    setStoredFormValues(createInitialOnboardingFormValues(formValues));
  }, [formValues, setStoredFormValues]);

  const defaultCurrentStepMeta = getOnBoardingStepMeta(currentStep, formValues, userName);
  const currentStepMeta = {
    ...defaultCurrentStepMeta,
    progressStates: progressStates ?? defaultCurrentStepMeta.progressStates,
  };
  const selectedCampus = mapOnboardingCampusToRequest(formValues.campus) ?? null;

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
    selectedCampus,
    setValue,
  };
}

export { useOnboardingFlow };
