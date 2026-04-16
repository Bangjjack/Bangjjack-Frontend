import { RoundButton } from "@/components/ui";
import { RoommateProfileCard } from "./RoommateProfileCard";
import { RecruitCard } from "./RecruitCard";
import { useDragScroll } from "../hooks/useDragScroll";

// TODO: API 연동 시 제거
const MOCK_ROOMMATES = [
  {
    nickname: "무구정광대다라니경",
    age: 20,
    department: "컴퓨터공학과",
    matchRate: 78,
    tags: ["얼리버드", "집순이", "비흡연"],
  },
  {
    nickname: "햄무라비법전",
    age: 21,
    department: "경영학과",
    matchRate: 78,
    tags: ["올빼미형", "밖순이", "비흡연"],
  },
  {
    nickname: "냠냠",
    age: 21,
    department: "경영학과",
    matchRate: 78,
    tags: ["올빼미형", "밖순이", "비흡연"],
  },
];

const MOCK_RECRUITS = [
  {
    id: 1,
    title: "글캠 기숙사 2인실 룸메 구해요!",
    description:
      "깔끔한 편이고 조용한 성격입니다.\n서로 적당한 거리감 유지하면서 편하게 지낼 분 찾아요",
    currentMembers: 1,
    maxMembers: 2,
    dormitory: "3 기숙사",
    roomType: "2인 1실",
    tags: ["비흡연"],
    timeAgo: "3분 전",
  },
  {
    id: 2,
    title: "메캠 기숙사 룸메 매칭해요",
    description: "3인실 한 자리 남았어요!\n아침형 인간이라 운동 좋아하는 분이면 좋겠습니당",
    currentMembers: 1,
    maxMembers: 2,
    dormitory: "3 기숙사",
    roomType: "2인 1실",
    tags: ["비흡연"],
    timeAgo: "3분 전",
  },
  {
    id: 3,
    title: "메캠 기숙사 룸메 매칭해요",
    description: "3인실 한 자리 남았어요!\n아침형 인간이라 운동 좋아하는 분이면 좋겠습니당",
    currentMembers: 1,
    maxMembers: 2,
    dormitory: "3 기숙사",
    roomType: "2인 1실",
    tags: ["비흡연"],
    timeAgo: "어제",
  },
];

type HomePageContentProps = {
  onMoreRecruitsClick?: () => void;
  onRoommateClick?: (index: number) => void;
  onRecruitClick?: (id: number) => void;
  onRecruitCreateClick?: () => void;
};

function HomePageContent({
  onMoreRecruitsClick,
  onRoommateClick,
  onRecruitClick,
  onRecruitCreateClick,
}: HomePageContentProps) {
  const { ref: scrollRef, handlers } = useDragScroll<HTMLDivElement>();

  return (
    <div className="flex flex-col gap-600 center">
      <RoundButton onClick={onRecruitCreateClick} />
      {/* 추천 룸메이트 */}
      <section>
        <h2 className="typo-h4 py-[10px] text-text-strong">추천 룸메이트</h2>

        <div className="relative">
          <div
            ref={scrollRef}
            className="
        scrollbar-none
        flex
        gap-[12px]
        overflow-x-auto
        cursor-grab
        active:cursor-grabbing
      "
            style={{
              WebkitOverflowScrolling: "touch",
              touchAction: "pan-x",
            }}
            {...handlers}
          >
            {MOCK_ROOMMATES.map((roommate, index) => (
              <RoommateProfileCard
                key={roommate.nickname}
                className="shrink-0"
                onClick={() => onRoommateClick?.(index)}
                {...roommate}
              />
            ))}
          </div>

          {/* 👉 오른쪽 "더 있음" 힌트 */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-bg-primary to-transparent" />
        </div>
      </section>

      {/* 이런 방은 어때요? */}
      <section>
        <div className="flex items-center justify-between py-[10px]">
          <h2 className="typo-h4 text-text-strong">이런 방은 어때요?</h2>
          <button
            type="button"
            className="
    typo-button2 text-text-placeholder
    cursor-pointer
    transition-colors duration-150
    hover:text-text-strong
    active:scale-95
  "
            onClick={onMoreRecruitsClick}
          >
            모두 보기
          </button>
        </div>
        <div className="flex flex-col gap-[10px]">
          {MOCK_RECRUITS.map((recruit) => (
            <RecruitCard
              key={recruit.id}
              onClick={() => onRecruitClick?.(recruit.id)}
              {...recruit}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export { HomePageContent };
export type { HomePageContentProps };
