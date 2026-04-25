import { useNavigate } from "react-router";

import { MyPageContent } from "@/features/mypage";

export default function MyPage() {
  const navigate = useNavigate();

  return <MyPageContent onChecklistClick={() => navigate("/mypage/checklist")} />;
}
