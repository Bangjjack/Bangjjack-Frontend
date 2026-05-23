import { useEffect, useState } from "react";
import { TagSelected } from "@/components/ui";
import { PRIORITY_FACTOR_OPTIONS } from "@/features/onboarding/constants";
import { cn } from "@/lib/cn";

type OnBoardingPriorityStepProps = {
  className?: string;
  onToggleFactor: (value: string) => void;
  options?: readonly string[];
  replaceFeedbackKey?: number;
  replacedFactor?: string | null;
  selectedFactors: string[];
};

function OnBoardingPriorityStep({
  className,
  onToggleFactor,
  options = PRIORITY_FACTOR_OPTIONS,
  replaceFeedbackKey = 0,
  replacedFactor = null,
  selectedFactors,
}: OnBoardingPriorityStepProps) {
  const [animatingOption, setAnimatingOption] = useState<string | null>(null);

  useEffect(() => {
    if (!animatingOption) return;

    const timer = window.setTimeout(() => {
      setAnimatingOption(null);
    }, 520);

    return () => window.clearTimeout(timer);
  }, [animatingOption]);

  const handleToggle = (option: string, isSelected: boolean) => {
    if (!isSelected) {
      setAnimatingOption(option);
    }

    onToggleFactor(option);
  };

  return (
    <div className={cn("flex flex-1 flex-col px-400", className)}>
      <div className="flex flex-col gap-400">
        <p className="typo-button2">
          <span className="text-text-primary-alternative">{selectedFactors.length}</span>
          <span className="text-text-placeholder">{` / 3 선택됨`}</span>
        </p>

        <div className="flex flex-wrap gap-200">
          {options.map((option) => {
            const selectedIndex = selectedFactors.indexOf(option);
            const isSelected = selectedIndex !== -1;
            const isReplacedFactor = replacedFactor === option;

            const optionKey = `${option}-${isReplacedFactor ? replaceFeedbackKey : 0}`;
            const buttonClassName = cn(
              "inline-flex cursor-pointer rounded-large transition-[filter,box-shadow] duration-400 ease-[ease] hover:brightness-[0.96] active:brightness-[0.92] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus-primary",
              animatingOption === option && "animate-chip-fade-up",
              isReplacedFactor && "animate-chip-fade-up",
            );

            return (
              <button
                key={optionKey}
                aria-pressed={isSelected}
                className={buttonClassName}
                onClick={() => handleToggle(option, isSelected)}
                type="button"
              >
                {isSelected ? (
                  <TagSelected className="pointer-events-none" rank={selectedIndex + 1}>
                    {option}
                  </TagSelected>
                ) : (
                  <TagSelected className="pointer-events-none" variant="gray">
                    {option}
                  </TagSelected>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { OnBoardingPriorityStep };
