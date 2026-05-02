import { cn } from "@/lib/cn";

import type { MyBookmarkPostMock } from "../../mocks";

interface BookmarkPostStatusBadgeProps {
  status: MyBookmarkPostMock["status"];
  statusLabel: string;
}

function BookmarkPostStatusBadge({ status, statusLabel }: BookmarkPostStatusBadgeProps) {
  const isClosed = status === "closed";

  return (
    <span
      className={cn(
        "typo-label1 rounded-full px-2.5 py-0.5",
        isClosed ? "bg-button-disabled text-text-caption" : "bg-text-strong text-text-on-primary",
      )}
    >
      {statusLabel}
    </span>
  );
}

export { BookmarkPostStatusBadge };
export type { BookmarkPostStatusBadgeProps };
