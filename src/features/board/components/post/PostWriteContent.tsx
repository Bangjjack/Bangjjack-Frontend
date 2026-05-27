import { useNavigate } from "react-router";

import { useGoBack } from "@/hooks";
import type { PostWriteFormValues } from "@/features/board/schemas";
import { usePostWriteDraftStore } from "@/features/board/stores/postWriteDraftStore";

import { PostFormShell } from "./PostFormShell";

function PostWriteContent() {
  const navigate = useNavigate();
  const handleBackClick = useGoBack("/board");
  const { draft, setDraft } = usePostWriteDraftStore();

  function handleSubmit(data: PostWriteFormValues) {
    setDraft(data, null);
    navigate("/board/write/checklist");
  }

  return (
    <PostFormShell
      headerTitle="룸메이트 모집하기"
      submitLabel="다음"
      defaultValues={draft ?? undefined}
      onSubmit={handleSubmit}
      onBackClick={handleBackClick}
    />
  );
}

export { PostWriteContent };
