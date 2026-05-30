import { CircleCheckIcon } from "@/assets/icons";
import type { MatchRateFeature } from "@/features/board/types";

type SharedLifeChecklistRowProps = Omit<MatchRateFeature, "key">;

function SharedLifeChecklistRow({ description, label }: SharedLifeChecklistRowProps) {
  return (
    <div className="flex items-start gap-200 rounded-medium bg-neutral-100 p-300">
      <CircleCheckIcon aria-hidden="true" className="mt-0.5 size-6 shrink-0" />
      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="typo-title3 text-text-caption">{description}</p>
        <p className="truncate typo-title3 text-text-strong">{label}</p>
      </div>
    </div>
  );
}

export { SharedLifeChecklistRow };
