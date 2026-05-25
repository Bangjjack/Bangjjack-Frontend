import { isAxiosError } from "axios";
import { useNavigate } from "react-router";

import { toast } from "@/components/ui";
import { OnBoardingPageContent } from "@/features/onboarding/components";
import {
  useSaveOnboarding,
  useSaveOnboardingChecklist,
  useSaveOnboardingPreference,
} from "@/features/onboarding/hooks";
import type { OnBoardingFormValues } from "@/features/onboarding/types";
import {
  mapOnboardingChecklistFormToRequest,
  mapOnboardingFormToRequest,
  mapOnboardingPreferenceFormToRequest,
} from "@/features/onboarding/utils";
import { useGoBack } from "@/hooks/useGoBack";
import { useAuthStore } from "@/stores/authStore";

export default function OnBoardingPage() {
  const navigate = useNavigate();
  const handleBack = useGoBack();
  const username = useAuthStore((state) => state.username);
  const { mutate: saveOnboarding, isPending } = useSaveOnboarding();
  const { mutate: saveOnboardingChecklist, isPending: isChecklistPending } =
    useSaveOnboardingChecklist();
  const { mutate: saveOnboardingPreference, isPending: isPreferencePending } =
    useSaveOnboardingPreference();

  const handleNext = (values: OnBoardingFormValues) => {
    const body = mapOnboardingFormToRequest(values);

    if (!body) {
      toast.error("온보딩 정보 변환에 실패했어요.");
      return;
    }

    const checklistBody = mapOnboardingChecklistFormToRequest(values);
    const preferenceBody = mapOnboardingPreferenceFormToRequest(values);

    const handleSavePreference = () => {
      if (!preferenceBody) {
        toast.success("온보딩 정보가 저장되었어요");
        navigate("/home");
        return;
      }

      saveOnboardingPreference(preferenceBody, {
        onSuccess: () => {
          toast.success("온보딩 정보가 저장되었어요");
          navigate("/home");
        },
        onError: (error) => {
          if (isAxiosError(error) && error.response?.status === 409) {
            toast.error("이미 룸메이트 우선순위가 저장되었어요");
            navigate("/home");
            return;
          }

          toast.error("룸메이트 우선순위 저장에 실패했어요");
        },
      });
    };

    saveOnboarding(body, {
      onSuccess: () => {
        if (!checklistBody) {
          handleSavePreference();
          return;
        }

        saveOnboardingChecklist(checklistBody, {
          onSuccess: handleSavePreference,
          onError: (error) => {
            if (isAxiosError(error) && error.response?.status === 409) {
              toast.error("이미 생활습관 체크리스트가 저장되었어요");
              navigate("/home");
              return;
            }

            toast.error("생활습관 체크리스트 저장에 실패했어요");
          },
        });
      },
      onError: (error) => {
        if (isAxiosError(error) && error.response?.status === 409) {
          toast.error("이미 온보딩 정보가 저장되었어요");
          navigate("/home");
          return;
        }

        toast.error("온보딩 정보 저장에 실패했어요");
      },
    });
  };

  return (
    <OnBoardingPageContent
      isSubmitting={isPending || isChecklistPending || isPreferencePending}
      userName={username ?? undefined}
      onBack={handleBack}
      onNext={handleNext}
    />
  );
}
