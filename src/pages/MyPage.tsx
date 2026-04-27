import { useNavigate } from "react-router";

import { MyPageContent } from "@/features/mypage";

export default function MyPage() {
  const navigate = useNavigate();

  return (
    <MyPageContent
      onActivityClick={() => navigate("/mypage/activity")}
      onChecklistClick={() => navigate("/mypage/checklist")}
      onProfileClick={() => navigate("/mypage/profile")}
    />
  );
}
