import { StatusBadge } from "@/features/mypage/components/StatusBadge";
import type { MyBookmarkPostMock } from "@/features/mypage/types";

interface BookmarkPostStatusBadgeProps {
  status: MyBookmarkPostMock["status"];
  statusLabel: string;
}

function BookmarkPostStatusBadge({ status, statusLabel }: BookmarkPostStatusBadgeProps) {
  const isClosed = status === "closed";

  return <StatusBadge variant={isClosed ? "closed" : "active"}>{statusLabel}</StatusBadge>;
}

export { BookmarkPostStatusBadge };
export type { BookmarkPostStatusBadgeProps };
