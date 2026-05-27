import { useNavigate } from "react-router";

import { HomePageContent } from "@/features/home/components";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <HomePageContent
        onChecklistClick={() => navigate("/mypage/profile")}
        onMoreRecruitsClick={() => navigate("/board")}
        onRoommateClick={(id) => navigate(`/roommate/${id}`)}
        onRecruitClick={(id) => navigate(`/board/${id}`)}
        onRecruitCreateClick={() => navigate("/board/write")}
      />
    </>
  );
}
