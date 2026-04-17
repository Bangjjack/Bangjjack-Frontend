import { useNavigate } from "react-router";
import { OnBoardingPageContent } from "@/features/onboarding/components";

export default function OnBoardingPage() {
  const navigate = useNavigate();

  return <OnBoardingPageContent onBack={() => navigate(-1)} onNext={() => navigate("/home")} />;
}
