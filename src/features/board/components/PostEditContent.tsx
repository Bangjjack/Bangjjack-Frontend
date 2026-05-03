import { useNavigate, useParams } from "react-router";

import { useGoBack } from "@/hooks/useGoBack";
import type { PostWriteFormValues } from "@/features/board/schemas/postWriteSchema";
import { PostFormShell } from "./PostFormShell";

function PostEditContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleBackClick = useGoBack(`/board/${id}`);

  // TODO: API에서 기존 게시글 데이터 fetch
  // const { data: existingPost } = useQuery(...)

  function handleSubmit(data: PostWriteFormValues) {
    void data; // TODO: 수정 API 연동
    navigate(`/board/${id}`);
  }

  return (
    <PostFormShell
      headerTitle="게시글 수정하기"
      submitLabel="수정하기"
      onSubmit={handleSubmit}
      onBackClick={handleBackClick}
    />
  );
}

export { PostEditContent };
