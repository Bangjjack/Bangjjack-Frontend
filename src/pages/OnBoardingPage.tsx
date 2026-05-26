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
  const setRegistrationStatus = useAuthStore((state) => state.setRegistrationStatus);

  const handleSaved = (registrationStatus: Parameters<typeof setRegistrationStatus>[0]) => {
    setRegistrationStatus(registrationStatus);
    toast.success("온보딩 정보가 저장되었어요.");
    navigate("/home");
  };

  const { submit, isPending } = useOnboardingSubmit({
    onAlreadySaved: (message, registrationStatus) => {
      setRegistrationStatus(registrationStatus);
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
