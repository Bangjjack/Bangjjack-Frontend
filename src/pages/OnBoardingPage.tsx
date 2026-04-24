import { useNavigate } from "react-router";
import { OnBoardingPageContent } from "@/features/onboarding/components";
import { useGoBack } from "@/hooks/useGoBack";

export default function OnBoardingPage() {
  const navigate = useNavigate();
  const handleBack = useGoBack();

  return <OnBoardingPageContent onBack={handleBack} onNext={() => navigate("/home")} />;
}
