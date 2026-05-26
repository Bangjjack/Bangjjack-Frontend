import { useState } from "react";
import { useParams } from "react-router";

import { Header } from "@/components/ui";
import { useFadeInOnScroll, useGoBack } from "@/hooks";

import { DORMITORY_LABEL, ROOM_SIZE_LABEL, ROOM_SIZE_MAX, SEMESTER_LABEL } from "@/constants";
import { usePostDetail } from "@/features/board/hooks";
import { mapSharedLifestyleToHabits } from "@/features/board/utils";

import {
  PostActionMenu,
  PostDetailBottomBar,
  PostDetailDescriptionCard,
  PostDetailInfoCard,
  PostDetailRoommatesCard,
  PostDetailTagsCard,
} from "@/features/board/components/post";

function PostDetailContent() {
  const { id } = useParams();
  const postId = Number(id);
  const handleBackClick = useGoBack("/board");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fadeInRef = useFadeInOnScroll<HTMLDivElement>();

  const { data: post, isLoading, isError } = usePostDetail(postId);

  if (!id || isNaN(postId)) {
    return (
      <div className="flex h-dvh items-center justify-center bg-bg-primary">
        <span className="typo-body2 text-text-caption">잘못된 접근입니다.</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-dvh items-center justify-center bg-bg-primary">
        <span className="typo-body2 text-text-caption">로딩 중...</span>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="flex h-dvh items-center justify-center bg-bg-primary">
        <span className="typo-body2 text-text-caption">게시글을 불러올 수 없습니다.</span>
      </div>
    );
  }

  const maxMembers = ROOM_SIZE_MAX[post.roomSize] ?? 0;
  const currentMembers = maxMembers - post.recruitMemberCount;
  const isClosed = currentMembers === maxMembers;
  const habits = mapSharedLifestyleToHabits(post.sharedLifestyle);
  const recruitTags = [
    SEMESTER_LABEL[post.semester] ?? post.semester,
    DORMITORY_LABEL[post.dormitory] ?? post.dormitory,
    ROOM_SIZE_LABEL[post.roomSize] ?? post.roomSize,
  ];

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-bg-primary">
      <Header
        showBack
        showMore={post.isOwner}
        title="방 찾기"
        onBackClick={handleBackClick}
        onMoreClick={() => setIsMenuOpen((prev) => !prev)}
      />

      <PostActionMenu postId={id} isOpen={isMenuOpen} onToggle={() => setIsMenuOpen(false)} />

      <main className="scrollbar-none min-h-0 flex-1 overflow-y-auto pb-[100px] pt-400">
        <div ref={fadeInRef} className="flex flex-col gap-300 px-400">
          <PostDetailInfoCard
            title={post.title}
            isClosed={isClosed}
            currentMembers={currentMembers}
            maxMembers={maxMembers}
            author={post.author}
            createdAt={post.createdAt}
          />
          <PostDetailDescriptionCard description={post.description} recruitTags={recruitTags} />
          <PostDetailTagsCard habits={habits} roommatePreference={post.roommatePreference} />
          <PostDetailRoommatesCard postId={postId} members={post.members} />
        </div>
      </main>

      <PostDetailBottomBar
        postId={postId}
        recruitTags={recruitTags}
        recruitTitle={post.title}
        isOwner={post.isOwner}
        targetUserId={post.author.authorId}
        targetUsername={post.author.username}
      />
    </div>
  );
}

export { PostDetailContent };
