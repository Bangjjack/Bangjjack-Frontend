import { cn } from "@/lib/cn";
import { Card, Tag } from "@/components/ui/index";

type RecruitCardProps = {
  className?: string;
  title: string;
  description: string;
  currentMembers: number;
  maxMembers: number;
  dormitory: string;
  roomType: string;
  tags?: string[];
  matchRate?: number;
  timeAgo: string;
  onClick?: () => void;
};

function MatchBar({ rate }: { rate: number }) {
  return (
    <div className="flex items-center gap-300">
      <div className="relative h-[4px] flex-1 rounded-full bg-neutral-150">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-brand-primary"
          style={{ width: `${Math.min(rate, 100)}%` }}
        />
      </div>
      <span className="typo-label1 text-brand-primary">{rate}%</span>
    </div>
  );
}

function RecruitCard({
  className,
  title,
  description,
  currentMembers,
  maxMembers,
  dormitory,
  roomType,
  tags = [],
  matchRate,
  timeAgo,
  onClick,
}: RecruitCardProps) {
  return (
    <Card
      className={cn(
        "w-full gap-0 rounded-medium border-0 bg-bg-secondary px-400 py-450 shadow-none",
        onClick && "cursor-pointer hover:brightness-[0.98] active:brightness-95",
        className,
      )}
      onClick={onClick}
    >
      <div className="flex flex-col gap-400">
        {/* 상단: 제목 + 본문 + 매칭바 */}
        <div className="flex flex-col gap-200">
          {/* 제목 + 인원 태그 */}
          <div className="flex items-center justify-between">
            <h3 className="typo-title2 text-text-strong">{title}</h3>
            <Tag color="black">
              {currentMembers} / {maxMembers}
            </Tag>
          </div>

          {/* 설명 */}
          <p className="typo-caption1 text-text-caption line-clamp-2 whitespace-pre-wrap">
            {description}
          </p>

          {/* 매칭바 (옵션) */}
          {matchRate !== undefined && <MatchBar rate={matchRate} />}
        </div>

        {/* 하단: 태그들 + 시간 */}
        <div className="flex items-center justify-between">
          <div className="flex gap-[6px]">
            <Tag color="default">{dormitory}</Tag>
            <Tag color="default">{roomType}</Tag>
            {tags.map((tag) => (
              <Tag key={tag} color="gray">
                {tag}
              </Tag>
            ))}
          </div>
          <span className="typo-caption2 text-text-disabled">{timeAgo}</span>
        </div>
      </div>
    </Card>
  );
}

export { RecruitCard };
export type { RecruitCardProps };
