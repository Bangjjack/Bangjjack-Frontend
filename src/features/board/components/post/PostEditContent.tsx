import { useNavigate, useParams } from "react-router";

import { Button } from "@/components/ui";
import { useGoBack } from "@/hooks";
import type { PostWriteFormValues } from "@/features/board/schemas";
import { usePostDetail } from "@/features/board/hooks";
import { mapPostDetailToFormValues } from "@/features/board/utils";
import { usePostWriteDraftStore } from "@/features/board/stores/postWriteDraftStore";

import { PostFormShell } from "./PostFormShell";

function PostEditContent() {
  const { id } = useParams();
  const postId = Number(id);
  const navigate = useNavigate();
  const handleBackClick = useGoBack(id ? `/board/${id}` : "/board");

  const { data: post, isLoading, isError } = usePostDetail(postId);
  const { setDraft } = usePostWriteDraftStore();

  if (!id || isNaN(postId)) return null;

  if (isLoading) {
    return (
      <div className="flex h-dvh items-center justify-center bg-bg-primary">
        <span className="typo-body2 text-text-caption">로딩 중...</span>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="flex h-dvh flex-col items-center justify-center gap-400 bg-bg-primary">
        <span className="typo-body2 text-text-caption">게시글을 불러올 수 없어요.</span>
        <Button variant="ghost" onClick={() => navigate(`/board/${id}`)}>
          돌아가기
        </Button>
      </div>
    );
  }

  const defaultValues = mapPostDetailToFormValues(post);

  function handleSubmit(data: PostWriteFormValues) {
    setDraft(data, postId);
    navigate("/board/write/checklist");
  }

  return (
    <PostFormShell
      headerTitle="게시글 수정하기"
      submitLabel="다음으로"
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      onBackClick={handleBackClick}
    />
  );
}

export { PostEditContent };
