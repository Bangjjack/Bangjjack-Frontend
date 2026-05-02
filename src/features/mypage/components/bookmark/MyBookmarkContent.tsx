import { BookmarkCard } from "@/features/mypage/components/bookmark/BookmarkCard";
import { cn } from "@/lib/cn";

import { MY_BOOKMARK_POSTS } from "../../mocks";

export interface MyBookmarkContentProps {
  className?: string;
}

function MyBookmarkContent({ className }: MyBookmarkContentProps) {
  return (
    <section
      className={cn(
        "mt-3.75 overflow-hidden rounded-[20px] border border-border-normal bg-bg-secondary",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border-normal p-400">
        <h2 className="typo-title3 text-text-normal">내가 북마크한 글</h2>
        <span className="typo-label1 text-text-placeholder">{MY_BOOKMARK_POSTS.length}개</span>
      </div>

      <div className="flex flex-col">
        {MY_BOOKMARK_POSTS.map((post) => (
          <BookmarkCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

export { MyBookmarkContent };
