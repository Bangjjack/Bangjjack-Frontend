import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Chip, RoundButton, toast } from "@/components/ui";
import { cn } from "@/lib/cn";
import { CAMPUS_API_MAP, ROOM_FILTER_API_MAP, ROOM_FILTERS } from "@/features/board/constants";
import type { RoomFilter } from "@/features/board/constants";
import { ChecklistRequiredDialog } from "@/features/onboarding/components";
import { usePostList, useRecommendedPostList } from "@/features/board/hooks";
import type { BoardPageContentProps } from "@/features/board/types";
import { CampusSelector } from "./CampusSelector";
import { PostList } from "./PostList";
import { RecommendedPostList } from "./RecommendedPostList";

function BoardPageContent({
  aiRecommend,
  isOnboardingCompleted,
  onAiRecommendChange,
  onPostClick,
  onWriteClick,
}: BoardPageContentProps) {
  const navigate = useNavigate();
  const [selectedCampus, setSelectedCampus] = useState<string | null>(null);
  const [roomFilter, setRoomFilter] = useState<RoomFilter | null>(null);
  const [checklistDialog, setChecklistDialog] = useState<{
    description: string;
    highlight?: string;
  } | null>(null);

  const roomSizeParam = roomFilter ? ROOM_FILTER_API_MAP[roomFilter] : undefined;

  const { data, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage, isError } = usePostList(
    {
      campus: selectedCampus ? CAMPUS_API_MAP[selectedCampus] : undefined,
      roomSize: roomSizeParam,
    },
    !aiRecommend,
  );

  const {
    data: recommendedPosts,
    isLoading: isRecommendedLoading,
    isError: isRecommendedError,
    fetchStatus: recommendedFetchStatus,
    refetch: refetchRecommended,
  } = useRecommendedPostList({ roomSize: roomSizeParam }, aiRecommend);

  useEffect(() => {
    if (recommendedFetchStatus !== "idle") return;
    if (isRecommendedError) toast.error("AI 추천글을 불러오지 못했어요");
  }, [recommendedFetchStatus, isRecommendedError]);

  const posts = data?.pages.flatMap((page) => page.content) ?? [];

  return (
    <>
      <div className="flex min-h-full flex-col gap-450">
        {/* 헤더: 캠퍼스 선택 + 필터 칩 */}
        <div className="flex flex-col gap-[6px]">
          <CampusSelector value={selectedCampus} onChange={setSelectedCampus} />
          <div className="scrollbar-none -mx-400 flex gap-[6px] overflow-x-auto px-400">
            <Chip
              variant="neutral-primary"
              selected={roomFilter === null}
              onSelectedChange={() => setRoomFilter(null)}
            >
              전체
            </Chip>
            <Chip
              variant="neutral"
              selected={aiRecommend}
              onSelectedChange={(selected) => {
                if (selected && !isOnboardingCompleted) {
                  setChecklistDialog({
                    description: "AI 추천글 정렬 기능을 사용하려면\n내 생활습관 정보가 필요해요",
                    highlight: "AI 추천글 정렬 기능",
                  });
                  return;
                }
                onAiRecommendChange(selected);
                if (selected) toast.success("AI 추천순으로 정렬했어요");
              }}
              className="gap-[6px]"
            >
              <span
                className={cn(
                  "size-[6px] shrink-0 rounded-full",
                  aiRecommend ? "bg-brand-primary" : "bg-button-disabled",
                )}
                aria-hidden="true"
              />
              AI 추천글
            </Chip>
            {ROOM_FILTERS.filter((f) => f !== "전체").map((filter) => (
              <Chip
                key={filter}
                variant="neutral-primary"
                selected={roomFilter === filter}
                onSelectedChange={() => setRoomFilter(filter)}
              >
                {filter}
              </Chip>
            ))}
          </div>
        </div>

        {/* 게시글 목록 */}
        {aiRecommend ? (
          <RecommendedPostList
            posts={recommendedPosts}
            isLoading={isRecommendedLoading}
            isError={isRecommendedError}
            onRetry={refetchRecommended}
            onPostClick={onPostClick}
          />
        ) : (
          <PostList
            posts={posts}
            isFetching={isFetching}
            isError={isError}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onPostClick={onPostClick}
          />
        )}
      </div>

      {/* 룸메이트 모집하기 버튼 */}
      <RoundButton
        onClick={() => {
          if (!isOnboardingCompleted) {
            setChecklistDialog({
              description: "모집글 작성 기능을 사용하려면\n내 생활습관 정보가 필요해요",
              highlight: "모집글 작성 기능",
            });
            return;
          }
          onWriteClick?.();
        }}
      />

      <ChecklistRequiredDialog
        description={checklistDialog?.description ?? ""}
        highlight={checklistDialog?.highlight}
        open={checklistDialog !== null}
        onOpenChange={(open) => {
          if (!open) setChecklistDialog(null);
        }}
        onConfirm={() => {
          setChecklistDialog(null);
          navigate("/mypage/profile");
        }}
      />
    </>
  );
}

export { BoardPageContent };
export type { BoardPageContentProps };
