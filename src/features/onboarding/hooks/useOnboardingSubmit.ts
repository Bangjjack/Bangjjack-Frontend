import { isAxiosError } from "axios";
import { useCallback, useRef } from "react";

import { useRegistrationStatus } from "@/features/auth";
import { useSaveOnboarding } from "@/features/onboarding/hooks/useSaveOnboarding";
import { useSaveOnboardingChecklist } from "@/features/onboarding/hooks/useSaveOnboardingChecklist";
import { useSaveOnboardingPreference } from "@/features/onboarding/hooks/useSaveOnboardingPreference";
import { useOnboardingStore } from "@/features/onboarding/stores";
import type { OnBoardingFormValues } from "@/features/onboarding/types";
import {
  mapOnboardingChecklistFormToRequest,
  mapOnboardingFormToRequest,
  mapOnboardingPreferenceFormToRequest,
} from "@/features/onboarding/utils";

type UseOnboardingSubmitOptions = {
  onAlreadySaved?: (messages: string[], result: OnboardingSubmitResult) => void;
  onError?: (message: string) => void;
  onSuccess?: (result: OnboardingSubmitResult) => void;
};

type OnboardingSubmitResult = {
  isChecklistRegistered?: boolean;
  isOnboarded: boolean;
  isRoommatePreferenceRegistered?: boolean;
};

type SubmitContext = {
  alreadySavedMessages: string[];
  shouldStopSubmit: boolean;
  submitResult: OnboardingSubmitResult;
};

function getOnboardingErrorMessage(error: unknown) {
  if (isAxiosError(error) && error.response?.status === 409) {
    return "이미 온보딩 정보가 저장되었어요";
  }

  return "온보딩 정보 저장에 실패했어요";
}

function getChecklistErrorMessage(error: unknown) {
  if (isAxiosError(error) && error.response?.status === 409) {
    return "이미 생활습관 체크리스트가 저장되었어요";
  }

  return "생활습관 체크리스트 저장에 실패했어요";
}

function getPreferenceErrorMessage(error: unknown) {
  if (isAxiosError(error) && error.response?.status === 409) {
    return "이미 룸메이트 우선순위가 저장되었어요";
  }

  return "룸메이트 우선순위 저장에 실패했어요";
}

function useOnboardingSubmit({
  onAlreadySaved,
  onError,
  onSuccess,
}: UseOnboardingSubmitOptions = {}) {
  const submitContextRef = useRef<SubmitContext | null>(null);
  const { mutateAsync: saveOnboarding, isPending } = useSaveOnboarding({
    onError: (error) => {
      const submitContext = submitContextRef.current;

      if (!submitContext) {
        return;
      }

      if (isAxiosError(error) && error.response?.status === 409) {
        submitContext.alreadySavedMessages.push(getOnboardingErrorMessage(error));
        return;
      }

      submitContext.shouldStopSubmit = true;
      onError?.(getOnboardingErrorMessage(error));
    },
  });
  const { mutateAsync: saveOnboardingChecklist, isPending: isChecklistPending } =
    useSaveOnboardingChecklist({
      onError: (error) => {
        const submitContext = submitContextRef.current;

        if (!submitContext) {
          return;
        }

        if (isAxiosError(error) && error.response?.status === 409) {
          submitContext.alreadySavedMessages.push(getChecklistErrorMessage(error));
          submitContext.submitResult.isChecklistRegistered = true;
          return;
        }

        submitContext.shouldStopSubmit = true;
        onError?.(getChecklistErrorMessage(error));
      },
    });
  const { mutateAsync: saveOnboardingPreference, isPending: isPreferencePending } =
    useSaveOnboardingPreference({
      onError: (error) => {
        const submitContext = submitContextRef.current;

        if (!submitContext) {
          return;
        }

        if (isAxiosError(error) && error.response?.status === 409) {
          submitContext.alreadySavedMessages.push(getPreferenceErrorMessage(error));
          submitContext.submitResult.isRoommatePreferenceRegistered = true;
          return;
        }

        submitContext.shouldStopSubmit = true;
        onError?.(getPreferenceErrorMessage(error));
      },
    });
  const { data: registrationStatus } = useRegistrationStatus();
  const resetOnboarding = useOnboardingStore((state) => state.reset);

  const submit = useCallback(
    async (values: OnBoardingFormValues) => {
      const body = mapOnboardingFormToRequest(values);

      if (!body) {
        onError?.("온보딩 정보 변환에 실패했어요");
        return;
      }

      const checklistResult = mapOnboardingChecklistFormToRequest(values);
      const preferenceResult = mapOnboardingPreferenceFormToRequest(values);

      if (checklistResult.status === "invalid") {
        onError?.(checklistResult.error);
        return;
      }

      if (preferenceResult.status === "invalid") {
        onError?.(preferenceResult.error);
        return;
      }

      const alreadySavedMessages: string[] = [];
      const submitResult: OnboardingSubmitResult = {
        isOnboarded: true,
      };
      const submitContext: SubmitContext = {
        alreadySavedMessages,
        shouldStopSubmit: false,
        submitResult,
      };

      submitContextRef.current = submitContext;

      if (!registrationStatus?.isOnboarded) {
        await saveOnboarding(body).then(
          () => undefined,
          () => undefined,
        );

        if (submitContext.shouldStopSubmit) {
          submitContextRef.current = null;
          return;
        }
      }

      if (checklistResult.status === "valid") {
        if (registrationStatus?.isChecklistRegistered) {
          submitResult.isChecklistRegistered = true;
        } else {
          await saveOnboardingChecklist(checklistResult.value).then(
            () => {
              submitResult.isChecklistRegistered = true;
            },
            () => undefined,
          );

          if (submitContext.shouldStopSubmit) {
            submitContextRef.current = null;
            return;
          }
        }
      }

      if (preferenceResult.status === "valid") {
        if (registrationStatus?.isRoommatePreferenceRegistered) {
          submitResult.isRoommatePreferenceRegistered = true;
        } else {
          await saveOnboardingPreference(preferenceResult.value).then(
            () => {
              submitResult.isRoommatePreferenceRegistered = true;
            },
            () => undefined,
          );

          if (submitContext.shouldStopSubmit) {
            submitContextRef.current = null;
            return;
          }
        }
      }

      submitContextRef.current = null;
      resetOnboarding();
      if (alreadySavedMessages.length > 0) {
        onAlreadySaved?.(alreadySavedMessages, submitResult);
        return;
      }

      onSuccess?.(submitResult);
    },
    [
      onAlreadySaved,
      onError,
      onSuccess,
      registrationStatus,
      resetOnboarding,
      saveOnboarding,
      saveOnboardingChecklist,
      saveOnboardingPreference,
    ],
  );

  return {
    isPending: isPending || isChecklistPending || isPreferencePending,
    submit,
  };
}

export { useOnboardingSubmit };
