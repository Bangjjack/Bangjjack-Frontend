import { RoundButton } from "@/components/ui";
import { RecruitCard } from "@/components";
import { DORMITORY_LABEL, ROOM_SIZE_LABEL, ROOM_SIZE_MAX } from "@/constants";
import { useHomePostList } from "@/features/board/hooks";
import { formatRelativeTime } from "@/utils";
import { useDragScroll, useFadeInOnScroll } from "@/hooks";
import { cn } from "@/lib/cn";
import { RoommateProfileCard } from "./RoommateProfileCard";

// TODO: API 연동 시 제거
const MOCK_ROOMMATES = [
  {
    id: "roommate-1",
    nickname: "무구정광대다라니경",
    age: 20,
    department: "컴퓨터공학과",
    matchRate: 78,
    tags: ["얼리버드", "집순이", "비흡연"],
  },
  {
    id: "roommate-2",
    nickname: "햄무라비법전",
    age: 21,
    department: "경영학과",
    matchRate: 78,
    tags: ["올빼미형", "밖순이", "비흡연"],
  },
  {
    id: "roommate-3",
    nickname: "냠냠",
    age: 21,
    department: "경영학과",
    matchRate: 78,
    tags: ["올빼미형", "밖순이", "비흡연"],
  },
];

type HomePageContentProps = {
  onMoreRecruitsClick?: () => void;
  onRoommateClick?: (id: string) => void;
  onRecruitClick?: (id: number) => void;
  onRecruitCreateClick?: () => void;
};

function HomePageContent({
  onMoreRecruitsClick,
  onRoommateClick,
  onRecruitClick,
  onRecruitCreateClick,
}: HomePageContentProps) {
  const { ref: emblaRef, handlers } = useDragScroll();
  const recruitListRef = useFadeInOnScroll<HTMLDivElement>();

  const { data, isError } = useHomePostList();
  const posts = data?.content ?? [];

  return (
    <div className="flex flex-col gap-600">
      <RoundButton onClick={onRecruitCreateClick} />
      {/* 추천 룸메이트 */}
      <section>
        <h2 className="typo-h4 py-2.5 text-text-strong">추천 룸메이트</h2>

        <div className="relative">
          {/* Embla viewport */}
          <div ref={emblaRef} className="overflow-hidden" {...handlers}>
            {/* Embla container */}
            <div className="flex gap-[12px]">
              {MOCK_ROOMMATES.map(({ id, ...roommate }) => (
                <RoommateProfileCard
                  key={id}
                  className="min-w-0 shrink-0"
                  onClick={() => onRoommateClick?.(id)}
                  {...roommate}
                />
              ))}
            </div>
          </div>

          {/* 오른쪽 "더 있음" 힌트 */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-linear-to-l from-bg-primary to-transparent" />
        </div>
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
    </div>
  );
}

export { HomePageContent };
export type { HomePageContentProps };
