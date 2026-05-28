import { Skeleton } from "@/components/ui";

function RoommateProfileCardSkeleton() {
  return (
    <div className="flex w-[200px] shrink-0 flex-col items-start rounded-small bg-bg-secondary px-[14px] py-450">
      {/* 매칭률 */}
      <Skeleton className="h-6 w-20" />
      <Skeleton className="mt-1 h-6 w-24" />
      {/* 프로필 이미지 */}
      <div className="flex w-full items-center justify-center py-200">
        <Skeleton className="size-[70px] rounded-full" />
      </div>
      {/* 닉네임 */}
      <Skeleton className="h-5 w-24" />
      {/* 나이 · 학과 */}
      <div className="mt-[6px] flex items-center gap-[6px]">
        <Skeleton className="h-4 w-8" />
        <Skeleton className="h-4 w-16" />
      </div>
      {/* 태그 */}
      <div className="mt-[6px] flex flex-wrap gap-[6px]">
        <Skeleton className="h-5 w-12 rounded-full" />
        <Skeleton className="h-5 w-12 rounded-full" />
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>
    </div>
  );
}

export { RoommateProfileCardSkeleton };
