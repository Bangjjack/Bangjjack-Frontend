import { isAxiosError } from "axios";
import { useCallback } from "react";
import type { OnBoardingFormValues } from "@/features/onboarding/types";
import {
  mapOnboardingChecklistFormToRequest,
  mapOnboardingFormToRequest,
  mapOnboardingPreferenceFormToRequest,
} from "@/features/onboarding/utils";
import { useOnboardingStore } from "@/features/onboarding/stores";
import { useSaveOnboarding } from "@/features/onboarding/hooks/useSaveOnboarding";
import { useSaveOnboardingChecklist } from "@/features/onboarding/hooks/useSaveOnboardingChecklist";
import { useSaveOnboardingPreference } from "@/features/onboarding/hooks/useSaveOnboardingPreference";

type UseOnboardingSubmitOptions = {
  onAlreadySaved?: (message: string, result: OnboardingSubmitResult) => void;
  onError?: (message: string) => void;
  onSuccess?: (result: OnboardingSubmitResult) => void;
};

type OnboardingSubmitResult = {
  isChecklistRegistered?: boolean;
  isOnboardingCompleted: boolean;
  isRoommatePreferenceRegistered?: boolean;
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
  const { mutateAsync: saveOnboarding, isPending } = useSaveOnboarding();
  const { mutateAsync: saveOnboardingChecklist, isPending: isChecklistPending } =
    useSaveOnboardingChecklist();
  const { mutateAsync: saveOnboardingPreference, isPending: isPreferencePending } =
    useSaveOnboardingPreference();
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
        isOnboardingCompleted: true,
      };

      try {
        await saveOnboarding(body);
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 409) {
          alreadySavedMessages.push(getOnboardingErrorMessage(error));
        } else {
          onError?.(getOnboardingErrorMessage(error));
          return;
        }
      }

      if (checklistResult.status === "valid") {
        try {
          await saveOnboardingChecklist(checklistResult.value);
          submitResult.isChecklistRegistered = true;
        } catch (error) {
          if (isAxiosError(error) && error.response?.status === 409) {
            alreadySavedMessages.push(getChecklistErrorMessage(error));
            submitResult.isChecklistRegistered = true;
          } else {
            onError?.(getChecklistErrorMessage(error));
            return;
          }
        }
      }

      if (preferenceResult.status === "valid") {
        try {
          await saveOnboardingPreference(preferenceResult.value);
          submitResult.isRoommatePreferenceRegistered = true;
        } catch (error) {
          if (isAxiosError(error) && error.response?.status === 409) {
            alreadySavedMessages.push(getPreferenceErrorMessage(error));
            submitResult.isRoommatePreferenceRegistered = true;
          } else {
            onError?.(getPreferenceErrorMessage(error));
            return;
          }
        }
      }

      resetOnboarding();
      if (alreadySavedMessages.length > 0) {
        onAlreadySaved?.(alreadySavedMessages.join("\n"), submitResult);
        return;
      }

      onSuccess?.(submitResult);
    },
    [
      onAlreadySaved,
      onError,
      onSuccess,
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
