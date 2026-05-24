import { useEffect, useState } from "react";

import { TagSelected } from "@/components/ui";
import { PRIORITY_FACTOR_OPTIONS } from "@/features/onboarding/constants";
import type { ImportanceEditSectionProps } from "@/features/mypage/types";
import { cn } from "@/lib/cn";

function ImportanceEditSection({ items, onToggle }: ImportanceEditSectionProps) {
  const [animatingOption, setAnimatingOption] = useState<string | null>(null);
  const [shakingOption, setShakingOption] = useState<string | null>(null);

  useEffect(() => {
    if (!animatingOption) return;

    const timer = window.setTimeout(() => {
      setAnimatingOption(null);
    }, 520);

    return () => window.clearTimeout(timer);
  }, [animatingOption]);

  useEffect(() => {
    if (!shakingOption) return;

    const timer = window.setTimeout(() => {
      setShakingOption(null);
    }, 320);

    return () => window.clearTimeout(timer);
  }, [shakingOption]);

  function handleToggle(option: string, isSelected: boolean) {
    if (isSelected) {
      onToggle(option);
      return;
    }

    if (items.length >= 3) {
      setShakingOption(option);
      return;
    }

    if (!isSelected) {
      setAnimatingOption(option);
    }

    onToggle(option);
  }

  return (
    <section className="flex flex-col items-start gap-1.5 self-stretch rounded-medium bg-bg-secondary px-400 py-300">
      <h2 className="typo-title2 text-text-strong">룸메이트에게 이런 점이 중요해요</h2>

      <div className="flex w-full flex-col gap-400">
        <p className="typo-button2">
          <span className="text-text-primary-alternative">{items.length}</span>
          <span className="text-text-placeholder">{` / 3 선택됨`}</span>
        </p>

        <div className="flex flex-wrap gap-200">
          {PRIORITY_FACTOR_OPTIONS.map((option) => {
            const selectedIndex = items.indexOf(option);
            const isSelected = selectedIndex !== -1;

            return (
              <button
                key={option}
                aria-pressed={isSelected}
                className={cn(
                  "inline-flex cursor-pointer rounded-large transition-[filter,box-shadow] duration-400 ease-[ease] hover:brightness-[0.96] active:brightness-[0.92] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus-primary",
                  animatingOption === option && "animate-chip-fade-up",
                  shakingOption === option && "animate-chip-shake",
                )}
                onClick={() => handleToggle(option, isSelected)}
                type="button"
              >
                {isSelected ? (
                  <TagSelected
                    className="pointer-events-none"
                    rank={selectedIndex + 1}
                    rankClassName={animatingOption === option ? "animate-chip-rank-pop" : undefined}
                  >
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
    </section>
  );
}

export { ImportanceEditSection };
