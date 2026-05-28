import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, RoundButton } from "@/components/ui";
import { RecruitCard, RecruitCardSkeleton } from "@/components";
import {
  DORMITORY_LABEL,
  ROOM_SIZE_LABEL,
  ROOM_SIZE_MAX,
  SMOKING_LABEL,
  ROOMMATE_PREFERENCE_LABEL,
} from "@/constants";
import { ChecklistRequiredDialog } from "@/features/onboarding/components";
import { useHomePostList } from "@/features/board/hooks";
import { useRecommendedRoommates } from "@/features/home/hooks";
import { formatRelativeTime, getAgeFromBirthYear } from "@/utils";
import { useDragScroll, useFadeInOnScroll } from "@/hooks";
import { cn } from "@/lib/cn";
import { useAuthStore } from "@/stores/authStore";
import { OnboardingPromptSection } from "./OnboardingPromptSection";
import { RoommateProfileCard } from "./RoommateProfileCard";
import { RoommateProfileCardSkeleton } from "./RoommateProfileCardSkeleton";

type HomePageContentProps = {
  onChecklistClick?: () => void;
  onMoreRecruitsClick?: () => void;
  onRoommateClick?: (id: number) => void;
  onRecruitClick?: (id: number) => void;
  onRecruitCreateClick?: () => void;
};

function HomePageContent({
  onChecklistClick,
  onMoreRecruitsClick,
  onRoommateClick,
  onRecruitClick,
  onRecruitCreateClick,
}: HomePageContentProps) {
  const isOnboardingCompleted = useAuthStore((state) => state.isOnboardingCompleted);
  const navigate = useNavigate();
  const [showChecklistDialog, setShowChecklistDialog] = useState(false);
  const { ref: emblaRef, handlers } = useDragScroll();
  const recruitListRef = useFadeInOnScroll<HTMLDivElement>();

  const { data, isLoading, isError } = useHomePostList();
  const posts = data?.content ?? [];

  const {
    data: roommates,
    isLoading: isRoommatesLoading,
    isError: isRoommatesError,
    refetch: refetchRoommates,
  } = useRecommendedRoommates();

  return (
    <div className="flex flex-col gap-600">
      <RoundButton
        onClick={() => {
          if (!isOnboardingCompleted) {
            setShowChecklistDialog(true);
            return;
          }
          onRecruitCreateClick?.();
        }}
      />
      {/* 추천 룸메이트 */}
      <section>
        <h2 className="typo-h4 py-2.5 text-text-strong">추천 룸메이트</h2>

        {isOnboardingCompleted ? (
          isRoommatesError ? (
            <div className="flex flex-col items-center gap-3 py-4">
              <p className="typo-body2 text-center text-text-caption">
                추천 룸메이트를 불러오지 못했어요
              </p>
              <Button variant="ghost" size="sm" onClick={() => refetchRoommates()}>
                다시 매칭하기
              </Button>
            </div>
          ) : (
            <div className="relative">
              {/* Embla viewport */}
              <div ref={emblaRef} className="overflow-hidden" {...handlers}>
                {/* Embla container */}
                <div className="flex gap-[12px]">
                  {isRoommatesLoading ? (
                    Array.from({ length: 3 }).map((_, i) => <RoommateProfileCardSkeleton key={i} />)
                  ) : roommates && roommates.length > 0 ? (
                    roommates.map((roommate) => {
                      const tags = [
                        SMOKING_LABEL[roommate.smoking] ?? roommate.smoking,
                        ...roommate.roommatePreferences.map(
                          (pref) => ROOMMATE_PREFERENCE_LABEL[pref] ?? pref,
                        ),
                      ];

                      return (
                        <RoommateProfileCard
                          key={roommate.userId}
                          className="min-w-0 shrink-0"
                          nickname={roommate.username}
                          age={getAgeFromBirthYear(roommate.birthYear)}
                          department={roommate.departmentName}
                          matchRate={roommate.matchRate}
                          profileImage={roommate.profileImage}
                          tags={tags}
                          onClick={() => onRoommateClick?.(roommate.userId)}
                        />
                      );
                    })
                  ) : (
                    <p className="typo-body2 w-full py-4 text-center text-text-caption">
                      추천 룸메이트가 없어요
                    </p>
                  )}
                </div>
              </div>

              {/* 오른쪽 "더 있음" 힌트 */}
              <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-linear-to-l from-bg-primary to-transparent" />
            </div>
          )
        ) : (
          <OnboardingPromptSection onChecklistClick={onChecklistClick} />
        )}
      </section>

      {/* 이런 방은 어때요? */}
      <section>
        <div className="flex items-center justify-between py-2.5">
          <h2 className="typo-h4 text-text-strong">이런 방은 어때요?</h2>
          <button
            type="button"
            className={cn(
              "typo-button2",
              "text-text-placeholder",
              "cursor-pointer",
              "transition-colors duration-150",
              "hover:text-text-strong",
              "active:scale-95",
            )}
            onClick={onMoreRecruitsClick}
          >
            모두 보기
          </button>
        </div>
        {isError ? (
          <p className="typo-body2 py-4 text-center text-text-caption">
            게시글을 불러오지 못했어요
          </p>
        ) : isLoading ? (
          <div className="flex flex-col gap-2.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <RecruitCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div ref={recruitListRef} className="flex flex-col gap-2.5">
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
                  onClick={() => onRecruitClick?.(post.postId)}
                />
              );
            })}
          </div>
        )}
      </section>

      <ChecklistRequiredDialog
        description={"모집글 작성 기능을 사용하려면\n내 생활습관 정보가 필요해요"}
        open={showChecklistDialog}
        onOpenChange={setShowChecklistDialog}
        onConfirm={() => {
          setShowChecklistDialog(false);
          navigate("/mypage/profile");
        }}
      />
    </div>
  );
}

export { HomePageContent };
export type { HomePageContentProps };
