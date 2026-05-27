import { cn } from "@/lib/cn";

interface BookmarkCardSkeletonProps {
  className?: string;
}

function BookmarkCardSkeleton({ className }: BookmarkCardSkeletonProps) {
  return (
    <div
      className={cn(
        "flex w-full animate-pulse items-center justify-between gap-300 border-b border-border-normal bg-bg-secondary p-400 last:border-b-0",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-[8px]">
        <div className="h-[19px] w-40 rounded bg-bg-skeleton" />
        <div className="h-[16px] w-24 rounded bg-bg-skeleton" />
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        <div className="h-[26px] w-12 rounded-full bg-bg-skeleton" />
        <div className="size-6 rounded bg-bg-skeleton" />
      </div>
    </div>
  );
}

export { BookmarkCardSkeleton };
export type { BookmarkCardSkeletonProps };
