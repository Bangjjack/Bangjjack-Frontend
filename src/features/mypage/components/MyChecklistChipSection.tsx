import { Chip } from "@/components/ui";
import type { MyChecklistSelectionType } from "@/features/mypage/mocks";
import { cn } from "@/lib/cn";

export interface MyChecklistChipSectionProps {
  editable?: boolean;
  helperText?: string;
  onOptionToggle?: (option: string) => void;
  options: string[];
  selectedOptions: string[];
  selectionType: MyChecklistSelectionType;
  title: string;
}

function MyChecklistChipSection({
  editable = false,
  helperText,
  onOptionToggle,
  options,
  selectedOptions,
  selectionType,
  title,
}: MyChecklistChipSectionProps) {
  return (
    <section className="flex w-full flex-col gap-300 px-400">
      <div className="flex items-center gap-300">
        <h2 className="typo-title1 text-neutral-black">{title}</h2>
        {helperText ? <span className="typo-title4 text-text-placeholder">{helperText}</span> : null}
      </div>

      <div className="flex flex-wrap gap-200">
        {options.map((option) => (
          <Chip
            key={option}
            className={cn(editable ? "cursor-pointer" : "cursor-default")}
            onClick={editable ? () => onOptionToggle?.(option) : undefined}
            selected={selectedOptions.includes(option)}
            variant={selectionType}
          >
            {option}
          </Chip>
        ))}
      </div>
    </section>
  );
}

export { MyChecklistChipSection };
