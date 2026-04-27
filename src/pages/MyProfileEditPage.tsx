import { useNavigate } from "react-router";

import { MyProfileEditContent } from "@/features/mypage";

export default function MyProfileEditPage() {
  const navigate = useNavigate();

  return <MyProfileEditContent onBack={() => navigate("/mypage")} />;
}
