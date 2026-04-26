import { useState } from "react";
import { Chip, RoundButton } from "@/components/ui";
import { RecruitCard } from "@/features/home/components";
import { AiRecommendCard } from "./AiRecommendCard";
import { CampusSelector, CAMPUSES } from "./CampusSelector";

const ROOM_FILTERS = ["전체", "2인 1실", "3인 1실", "4인 1실"] as const;

type RoomFilter = (typeof ROOM_FILTERS)[number];

// TODO: API 연동 후 실제 데이터로 교체
const MOCK_POSTS = [
  {
    id: 1,
    title: "글캠 기숙사 2인실 룸메 구해요!",
    description:
      "깔끔한 편이고 조용한 성격입니다. \n서로 적당한 거리감 유지하면서 편하게 지낼 분 찾아요",
    currentMembers: 1,
    maxMembers: 2,
    dormitory: "3 기숙사",
    roomType: "2인 1실",
    tags: ["비흡연"],
    timeAgo: "3분 전",
  },
  {
    id: 2,
    title: "글캠 기숙사 2인실 룸메 구해요!",
    description:
      "깔끔한 편이고 조용한 성격입니다. \n서로 적당한 거리감 유지하면서 편하게 지낼 분 찾아요",
    currentMembers: 1,
    maxMembers: 2,
    dormitory: "3 기숙사",
    roomType: "2인 1실",
    tags: ["비흡연"],
    timeAgo: "3분 전",
  },
  {
    id: 3,
    title: "글캠 기숙사 2인실 룸메 구해요!",
    description:
      "깔끔한 편이고 조용한 성격입니다. \n서로 적당한 거리감 유지하면서 편하게 지낼 분 찾아요",
    currentMembers: 1,
    maxMembers: 2,
    dormitory: "3 기숙사",
    roomType: "2인 1실",
    tags: ["비흡연"],
    timeAgo: "3분 전",
  },
];

type BoardPageContentProps = {
  showAiRecommend?: boolean;
  onPostClick?: (id: number) => void;
  onAiRecommendClick?: () => void;
  onWriteClick?: () => void;
};

function BoardPageContent({
  showAiRecommend = false,
  onPostClick,
  onAiRecommendClick,
  onWriteClick,
}: BoardPageContentProps) {
  const [selectedCampus, setSelectedCampus] = useState<string>(CAMPUSES[0]);
  const [aiRecommend, setAiRecommend] = useState(false);
  const [roomFilter, setRoomFilter] = useState<RoomFilter>("전체");

  return (
    <>
      <div className="flex flex-col gap-450">
        {/* 헤더: 캠퍼스 선택 + 필터 칩 */}
        <div className="flex flex-col gap-[6px]">
          <CampusSelector value={selectedCampus} onChange={setSelectedCampus} />
          <div className="scrollbar-none -mx-400 flex gap-[6px] overflow-x-auto px-400">
            <Chip
              variant="neutral"
              selected={aiRecommend}
              onSelectedChange={setAiRecommend}
            >
              AI 추천글
            </Chip>
            {ROOM_FILTERS.map((filter) => (
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
        <div className="flex flex-col gap-[10px]">
          {showAiRecommend && <AiRecommendCard onClick={onAiRecommendClick} />}

          {MOCK_POSTS.map((post) => (
            <RecruitCard
              key={post.id}
              title={post.title}
              description={post.description}
              currentMembers={post.currentMembers}
              maxMembers={post.maxMembers}
              dormitory={post.dormitory}
              roomType={post.roomType}
              tags={post.tags}
              timeAgo={post.timeAgo}
              onClick={() => onPostClick?.(post.id)}
            />
          ))}
        </div>
      </div>

      {/* 룸메이트 모집하기 버튼 */}
      <RoundButton onClick={onWriteClick} />
    </>
  );
}

export { BoardPageContent };
export type { BoardPageContentProps };
