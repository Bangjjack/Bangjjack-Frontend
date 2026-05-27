import { StatusBadge } from "@/features/mypage/components/StatusBadge";
import type { PostStatus } from "@/types";

const STATUS_LABEL: Record<PostStatus, string> = {
  OPEN: "모집중",
  CLOSED: "마감",
};

interface BookmarkPostStatusBadgeProps {
  status: PostStatus;
}

function BookmarkPostStatusBadge({ status }: BookmarkPostStatusBadgeProps) {
  const isClosed = status === "CLOSED";

  return <StatusBadge variant={isClosed ? "closed" : "active"}>{STATUS_LABEL[status]}</StatusBadge>;
}

export { BookmarkPostStatusBadge };
export type { BookmarkPostStatusBadgeProps };
