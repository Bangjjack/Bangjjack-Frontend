import { OnBoardingPriorityStep } from "@/features/onboarding/components";
import { PRIORITY_FACTOR_OPTIONS } from "@/features/onboarding/constants";
import type { ImportanceEditSectionProps } from "@/features/mypage/types";

function ImportanceEditSection({
  items,
  onToggle,
  replaceFeedbackKey,
}: ImportanceEditSectionProps) {
  return (
    <section className="flex flex-col items-start gap-1.5 self-stretch rounded-medium bg-bg-secondary px-400 py-300">
      <h2 className="typo-title2 text-text-strong">룸메이트에게 이런 점이 중요해요</h2>
      <OnBoardingPriorityStep
        className="w-full flex-none px-0 pt-0"
        onToggleFactor={onToggle}
        options={PRIORITY_FACTOR_OPTIONS}
        replaceFeedbackKey={replaceFeedbackKey}
        selectedFactors={items}
      />
    </section>
  );
}

export { ImportanceEditSection };
