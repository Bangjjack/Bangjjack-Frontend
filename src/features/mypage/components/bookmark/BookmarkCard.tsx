import { BookmarkFillIcon } from "@/assets/icons";
import { BookmarkPostStatusBadge } from "@/features/mypage/components/bookmark/BookmarkPostStatusBadge";
import { cn } from "@/lib/cn";

import type { MyBookmarkPostMock } from "../../mocks";

type BookmarkCardProps = {
  className?: string;
  post: MyBookmarkPostMock;
};

function BookmarkCard({ className, post }: BookmarkCardProps) {
  return (
    <article
      className={cn(
        "flex w-full items-center justify-between gap-300 overflow-hidden border-b border-border-normal bg-bg-secondary p-400 last:border-b-0 cursor-pointer",
        className,
      )}
    >
      <div className="flex min-w-0 items-center">
        <div className="flex min-w-0 flex-col items-start justify-center gap-2.5">
          <h3 className="truncate text-base font-bold leading-normal text-text-normal">
            {post.title}
          </h3>
          <p className="truncate text-xs font-medium leading-normal text-text-disabled">
            {post.weeks}주 · {post.roomType}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-end gap-2.5">
        <BookmarkPostStatusBadge status={post.status} statusLabel={post.statusLabel} />
        <BookmarkFillIcon aria-hidden="true" className="size-6 shrink-0 text-brand-primary cursor-pointer" />
      </div>
    </article>
  );
}

export { BookmarkCard };
export type { BookmarkCardProps };
