import { useState } from "react";
import { useNavigate } from "react-router";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogIcon,
  AlertDialogTitle,
  Surface,
  Tag,
  toast,
} from "@/components/ui";
import { ActivityButton } from "@/features/mypage/components/activity/ActivityButton";
import { ActivityTag } from "@/features/mypage/components/activity/ActivityTag";
import { useDeleteMyPost, useMyRecruitPosts } from "@/features/mypage/hooks";

import type { MyPost } from "@/features/mypage/types";
import type { Dormitory, RoomSize } from "@/types";

const DORMITORY_LABEL: Record<Dormitory, string> = {
  DORM_1: "1기숙사",
  DORM_2: "2기숙사",
  DORM_3: "3기숙사",
};

const ROOM_SIZE_LABEL: Record<RoomSize, string> = {
  TWO_PERSON: "2인 1실",
  THREE_PERSON: "3인 1실",
  FOUR_PERSON: "4인 1실",
};

function MyRecruitPostList() {
  const { data: posts, isError } = useMyRecruitPosts();

  if (isError || !posts || posts.length === 0) {
    return <MyRecruitPostEmptyState />;
  }

  return (
    <div className="flex flex-col gap-400">
      {posts.map((post) => (
        <MyRecruitPostCard key={post.postId} post={post} />
      ))}
    </div>
  );
}

function MyRecruitPostCard({ post }: { post: MyPost }) {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { mutate: deletePost, isPending } = useDeleteMyPost();

  const statusLabel = post.isClosed
    ? "마감"
    : `${post.currentMemberCount}/${post.totalMemberCount}`;

  function handleDeleteConfirm() {
    deletePost(post.postId, {
      onSuccess: () => toast.success("모집글이 삭제되었어요"),
      onError: () => toast.error("모집글 삭제에 실패했어요"),
    });
  }

  return (
    <>
      <Surface as="article" variant="outlined" className="flex flex-col gap-2.5">
        <div className="flex items-start justify-between gap-300">
          <h2 className="typo-title3 min-w-0 flex-1 text-text-strong">{post.title}</h2>
          <Tag color={post.isClosed ? "disabled" : "black"}>{statusLabel}</Tag>
        </div>

        <p className="typo-caption2 whitespace-pre-line text-text-caption">{post.description}</p>

        <div className="flex gap-2.5">
          <ActivityTag>{DORMITORY_LABEL[post.dormitory]}</ActivityTag>
          <ActivityTag>{ROOM_SIZE_LABEL[post.roomSize]}</ActivityTag>
        </div>

        <div className="flex h-12.5 w-full items-center justify-center gap-200 rounded-medium bg-bg-primary">
          <span className="typo-caption1 text-text-placeholder">현재 인원</span>
          <span className="typo-title2 text-text-strong">
            {post.isClosed ? "-" : `${post.currentMemberCount}인`}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-200">
          <ActivityButton
            label="상세보기"
            tone="neutral"
            onClick={() => navigate(`/board/${post.postId}`)}
          />
          <ActivityButton
            label="삭제하기"
            tone={post.isClosed ? "dark" : "primary"}
            onClick={() => setIsDeleteDialogOpen(true)}
          />
        </div>
      </Surface>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogIcon />
            <AlertDialogTitle icon>정말 삭제하시겠어요?</AlertDialogTitle>
            <AlertDialogDescription>삭제한 모집글은 다시 복구할 수 없어요.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} disabled={isPending}>
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function MyRecruitPostEmptyState() {
  return (
    <div className="flex size-full flex-col items-center justify-center rounded-2xl p-400">
      <p className="typo-caption1 text-center text-text-disabled">아직 작성된 글이 없어요</p>
      <p className="typo-caption1 text-center text-text-disabled">먼저 내 룸메이트를 모집해봐요!</p>
    </div>
  );
}

export { MyRecruitPostList };
