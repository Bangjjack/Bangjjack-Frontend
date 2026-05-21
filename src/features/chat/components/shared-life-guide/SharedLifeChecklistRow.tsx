import { CircleCheckIcon, CircleNonCheckIcon } from "@/assets/icons";
import { Tag } from "@/components/ui";
import type { GuideChecklistItem } from "@/features/chat/constants";
import { cn } from "@/lib/cn";

type SharedLifeChecklistRowProps = GuideChecklistItem;

function SharedLifeChecklistRow({
  category,
  checked,
  label,
  required,
}: SharedLifeChecklistRowProps) {
  const isChecked = required && checked;
  const StatusIcon = isChecked ? CircleCheckIcon : CircleNonCheckIcon;

  return (
    <div className="flex items-center justify-between gap-300 rounded-medium bg-neutral-100 p-300">
      <div className="flex min-w-0 items-start gap-200">
        <StatusIcon
          aria-hidden="true"
          className={cn(
            "mt-0.5 size-6 shrink-0",
            !isChecked && "text-brand-primary [&_path]:stroke-current",
          )}
        />
        <div className="min-w-0">
          <p className="typo-caption2 text-text-caption">{category}</p>
          <p className="truncate typo-title3 text-text-strong">{label}</p>
        </div>
      </div>

      <Tag className="shrink-0" color={required ? "default" : "gray"}>
        {required ? "필수" : "권장"}
      </Tag>
    </div>
  );
}

export { SharedLifeChecklistRow };
