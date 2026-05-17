import { useNavigate, useParams } from "react-router";

import { useGoBack } from "@/hooks";
import type { PostWriteFormValues } from "@/features/board/schemas";

import { PostFormShell } from "./PostFormShell";

function PostEditContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleBackClick = useGoBack(id ? `/board/${id}` : "/board");

  if (!id) return null;

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
