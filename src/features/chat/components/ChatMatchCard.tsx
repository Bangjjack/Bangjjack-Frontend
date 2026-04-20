import { StarIcon } from "@/assets/icons";
import { Button } from "@/components/ui";

export type ChatMatchCardProps = {
  matchRate: number;
  profileSummary: string[];
};

function ChatMatchCard({ matchRate, profileSummary }: ChatMatchCardProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border-strong bg-bg-secondary px-300 py-2.5">
      <div className="flex w-full items-center justify-between">
        <div className="flex min-w-px items-center gap-200">
          <div className="flex items-center">
            <StarIcon className="size-600 shrink-0 text-brand-primary [&_path]:stroke-current" />
          </div>

          <div className="flex flex-col items-start justify-center gap-0.5">
            <div className="flex flex-col items-start">
              <p className="whitespace-nowrap text-[10px] font-medium leading-3 tracking-[-0.005px] text-text-caption">
                나와의 매칭률{" "}
                <span className="font-bold text-text-primary-alternative">{matchRate}%</span>{" "}
                <span>- 잘 맞는 룸메이트예요!</span>
              </p>
            </div>

            <div className="flex items-center justify-center gap-1.5">
              {profileSummary.map((item, index) => (
                <div key={item} className="flex items-center gap-1.5">
                  {index > 0 ? (
                    <span aria-hidden="true" className="h-2.5 w-px bg-border-strong" />
                  ) : null}
                  <span className="whitespace-nowrap text-[10px] font-medium leading-3 tracking-[-0.005px] text-text-caption">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button className="shrink-0 px-400 cursor-pointer" size="sm" variant="black">
          프로필 보기
        </Button>
      </div>
    </section>
  );
}

export { ChatMatchCard };
