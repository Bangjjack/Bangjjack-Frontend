import { useNavigate } from "react-router";

import { MyChecklistContent } from "@/features/mypage";

export default function MyChecklistPage() {
  const navigate = useNavigate();

  return <MyChecklistContent onBack={() => navigate("/mypage")} />;
}
