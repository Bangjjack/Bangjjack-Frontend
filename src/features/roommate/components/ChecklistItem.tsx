import { cn } from "@/lib/cn";

import type { ChecklistEntry } from "@/features/roommate/types/checklist";

function ChecklistItem({ isMatched = true, label, value }: ChecklistEntry) {
  return (
    <div className="flex items-center justify-between overflow-hidden rounded-small bg-neutral-100 px-300 py-[6px]">
      <span className="typo-title3 text-text-normal">{label}</span>
      <span className={cn("typo-title3", isMatched ? "text-text-strong" : "text-state-error-2")}>
        {value}
      </span>
    </div>
  );
}

export { ChecklistItem };
