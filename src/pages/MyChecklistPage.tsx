import { useLocation, useNavigate } from "react-router";

import { MyChecklistContent } from "@/features/mypage";

export default function MyChecklistPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialEditing =
    typeof location.state === "object" &&
    location.state !== null &&
    "initialEditing" in location.state &&
    location.state.initialEditing === true;

  return <MyChecklistContent initialEditing={initialEditing} onBack={() => navigate("/mypage")} />;
}
