import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import { Header } from "@/components/ui";
import {
  DORMITORY_LABEL,
  MEMBER_ROLE,
  ROOM_SIZE_LABEL,
  ROOM_SIZE_MAX,
  SEMESTER_LABEL,
} from "@/constants";
import {
  PostActionMenu,
  PostDetailBottomBar,
  PostDetailDescriptionCard,
  PostDetailInfoCard,
  PostDetailRoommatesCard,
  PostDetailSkeleton,
  PostDetailTagsCard,
} from "@/features/board/components/post";
import { usePostDetail } from "@/features/board/hooks";
import { computeChecklistMatchStats, mapSharedLifestyleToHabits } from "@/features/board/utils";
import { useFadeInOnScroll } from "@/hooks";

function PostDetailContent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const postId = Number(id);
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
    return <PostDetailSkeleton />;
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

  const leader = post.members.find((member) => member.role === MEMBER_ROLE.LEADER);
  const { matchHighlights, matchRate } = leader
    ? computeChecklistMatchStats(leader.lifestyleChecklist)
    : { matchHighlights: [], matchRate: 0 };

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
        onBackClick={() => navigate("/board")}
        onMoreClick={() => setIsMenuOpen((prev) => !prev)}
      />

      <PostActionMenu isOpen={isMenuOpen} postId={id} onToggle={() => setIsMenuOpen(false)} />

      <main className="scrollbar-none min-h-0 flex-1 overflow-y-auto pb-[100px] pt-400">
        <div ref={fadeInRef} className="flex flex-col gap-300 px-400">
          <PostDetailInfoCard
            author={post.author}
            createdAt={post.createdAt}
            currentMembers={currentMembers}
            isClosed={isClosed}
            maxMembers={maxMembers}
            onAuthorClick={() => navigate(`/roommate/${post.author.authorId}`)}
            title={post.title}
          />
          <PostDetailDescriptionCard description={post.description} recruitTags={recruitTags} />
          <PostDetailTagsCard habits={habits} roommatePreference={post.roommatePreference} />
          <PostDetailRoommatesCard members={post.members} postId={postId} />
        </div>
      </main>

      <PostDetailBottomBar
        isOwner={post.isOwner}
        matchHighlights={matchHighlights}
        matchRate={matchRate}
        postId={postId}
        targetProfileImage={post.author.profileImage}
        targetUserId={post.author.authorId}
        targetUsername={post.author.username}
      />
    </div>
  );
}

export { PostDetailContent };
