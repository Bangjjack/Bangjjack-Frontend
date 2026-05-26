import { StarIcon } from "@/assets/icons";
import { Button } from "@/components/ui";
import type { BaseChatCardProps } from "@/features/chat/types";
import { cn } from "@/lib/cn";

export type ChatMatchCardProps = BaseChatCardProps & {
  onProfileClick?: () => void;
  onRecruitClick?: () => void;
  onReportClick?: () => void;
  recruitTitle?: string;
};

function ChatSchoolInfoList({ items }: { items: string[] }) {
  return (
    <div className="flex max-w-full flex-wrap items-center gap-x-1.5 gap-y-0.5">
      {items.map((item, index) => (
        <div key={`${item}-${index}`} className="flex items-center gap-1.5">
          {index > 0 ? <span aria-hidden="true" className="h-2.5 w-px bg-border-strong" /> : null}
          <span className="whitespace-nowrap typo-caption3 text-text-caption">{item}</span>
        </div>
      ))}
    </div>
  );
}

function ChatMatchCard({
  className,
  matchRate,
  onProfileClick,
  onRecruitClick,
  onReportClick,
  profileSummary,
  recruitTitle,
}: ChatMatchCardProps) {
  const isRecruitCard = Boolean(recruitTitle);
  const title = recruitTitle ?? "추천 대화 주제";

  return (
    <section
      className={cn(
        "box-border w-auto overflow-hidden rounded-medium border border-border-strong bg-bg-secondary px-400 py-400",
        className,
      )}
    >
      <div className="flex flex-col gap-300">
        <div className="flex w-full items-center justify-between gap-300">
          <div className="flex min-w-0 items-center gap-100">
            <span className="shrink-0 rounded-full bg-button-primary-ghost px-300 py-100 typo-label1 text-text-primary-alternative">
              매칭률 {matchRate}%
            </span>
            <span className="min-w-0 truncate typo-label2 text-text-caption">
              잘 맞는 룸메이트예요!
            </span>
          </div>

          <StarIcon
            aria-hidden="true"
            className="size-600 shrink-0 text-brand-primary [&_path]:stroke-current"
          />
        </div>

        <div className="flex max-w-full flex-col items-start gap-100">
          <p className="max-w-full truncate typo-title3 text-text-strong">{title}</p>
          {profileSummary.length > 0 ? <ChatSchoolInfoList items={profileSummary} /> : null}
        </div>

        <div className="grid w-full grid-cols-2 gap-300">
          <Button
            className="h-9 cursor-pointer px-300 py-200"
            onClick={onProfileClick}
            size="sm"
            type="button"
            variant="neutral"
          >
            프로필 보기
          </Button>
          <Button
            className="h-9 cursor-pointer px-300 py-200"
            onClick={isRecruitCard ? onRecruitClick : onReportClick}
            size="sm"
            type="button"
            variant="black"
          >
            <span className="truncate">
              {isRecruitCard ? "모집글 보기" : "AI 매칭 리포트 보기"}
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}

export { ChatMatchCard };
