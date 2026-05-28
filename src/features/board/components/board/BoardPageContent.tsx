import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Chip, RoundButton, toast } from "@/components/ui";
import { cn } from "@/lib/cn";
import { RecruitCard, RecruitCardSkeleton } from "@/components";
import { DORMITORY_LABEL, ROOM_SIZE_LABEL, ROOM_SIZE_MAX } from "@/constants";
import { CAMPUS_API_MAP, ROOM_FILTER_API_MAP, ROOM_FILTERS } from "@/features/board/constants";
import type { RoomFilter } from "@/features/board/constants";
import { ChecklistRequiredDialog } from "@/features/onboarding/components";
import { usePostList } from "@/features/board/hooks";
import { formatRelativeTime } from "@/features/board/utils";
import { useFadeInOnScroll } from "@/hooks";
import { CampusSelector } from "./CampusSelector";

type BoardPageContentProps = {
  aiRecommend: boolean;
  isOnboardingCompleted: boolean;
  onAiRecommendChange: (value: boolean) => void;
  onPostClick?: (id: number) => void;
  onWriteClick?: () => void;
};

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
  const sentinelRef = useRef<HTMLDivElement>(null);
  const fadeInRef = useFadeInOnScroll<HTMLDivElement>();

  const { data, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage, isError } = usePostList(
    {
      campus: selectedCampus ? CAMPUS_API_MAP[selectedCampus] : undefined,
      roomSize: roomFilter ? ROOM_FILTER_API_MAP[roomFilter] : undefined,
    },
  );

  const posts = data?.pages.flatMap((page) => page.content) ?? [];

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

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
        {isError ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="typo-body2 text-text-caption">게시글을 불러오지 못했어요</p>
          </div>
        ) : isFetching && posts.length === 0 ? (
          <div className="flex flex-col gap-[10px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <RecruitCardSkeleton key={i} />
            ))}
          </div>
        ) : !isFetching && posts.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="typo-body2 text-text-caption">해당하는 게시글이 없어요</p>
          </div>
        ) : (
          <div ref={fadeInRef} className="flex flex-col gap-[10px]">
            {posts.map((post) => {
              const maxMembers = ROOM_SIZE_MAX[post.roomSize] ?? 0;
              const currentMembers = maxMembers - post.recruitMemberCount;

              return (
                <RecruitCard
                  key={post.postId}
                  title={post.title}
                  description={post.description}
                  currentMembers={currentMembers}
                  maxMembers={maxMembers}
                  dormitory={DORMITORY_LABEL[post.dormitory] ?? post.dormitory}
                  roomType={ROOM_SIZE_LABEL[post.roomSize] ?? post.roomSize}
                  timeAgo={formatRelativeTime(post.createdAt)}
                  onClick={() => onPostClick?.(post.postId)}
                />
              );
            })}

            {/* 무한 스크롤 감지 */}
            <div ref={sentinelRef} />
          </div>
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
