import { useEffect, useState } from "react";
import { Tag, TagSelected } from "@/components/ui";
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

            const commonClassName = cn(
              "cursor-pointer",
              animatingOption === option && "animate-chip-fade-up",
              isReplacedFactor && "animate-chip-fade-up",
            );

            const commonProps = {
              onClick: () => handleToggle(option, isSelected),
              className: commonClassName,
              children: option,
            };

            if (isSelected) {
              return (
                <TagSelected
                  key={`${option}-${isReplacedFactor ? replaceFeedbackKey : 0}`}
                  rank={selectedIndex + 1}
                  variant="default"
                  {...commonProps}
                />
              );
            }

            return (
              <Tag
                key={`${option}-${isReplacedFactor ? replaceFeedbackKey : 0}`}
                color="gray"
                {...commonProps}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { OnBoardingPriorityStep };
