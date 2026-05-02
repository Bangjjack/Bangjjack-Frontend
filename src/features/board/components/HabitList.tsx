import { Tag } from "@/components/ui";

interface Habit {
  label: string;
  options: string[];
  selectedIndex: number;
}

interface HabitListProps {
  habits: Habit[];
}

function HabitList({ habits }: HabitListProps) {
  return (
    <div className="flex flex-col gap-[10px]">
      <span className="typo-title2 text-text-strong">공동 생활습관</span>
      <div className="flex flex-col gap-[4px]">
        {habits.map((habit) => (
          <div key={habit.label} className="flex items-start gap-[10px] px-[2px]">
            <span className="typo-title3 shrink-0 pt-[2px] text-text-strong">{habit.label}</span>
            <div className="flex flex-wrap gap-[4px]">
              {habit.options.map((option, idx) => (
                <Tag key={option} color={idx === habit.selectedIndex ? "default" : "disabled"}>
                  {option}
                </Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { HabitList, type Habit };
