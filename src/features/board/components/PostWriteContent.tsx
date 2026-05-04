import { useNavigate } from "react-router";

import { useGoBack } from "@/hooks/useGoBack";
import { PostFormShell } from "@/features/board/components/PostFormShell";
import type { PostWriteFormValues } from "@/features/board/schemas/postWriteSchema";
import { usePostWriteDraftStore } from "@/features/board/stores/postWriteDraftStore";

function PostWriteContent() {
  const navigate = useNavigate();
  const handleBackClick = useGoBack("/board");
  const { draft, setDraft, clearDraft } = usePostWriteDraftStore();

  function handleSubmit(data: PostWriteFormValues) {
    setDraft(data);
    navigate("/board/write/checklist");
  }

  function handleBack() {
    clearDraft();
    handleBackClick();
  }

  return (
    <PostFormShell
      headerTitle="룸메이트 모집하기"
      submitLabel="다음으로"
      defaultValues={draft ?? undefined}
      onSubmit={handleSubmit}
      onBackClick={handleBack}
    />
  );
}

export { PostWriteContent };
