import { useNavigate } from "react-router";

import { MyProfileEditContent } from "@/features/mypage";

export default function MyProfileEditPage() {
  const navigate = useNavigate();

  const handleEditClick = () => {
    // TODO: 프로필 수정 기능 추후 추가 예정
  };

  return (
    <MyProfileEditContent
      onBack={() => navigate("/mypage")}
      onChecklistClick={() => navigate("/mypage/checklist", { state: { initialEditing: true } })}
      onEditClick={handleEditClick}
    />
  );
}
