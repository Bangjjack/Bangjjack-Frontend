import { cn } from "@/lib/cn";
import { Skeleton } from "@/components/ui";

function RecruitCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-400 rounded-medium bg-bg-secondary px-400 py-450",
        className,
      )}
    >
      <div className="flex flex-col gap-200">
        {/* 제목 + 인원 태그 */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
        {/* 설명 */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      {/* 태그 + 시간 */}
      <div className="flex items-center justify-between">
        <div className="flex gap-[6px]">
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  );
}

export { RecruitCardSkeleton };
