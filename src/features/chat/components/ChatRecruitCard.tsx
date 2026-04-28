import { StarIcon } from "@/assets/icons";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";

export type ChatRecruitCardProps = {
  className?: string;
  matchRate: number;
  profileSummary: string[];
  recruitTitle: string;
};

function ChatRecruitCard({
  className,
  matchRate,
  profileSummary,
  recruitTitle,
}: ChatRecruitCardProps) {
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

          <div className="flex max-w-full flex-col items-start gap-0.5">
            <p className="max-w-full truncate text-[14px] font-semibold leading-5 text-neutral-black">
              {recruitTitle}
            </p>

            <div className="flex max-w-full flex-wrap items-center gap-x-1.5 gap-y-0.5">
              {profileSummary.map((item, index) => (
                <div key={`${item}-${index}`} className="flex items-center gap-1.5">
                  {index > 0 ? (
                    <span aria-hidden="true" className="h-2.5 w-px bg-border-strong" />
                  ) : null}
                  <span className="whitespace-nowrap typo-caption3 text-text-caption">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button
          className="w-full cursor-pointer px-400 py-200"
          size="sm"
          type="button"
          variant="black"
        >
          모집글 보기
        </Button>
      </div>
    </section>
  );
}

export { ChatRecruitCard };
