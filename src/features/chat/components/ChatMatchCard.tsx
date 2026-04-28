import { StarIcon } from "@/assets/icons";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";

export type ChatMatchCardProps = {
  className?: string;
  matchRate: number;
  onProfileClick?: () => void;
  profileSummary: string[];
};

function ChatMatchCard({
  className,
  matchRate,
  onProfileClick,
  profileSummary,
}: ChatMatchCardProps) {
  return (
    <section
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-border-strong bg-bg-secondary px-500 py-3.5",
        className,
      )}
    >
      <div className="flex flex-col items-start justify-center gap-300">
        <div className="flex w-full flex-col items-start gap-200">
          <div className="flex w-full items-center justify-between gap-300">
            <div className="flex min-w-0 items-center gap-100">
              <span className="shrink-0 rounded-full bg-button-primary-ghost px-2.5 py-100 typo-label1 text-text-primary-alternative">
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

          <div className="flex max-w-full flex-wrap items-start gap-1.5">
            {profileSummary.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="shrink-0 rounded-full bg-neutral-150 px-2.5 py-100 typo-label1 text-text-alternative"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <Button
          className="w-full cursor-pointer px-400 py-200"
          onClick={onProfileClick}
          size="sm"
          type="button"
          variant="black"
        >
          프로필 보기
        </Button>
      </div>
    </section>
  );
}

export { ChatMatchCard };
