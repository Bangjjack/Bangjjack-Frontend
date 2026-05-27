import { useNavigate } from "react-router";
import { Header, Separator, Skeleton } from "@/components/ui";

function PostDetailSkeleton() {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-bg-primary">
      <Header showBack title="방 찾기" onBackClick={() => navigate("/board")} />

      <main className="scrollbar-none min-h-0 flex-1 overflow-y-auto pb-[100px] pt-400">
        <div className="flex flex-col gap-300 px-400">
          {/* PostDetailInfoCard */}
          <div className="flex flex-col gap-300 rounded-medium bg-bg-secondary px-450 py-600">
            <div className="flex items-center justify-between">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
            <div className="flex items-center gap-200">
              <Skeleton className="size-6 rounded-full" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="ml-auto h-4 w-12" />
            </div>
          </div>

          {/* PostDetailDescriptionCard */}
          <div className="flex flex-col gap-600 rounded-medium bg-bg-secondary px-450 py-600">
            <div className="flex flex-col gap-[6px]">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="flex flex-wrap gap-[6px]">
              <Skeleton className="h-5 w-14 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
          </div>

          {/* PostDetailTagsCard */}
          <div className="flex flex-col gap-500 rounded-medium bg-bg-secondary px-450 py-600">
            <Skeleton className="h-6 w-10" />
            {/* 룸메이트 선호도 */}
            <div className="flex flex-col gap-[10px]">
              <div className="flex items-center gap-200">
                <Skeleton className="size-400 rounded" />
                <Skeleton className="h-4 w-36" />
              </div>
              <div className="flex flex-wrap gap-[6px]">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
            </div>
            <Separator />
            {/* HabitList */}
            <div className="flex flex-col gap-[10px]">
              <Skeleton className="h-5 w-24" />
              <div className="flex flex-col gap-[4px]">
                {[
                  ["w-12", "w-16", "w-12"],
                  ["w-14", "w-16"],
                  ["w-10", "w-20", "w-16", "w-14"],
                  ["w-14", "w-12", "w-18"],
                ].map((tags, i) => (
                  <div key={i} className="flex items-start gap-[10px] px-[2px]">
                    <Skeleton className="mt-[2px] h-4 w-14 shrink-0" />
                    <div className="flex flex-wrap gap-[4px]">
                      {tags.map((w, j) => (
                        <Skeleton key={j} className={`h-5 rounded-full ${w}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PostDetailRoommatesCard */}
          <div className="flex flex-col gap-400 rounded-medium bg-bg-secondary px-450 py-600">
            <div className="flex flex-col gap-100">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-4 w-52" />
            </div>
            <div className="flex flex-col gap-[8px] rounded-[10px] border border-border-normal bg-white px-[10px] py-[14px]">
              {[true, false].map((isHost, i) => (
                <div key={i} className="flex items-center justify-between px-[4px] py-[2px]">
                  <div className="flex items-center gap-200">
                    <Skeleton className="size-6 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  {isHost && <Skeleton className="h-5 w-10 rounded-full" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* 하단 액션바 */}
      <div className="absolute inset-x-0 bottom-0 z-40 flex items-center gap-[10px] bg-bg-primary px-400 pb-9 pt-300">
        <Skeleton className="h-12 flex-1 rounded-full" />
        <Skeleton className="h-12 flex-1 rounded-full" />
      </div>
    </div>
  );
}

export { PostDetailSkeleton };
