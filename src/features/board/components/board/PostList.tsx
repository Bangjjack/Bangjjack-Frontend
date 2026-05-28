import { RecruitCard, RecruitCardSkeleton } from "@/components";
import { DORMITORY_LABEL, ROOM_SIZE_LABEL, ROOM_SIZE_MAX } from "@/constants";
import type { PostListProps } from "@/features/board/types";
import { formatRelativeTime } from "@/features/board/utils";
import { useFadeInOnScroll, useInfiniteScroll } from "@/hooks";

function PostList({
  posts,
  isFetching,
  isError,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  onPostClick,
}: PostListProps) {
  const fadeInRef = useFadeInOnScroll<HTMLDivElement>();
  const sentinelRef = useInfiniteScroll(fetchNextPage, { hasNextPage, isFetchingNextPage });

  if (isError) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="typo-body2 text-text-caption">게시글을 불러오지 못했어요</p>
      </div>
    );
  }

  if (isFetching && posts.length === 0) {
    return (
      <div className="flex flex-col gap-[10px]">
        {Array.from({ length: 5 }).map((_, i) => (
          <RecruitCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!isFetching && posts.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="typo-body2 text-text-caption">해당하는 게시글이 없어요</p>
      </div>
    );
  }

  return (
    <div ref={fadeInRef} className="flex flex-col gap-[10px]">
      {posts.map((post) => {
        const maxMembers = ROOM_SIZE_MAX[post.roomSize] ?? 0;
        const currentMembers = maxMembers - post.recruitMemberCount;

        return (
          <RecruitCard
            key={post.postId}
            title={post.title}
            description={post.description}
            currentMembers={currentMembers}
            maxMembers={maxMembers}
            dormitory={DORMITORY_LABEL[post.dormitory] ?? post.dormitory}
            roomType={ROOM_SIZE_LABEL[post.roomSize] ?? post.roomSize}
            timeAgo={formatRelativeTime(post.createdAt)}
            onClick={() => onPostClick?.(post.postId)}
          />
        );
      })}

      {/* 무한 스크롤 감지 */}
      <div ref={sentinelRef} />
    </div>
  );
}

export { PostList };
