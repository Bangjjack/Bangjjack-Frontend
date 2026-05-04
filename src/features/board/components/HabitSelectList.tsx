import { Tag } from "@/components/ui";
import type { HabitCategory } from "@/features/board/types";

interface HabitSelectListProps {
  categories: readonly HabitCategory[];
  selected: Record<string, string>;
  onSelect: (label: string, option: string) => void;
}

function HabitSelectList({ categories, selected, onSelect }: HabitSelectListProps) {
  return (
    <div className="flex flex-col gap-[4px]">
      {categories.map((habit) => (
        <div key={habit.label} className="flex items-start gap-[10px] px-[2px]">
          <span className="typo-title3 shrink-0 pt-[2px] text-text-strong">{habit.label}</span>
          <div className="flex flex-wrap gap-[4px]">
            {habit.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onSelect(habit.label, option)}
                aria-pressed={selected[habit.label] === option}
              >
                <Tag color={selected[habit.label] === option ? "default" : "gray"}>{option}</Tag>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export { HabitSelectList };
export type { HabitSelectListProps };
