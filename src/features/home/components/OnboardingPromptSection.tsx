import { ChevronRightIcon } from "@/assets/icons";
import { Button, IconBadge } from "@/components/ui";

type OnboardingPromptSectionProps = {
  onChecklistClick?: () => void;
};

function OnboardingPromptSection({ onChecklistClick }: OnboardingPromptSectionProps) {
  return (
    <section className="flex flex-col gap-[12px] rounded-medium border border-dashed border-border-alternative bg-bg-secondary px-300 py-450">
      <div className="flex items-center justify-between gap-300">
        <div className="flex min-w-0 flex-1 items-center gap-300">
          <IconBadge size="medium" variant="solid" />
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="typo-title2 text-text-strong">내 체크리스트 완성하기</span>
            <span className="typo-caption2 text-text-caption">
              나와 맞는 룸메이트를 추천 받아봐요
            </span>
          </div>
        </div>
        <ChevronRightIcon
          aria-hidden="true"
          className="size-600 shrink-0 text-icon-alternative [&_path]:stroke-current"
        />
      </div>
      <Button className="w-full" size="sm" onClick={onChecklistClick}>
        체크리스트 완성하러 가기
      </Button>
    </section>
  );
}

export { OnboardingPromptSection };
export type { OnboardingPromptSectionProps };
