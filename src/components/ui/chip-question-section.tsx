import { Chip } from "@/components/ui/chip";
import { cn } from "@/lib/cn";

interface ChipQuestionSectionProps {
  className?: string;
  editable?: boolean;
  helperText?: string;
  onToggle?: (value: string) => void;
  options: readonly string[];
  selectedValues: readonly string[];
  selectionType: "single" | "multi";
  title: string;
}

function ChipQuestionSection({
  className,
  editable = true,
  helperText,
  onToggle,
  options,
  selectedValues,
  selectionType,
  title,
}: ChipQuestionSectionProps) {
  return (
    <section className={cn("flex w-full flex-col gap-300 px-400", className)}>
      <div className="flex items-center gap-300">
        <h2 className="typo-title1 text-text-strong">{title}</h2>
        {helperText ? (
          <span className="typo-caption2 text-text-placeholder">{helperText}</span>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-200">
        {options.map((option) => {
          const isClickable = editable && onToggle;

          return (
            <Chip
              key={option}
              className={cn(isClickable ? "cursor-pointer" : "cursor-default")}
              disabled={!isClickable}
              onClick={isClickable ? () => onToggle(option) : undefined}
              selected={selectedValues.includes(option)}
              variant={selectionType}
            >
              {option}
            </Chip>
          );
        })}
      </div>
    </section>
  );
}

export { ChipQuestionSection };
export type { ChipQuestionSectionProps };
