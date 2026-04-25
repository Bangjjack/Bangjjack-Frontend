import { CheckIcon } from "@/assets/icons";
import { ChecklistItem } from "@/features/roommate/components/ChecklistItem";

import type { ChecklistEntry } from "@/features/roommate/types/checklist";

type ChecklistCardProps = {
  items: ChecklistEntry[];
  nickname: string;
};

function ChecklistCard({ items, nickname }: ChecklistCardProps) {
  return (
    <div className="flex flex-col gap-[10px] rounded-medium bg-bg-secondary px-400 py-450">
      <div className="flex flex-col gap-600">
        <div className="flex items-center gap-[6px]">
          <CheckIcon
            aria-hidden="true"
            className="size-[20px] shrink-0 text-brand-primary [&_path]:stroke-current"
          />
          <h3 className="typo-title2 text-text-strong">{nickname} 님의 체크리스트</h3>
        </div>

        <div className="flex flex-col gap-[6px]">
          {items.map((item) => (
            <ChecklistItem
              key={item.id}
              isMatched={item.isMatched}
              label={item.label}
              value={item.value}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-[6px] px-[6px] py-100">
        <span className="size-[6px] rounded-full bg-state-error-2" aria-hidden="true" />
        <span className="typo-title4 text-icon-alternative">불일치</span>
      </div>
    </div>
  );
}

export { ChecklistCard };
export type { ChecklistCardProps, ChecklistEntry };
