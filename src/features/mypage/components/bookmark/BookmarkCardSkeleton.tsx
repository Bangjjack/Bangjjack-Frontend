import { cn } from "@/lib/cn";
import { Skeleton } from "@/components/ui";

interface BookmarkCardSkeletonProps {
  className?: string;
}

function BookmarkCardSkeleton({ className }: BookmarkCardSkeletonProps) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between gap-300 border-b border-border-normal bg-bg-secondary p-400 last:border-b-0",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-[8px]">
        <Skeleton className="h-[19px] w-40" />
        <Skeleton className="h-[16px] w-24" />
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        <Skeleton className="h-[26px] w-12 rounded-full" />
        <Skeleton className="size-6" />
      </div>
    </div>
  );
}

export { BookmarkCardSkeleton };
export type { BookmarkCardSkeletonProps };
