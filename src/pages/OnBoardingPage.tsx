import { useNavigate } from "react-router";

import { toast } from "@/components/ui";
import { OnBoardingPageContent } from "@/features/onboarding/components";
import { useOnboardingSubmit } from "@/features/onboarding/hooks";
import { useGoBack } from "@/hooks/useGoBack";
import { useAuthStore } from "@/stores/authStore";

export default function OnBoardingPage() {
  const navigate = useNavigate();
  const handleBack = useGoBack();
  const username = useAuthStore((state) => state.username);
  const setOnboardingCompleted = useAuthStore((state) => state.setOnboardingCompleted);

  const handleSaved = () => {
    setOnboardingCompleted(true);
    toast.success("온보딩 정보가 저장되었어요.");
    navigate("/home");
  };

  const { submit, isPending } = useOnboardingSubmit({
    onAlreadySaved: (message) => {
      setOnboardingCompleted(true);
      toast.error(message);
      navigate("/home");
    },
    onError: toast.error,
    onSuccess: handleSaved,
  });

  return (
    <OnBoardingPageContent
      isSubmitting={isPending}
      userName={username ?? undefined}
      onBack={handleBack}
      onNext={submit}
    />
  );
}
