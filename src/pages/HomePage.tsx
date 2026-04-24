import { HomePageContent } from "@/features/home/components";
import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <HomePageContent onRoommateClick={(id) => navigate(`/roommate/${id}`)} />
    </>
  );
}
