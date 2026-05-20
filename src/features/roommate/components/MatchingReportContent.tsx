import { Button, Card, Header, ProfileAvatar } from "@/components/ui";
import { AiCommentCard } from "@/features/roommate/components/AiCommentCard";
import { MatchRateCard } from "@/features/roommate/components/MatchRateCard";
import { MatchedItemsCard } from "@/features/roommate/components/MatchedItemsCard";
import { useGoBack } from "@/hooks/useGoBack";

import type { MatchedItem } from "@/features/roommate/components/MatchedItemsCard";

// TODO: API 연동 시 제거
const MOCK_MATCH_RATE = 88;
const MOCK_MATCH_COUNT = 5;
const MOCK_MISMATCH_COUNT = 2;
const MOCK_TOTAL_COUNT = 7;
const MOCK_SUMMARY = "나와 잘 맞는 룸메이트예요!";
const MOCK_MATCHED_ITEMS: MatchedItem[] = [
  { id: "sleepTime", label: "취침 시간", description: "둘 다 24~2시로 늦게 자는 편이에요" },
  { id: "callHabit", label: "통화 습관", description: "소곤소곤 조용히 통화하는 것을 선호해요" },
  { id: "smoking", label: "흡연 여부", description: "둘 다 비흡연자예요" },
  {
    id: "indoorTemperature",
    label: "실내 온도",
    description: "비슷한 온도를 선호해 갈등이 적을 것 같아요",
  },
];

type MatchingReportContentProps = {
  roommateId?: number;
};

function MatchingReportContent({ roommateId }: MatchingReportContentProps) {
  const goBack = useGoBack();

  // TODO: API 연동 시 roommateId로 실제 데이터 조회
  const nickname = "무구정광대다라니경";
  const age = 20;
  const department = "컴퓨터공학과";
  const avatarSeed = roommateId ?? nickname.length;

  return (
    <div className="relative flex h-dvh flex-col bg-bg-primary">
      <Header className="shrink-0" title="AI 매칭 리포트" showBack onBackClick={goBack} />

      <main className="scrollbar-none min-h-0 flex-1 overflow-y-auto">
        <div className="flex flex-col gap-300 px-400 py-300 pb-[100px]">
          {/* 프로필 카드 */}
          <Card className="flex-row items-center gap-300 rounded-medium border-0 bg-bg-secondary px-300 py-400 shadow-none">
            <ProfileAvatar size={48} seed={avatarSeed} />
            <div className="flex flex-col gap-[2px]">
              <p className="typo-title2 text-text-strong">{nickname}</p>
              <div className="flex items-center gap-[6px]">
                <span className="typo-caption1 text-text-alternative">{age}세</span>
                <span className="h-[12px] w-px bg-neutral-300" aria-hidden="true" />
                <span className="typo-caption1 text-text-alternative">{department}</span>
              </div>
            </div>
          </Card>

          <MatchRateCard
            matchRate={MOCK_MATCH_RATE}
            matchCount={MOCK_MATCH_COUNT}
            mismatchCount={MOCK_MISMATCH_COUNT}
            totalCount={MOCK_TOTAL_COUNT}
            summary={MOCK_SUMMARY}
          />

          <MatchedItemsCard items={MOCK_MATCHED_ITEMS} />

          <AiCommentCard>
            <p className="typo-caption1 whitespace-pre-line text-text-normal">
              <span className="font-bold text-brand-primary">{nickname}</span>
              {
                " 님과는 생활 습관이 잘 맞아 큰 갈등 없이 잘 지낼 수 있을 것 같아요! 취침 시간, 통화 습관, 흡연 여부 항목에서 높은 일치율을 보였어요.\n\n다만 "
              }
              <span className="font-bold text-brand-primary">청소 주기</span>
              {"와 "}
              <span className="font-bold text-brand-primary">잠버릇</span>
              {
                " 항목에서 차이가 있어요. 룸메이트 매칭 전 청소 담당, 청소 방식과 수면 환경에 대해 미리 이야기를 나눠보면 더 좋은 룸메이트가 될 수 있을 거예요!"
              }
            </p>
          </AiCommentCard>
        </div>
      </main>

      {/* 하단 버튼 */}
      <div className="absolute inset-x-0 bottom-0 z-40 bg-bg-primary px-400 pb-9 pt-300">
        <Button className="w-full">매칭하기</Button>
      </div>
    </div>
  );
}

export { MatchingReportContent };
