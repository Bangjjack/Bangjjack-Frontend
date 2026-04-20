import { StarIcon } from "@/assets/icons";
import { Button } from "@/components/ui";

export type ChatRecruitCardProps = {
  matchRate: number;
  profileSummary: string[];
  recruitTitle: string;
};

function ChatRecruitCard({ matchRate, profileSummary, recruitTitle }: ChatRecruitCardProps) {
  return (
    <section className="w-full overflow-hidden rounded-2xl border border-border-strong bg-bg-secondary px-500 py-3.5">
      <div className="flex flex-col items-start justify-center gap-300">
        <div className="flex flex-col items-start gap-200">
          <div className="flex items-center gap-300">
            <StarIcon className="size-600 shrink-0 text-brand-primary [&_path]:stroke-current" />
            <p className="typo-title3 text-text-strong">{recruitTitle}</p>
          </div>

          <div className="flex flex-col items-start gap-0.5">
            <p className="whitespace-nowrap typo-caption3 text-text-caption">
              나와의 매칭률{" "}
              <span className="font-bold text-text-primary-alternative">{matchRate}%</span>{" "}
              <span>- 잘 맞는 룸메이트예요!</span>
            </p>

            <div className="flex items-center justify-center gap-1.5">
              {profileSummary.map((item, index) => (
                <div key={item} className="flex items-center gap-1.5">
                  {index > 0 ? (
                    <span aria-hidden="true" className="h-2.5 w-px bg-border-strong" />
                  ) : null}
                  <span className="whitespace-nowrap typo-caption3 text-text-caption">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button className="w-full cursor-pointer" size="sm" variant="black">
          모집글 보기
        </Button>
      </div>
    </section>
  );
}

export { ChatRecruitCard };
