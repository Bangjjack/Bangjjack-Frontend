import { useNavigate } from "react-router";
import { OnBoardingPageContent } from "@/features/onboarding/components";

export default function OnBoardingPage() {
  const navigate = useNavigate();
  const handleBack = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
      return;
    }

    navigate("/home");
  };

  return <OnBoardingPageContent onBack={handleBack} onNext={() => navigate("/home")} />;
}
