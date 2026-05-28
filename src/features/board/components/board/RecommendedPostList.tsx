import { RecruitCard, RecruitCardSkeleton } from "@/components";
import { Button } from "@/components/ui";
import { DORMITORY_LABEL, ROOM_SIZE_LABEL } from "@/constants";
import type { RecommendedPostListProps } from "@/features/board/types";
import { formatRelativeTime } from "@/features/board/utils";
import { useFadeInOnScroll } from "@/hooks";

function RecommendedPostList({
  posts,
  isLoading,
  isError,
  onRetry,
  onPostClick,
}: RecommendedPostListProps) {
  const fadeInRef = useFadeInOnScroll<HTMLDivElement>();

  if (isError) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <p className="typo-body2 text-text-caption">추천 게시글을 불러오지 못했어요</p>
        <Button variant="ghost" size="sm" onClick={onRetry}>
          다시 시도하기
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-[10px]">
        {Array.from({ length: 5 }).map((_, i) => (
          <RecruitCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="typo-body2 text-text-caption">해당하는 추천 게시글이 없어요</p>
      </div>
    );
  }

  return (
    <div ref={fadeInRef} className="flex flex-col gap-[10px]">
      {posts.map((post) => (
        <RecruitCard
          key={post.postId}
          title={post.title}
          description={post.description}
          currentMembers={post.currentMemberCount}
          maxMembers={post.totalMemberCount}
          dormitory={DORMITORY_LABEL[post.dormitory] ?? post.dormitory}
          roomType={ROOM_SIZE_LABEL[post.roomSize] ?? post.roomSize}
          timeAgo={formatRelativeTime(post.createdAt)}
          onClick={() => onPostClick?.(post.postId)}
        />
      ))}
    </div>
  );
}

export { RecommendedPostList };
