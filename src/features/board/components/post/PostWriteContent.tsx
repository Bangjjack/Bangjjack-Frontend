import { useNavigate } from "react-router";

import { toast } from "@/components/ui";
import { useGoBack } from "@/hooks";
import type { PostWriteFormValues } from "@/features/board/schemas";
import { useCreatePost } from "@/features/board/hooks";
import { mapFormToCreatePostRequest } from "@/features/board/utils";
// import { usePostWriteDraftStore } from "@/features/board/stores/postWriteDraftStore";

import { PostFormShell } from "./PostFormShell";

function PostWriteContent() {
  const navigate = useNavigate();
  const handleBackClick = useGoBack("/board");
  const { mutate: createPost, isPending } = useCreatePost();
  // const { draft, setDraft, clearDraft } = usePostWriteDraftStore();

  function handleSubmit(data: PostWriteFormValues) {
    const body = mapFormToCreatePostRequest(data);
    createPost(body, {
      onSuccess: (data) => {
        toast.success("게시글이 등록되었어요");
        navigate(data.postId ? `/board/${data.postId}` : "/board");
      },
      onError: () => {
        toast.error("게시글 등록에 실패했어요");
      },
    });
    // 체크리스트 확인 화면 (추후 복원)
    // setDraft(data);
    // navigate("/board/write/checklist");
  }

  return (
    <PostFormShell
      headerTitle="룸메이트 모집하기"
      submitLabel="등록하기"
      // defaultValues={draft ?? undefined}
      onSubmit={handleSubmit}
      onBackClick={handleBackClick}
      isPending={isPending}
    />
  );
}

export { PostWriteContent };
