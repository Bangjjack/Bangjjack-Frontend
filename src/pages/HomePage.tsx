import { HomePageContent } from "@/features/home/components";
import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <HomePageContent
        onMoreRecruitsClick={() => navigate("/board")}
        onRoommateClick={(id) => navigate(`/roommate/${id}`)}
        onRecruitClick={(id) => navigate(`/board/${id}`)}
        onRecruitCreateClick={() => navigate("/board/write")}
      />
    </>
  );
}
