import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ActiveOnBoardingStep } from "@/features/onboarding/config/stepConfig";
import type { OnBoardingFormValues } from "@/features/onboarding/types";
import { createInitialOnboardingFormValues } from "@/features/onboarding/utils";

type OnboardingState = {
  currentStep: ActiveOnBoardingStep;
  formValues: OnBoardingFormValues;
  reset: () => void;
  setCurrentStep: (currentStep: ActiveOnBoardingStep) => void;
  setFormValues: (formValues: OnBoardingFormValues) => void;
};

const INITIAL_STEP: ActiveOnBoardingStep = "basic-info";
const ONBOARDING_DRAFT_KEY = "onboardingDraft";

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      currentStep: INITIAL_STEP,
      formValues: createInitialOnboardingFormValues(),
      reset: () =>
        set({
          currentStep: INITIAL_STEP,
          formValues: createInitialOnboardingFormValues(),
        }),
      setCurrentStep: (currentStep) => set({ currentStep }),
      setFormValues: (formValues) => set({ formValues }),
    }),
    { name: ONBOARDING_DRAFT_KEY },
  ),
);
