import { useNavigate } from "react-router";

import { HomePageContent } from "@/features/home/components";
import { useAuthStore } from "@/stores/authStore";

export default function HomePage() {
  const navigate = useNavigate();
  const isOnboardingCompleted = useAuthStore((state) => state.isOnboardingCompleted);

  return (
    <>
      <HomePageContent
        isOnboardingCompleted={isOnboardingCompleted}
        onMoreRecruitsClick={() => navigate("/board")}
        onRoommateClick={(id) => navigate(`/roommate/${id}`)}
        onRecruitClick={(id) => navigate(`/board/${id}`)}
        onRecruitCreateClick={() => navigate("/board/write")}
      />
    </>
  );
}
