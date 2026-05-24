import { useNavigate } from "react-router";
import { isAxiosError } from "axios";

import { toast } from "@/components/ui";
import { OnBoardingPageContent } from "@/features/onboarding/components";
import { useSaveOnboarding } from "@/features/onboarding/hooks";
import type { OnBoardingFormValues } from "@/features/onboarding/types";
import { mapOnboardingFormToRequest } from "@/features/onboarding/utils";
import { useGoBack } from "@/hooks/useGoBack";
import { useAuthStore } from "@/stores/authStore";

export default function OnBoardingPage() {
  const navigate = useNavigate();
  const handleBack = useGoBack();
  const username = useAuthStore((state) => state.username);
  const { mutate: saveOnboarding, isPending } = useSaveOnboarding();

  const handleNext = (values: OnBoardingFormValues) => {
    const body = mapOnboardingFormToRequest(values);

    saveOnboarding(body, {
      onSuccess: () => {
        toast.success("온보딩 정보가 저장되었어요");
        navigate("/home");
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
      isSubmitting={isPending}
      userName={username ?? undefined}
      onBack={handleBack}
      onNext={handleNext}
    />
  );
}
