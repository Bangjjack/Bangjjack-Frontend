import { useNavigate } from "react-router";

import { BookmarkFilledIcon } from "@/assets/icons";
import { Tag } from "@/components/ui";
import { DORMITORY_LABEL, ROOM_SIZE_LABEL } from "@/constants";
import { STATUS_LABEL, STATUS_TAG_COLOR } from "@/features/mypage/components/bookmark";
import type { BookmarkedPost } from "@/features/mypage/types";
import { useRemoveBookmark } from "@/features/board/hooks";
import { cn } from "@/lib/cn";

interface BookmarkCardProps {
  className?: string;
  post: BookmarkedPost;
}

function BookmarkCard({ className, post }: BookmarkCardProps) {
  const navigate = useNavigate();
  const { mutate: removeBookmark } = useRemoveBookmark();

  return (
    <article
      className={cn(
        "flex w-full items-center justify-between gap-300 overflow-hidden border-b border-border-normal bg-bg-secondary p-400 last:border-b-0 cursor-pointer",
        className,
      )}
      onClick={() => navigate(`/board/${post.postId}`)}
    >
      <div className="flex min-w-0 items-center">
        <div className="flex min-w-0 flex-col items-start justify-center gap-[8px]">
          <h3 className="truncate text-base font-bold leading-normal text-text-normal">
            {post.title}
          </h3>
          <p className="truncate text-xs font-medium leading-normal text-text-disabled">
            {DORMITORY_LABEL[post.dormitory]} · {ROOM_SIZE_LABEL[post.roomSize]}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-end gap-2.5">
        <Tag color={STATUS_TAG_COLOR[post.status]}>{STATUS_LABEL[post.status]}</Tag>
        <button
          aria-label="북마크 해제"
          className="flex size-6 shrink-0 cursor-pointer items-center justify-center text-brand-primary"
          onClick={(e) => {
            e.stopPropagation();
            removeBookmark(post.postId);
          }}
          type="button"
        >
          <BookmarkFilledIcon aria-hidden="true" className="size-6" />
        </button>
      </div>
    </article>
  );
}

export { BookmarkCard };
export type { BookmarkCardProps };
