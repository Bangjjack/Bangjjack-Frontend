import { Card, Tag } from "@/components/ui";
import { MatchingGauge } from "@/features/roommate/components/MatchingGauge";

type MatchRateCardProps = {
  matchCount: number;
  matchRate: number;
  mismatchCount: number;
  summary: string;
  totalCount: number;
};

function MatchRateCard({
  matchCount,
  matchRate,
  mismatchCount,
  summary,
  totalCount,
}: MatchRateCardProps) {
  return (
    <Card className="items-center gap-450 rounded-medium border-0 bg-bg-secondary px-400 py-500 shadow-none">
      <p className="typo-title2 text-text-strong">나와의 AI 매칭률</p>

      <MatchingGauge percentage={matchRate} />

      <div className="flex w-full flex-col items-center gap-450">
        {/* 일치/불일치 태그 */}
        <div className="flex gap-[6px]">
          <Tag color="mint" className="gap-100">
            <span className="size-[6px] rounded-full bg-brand-secondary-dark" aria-hidden="true" />
            일치 {matchCount}개
          </Tag>
          <Tag color="pink" className="gap-100">
            <span className="size-[6px] rounded-full bg-state-error-2" aria-hidden="true" />
            불일치 {mismatchCount}개
          </Tag>
        </div>

        {/* 요약 텍스트 */}
        <div className="flex flex-col items-center gap-0 text-center">
          <p className="typo-caption1 text-text-caption">
            {"체크리스트 "}
            <span className="font-bold text-brand-primary">{totalCount}개 항목</span>
            {" 중 "}
            <span className="font-bold text-brand-primary">{matchCount}개</span>
            {"가 일치해요"}
          </p>
          <p className="typo-caption1 text-text-caption">{summary}</p>
        </div>
      </div>
    </Card>
  );
}

export { MatchRateCard };
export type { MatchRateCardProps };
