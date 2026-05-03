import { useNavigate } from "react-router";

import { useGoBack } from "@/hooks/useGoBack";
import type { PostWriteFormValues } from "@/features/board/schemas/postWriteSchema";
import { PostFormShell } from "./PostFormShell";

function PostWriteContent() {
  const navigate = useNavigate();
  const handleBackClick = useGoBack("/board");

  function handleSubmit(data: PostWriteFormValues) {
    void data; // TODO: 생성 API 연동
    navigate("/board");
  }

  return (
    <PostFormShell
      headerTitle="룸메이트 모집하기"
      submitLabel="다음으로"
      onSubmit={handleSubmit}
      onBackClick={handleBackClick}
    />
  );
}

export { PostWriteContent };
