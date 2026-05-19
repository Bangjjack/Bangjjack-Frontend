import { useNavigate, useParams } from "react-router";

import { Button, toast } from "@/components/ui";
import { useGoBack } from "@/hooks";
import type { PostWriteFormValues } from "@/features/board/schemas";
import { usePostDetail, useUpdatePost } from "@/features/board/hooks";
import { mapFormToCreatePostRequest, mapPostDetailToFormValues } from "@/features/board/utils";

import { PostFormShell } from "./PostFormShell";

function PostEditContent() {
  const { id } = useParams();
  const postId = Number(id);
  const navigate = useNavigate();
  const handleBackClick = useGoBack(id ? `/board/${id}` : "/board");

  const { data: post, isLoading, isError } = usePostDetail(postId);
  const { mutate: update, isPending } = useUpdatePost(postId);

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
    const body = mapFormToCreatePostRequest(data);
    update(body, {
      onSuccess: () => {
        toast.success("게시글이 수정되었어요");
        navigate(`/board/${id}`);
      },
      onError: () => {
        toast.error("게시글 수정에 실패했어요");
      },
    });
  }

  return (
    <PostFormShell
      headerTitle="게시글 수정하기"
      submitLabel="수정하기"
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      onBackClick={handleBackClick}
      isPending={isPending}
    />
  );
}

export { PostEditContent };
