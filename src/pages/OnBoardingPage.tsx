import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { toast } from "@/components/ui";
import { authQueryKeys, type AuthRegistrationStatus } from "@/features/auth";
import { OnBoardingPageContent } from "@/features/onboarding/components";
import { useOnboardingSubmit } from "@/features/onboarding/hooks";
import { useGoBack } from "@/hooks/useGoBack";
import { parseDisplayName } from "@/lib/parseDisplayName";
import { useAuthStore } from "@/stores/authStore";

export default function OnBoardingPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const goBack = useGoBack();
  const username = useAuthStore((state) => state.username);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const setOnboardingCompleted = useAuthStore((state) => state.setOnboardingCompleted);

  const handleBack = () => {
    clearAuth();
    goBack();
  };

  const updateRegistrationStatusCache = (registrationStatus: {
    isChecklistRegistered?: boolean;
    isOnboarded: boolean;
    isRoommatePreferenceRegistered?: boolean;
  }) => {
    queryClient.setQueryData<AuthRegistrationStatus>(
      authQueryKeys.registrationStatus(),
      (previous) => ({
        isChecklistRegistered:
          registrationStatus.isChecklistRegistered ?? previous?.isChecklistRegistered ?? false,
        isOnboarded: registrationStatus.isOnboarded,
        isRoommatePreferenceRegistered:
          registrationStatus.isRoommatePreferenceRegistered ??
          previous?.isRoommatePreferenceRegistered ??
          false,
      }),
    );
    queryClient.invalidateQueries({ queryKey: authQueryKeys.registrationStatus() });
  };

  const handleSaved = (registrationStatus: Parameters<typeof updateRegistrationStatusCache>[0]) => {
    setOnboardingCompleted(registrationStatus.isOnboarded);
    updateRegistrationStatusCache(registrationStatus);
    toast.success("온보딩 정보가 저장되었어요.");
    navigate("/home");
  };

  const { submit, isPending } = useOnboardingSubmit({
    onAlreadySaved: (messages, registrationStatus) => {
      setOnboardingCompleted(registrationStatus.isOnboarded);
      updateRegistrationStatusCache(registrationStatus);
      messages.forEach((message) => {
        toast.error(message);
      });
      navigate("/home");
    },
    onError: toast.error,
    onSuccess: handleSaved,
  });

  return (
    <OnBoardingPageContent
      isSubmitting={isPending}
      userName={username ? parseDisplayName(username) : undefined}
      onBack={handleBack}
      onNext={submit}
    />
  );
}
