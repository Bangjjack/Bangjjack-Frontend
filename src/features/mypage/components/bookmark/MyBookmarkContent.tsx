import { useEffect, useRef } from "react";

import { Surface } from "@/components/ui";
import { BookmarkCard, BookmarkCardSkeleton } from "@/features/mypage/components/bookmark";
import { MyPageEmptyState } from "@/features/mypage/components/MyPageEmptyState";
import { useMyBookmarks } from "@/features/mypage/hooks";
import { cn } from "@/lib/cn";

export interface MyBookmarkContentProps {
  className?: string;
}

const MY_BOOKMARK_EMPTY_MESSAGE = ["아직 북마크한 글이 없어요", "관심 있는 글을 북마크해보세요!"];

const SKELETON_COUNT = 3;

function MyBookmarkContent({ className }: MyBookmarkContentProps) {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useMyBookmarks();
  const posts = data?.pages.flatMap((page) => page.content) ?? [];
  const hasBookmarks = posts.length > 0;
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <Surface
      as="section"
      padding="none"
      variant="outlined"
      className={cn("mt-3.75 overflow-hidden", className)}
    >
      <div className="flex items-center justify-between border-b border-border-normal p-400">
        <h2 className="typo-title3 text-text-normal">내가 북마크한 글</h2>
        <span className="typo-label1 text-text-placeholder">{posts.length}개</span>
      </div>

      {isLoading ? (
        <div className="flex flex-col">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <BookmarkCardSkeleton key={i} />
          ))}
        </div>
      ) : hasBookmarks ? (
        <div className="flex flex-col">
          {posts.map((post) => (
            <BookmarkCard key={post.postId} post={post} />
          ))}
          <div ref={sentinelRef} />
        </div>
      ) : (
        <MyPageEmptyState messages={MY_BOOKMARK_EMPTY_MESSAGE} />
      )}
    </Surface>
  );
}

export { MyBookmarkContent };
