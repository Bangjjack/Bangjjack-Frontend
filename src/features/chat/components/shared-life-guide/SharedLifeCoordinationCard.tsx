import type { CoordinationItem } from "@/features/chat/constants";

type SharedLifeCoordinationCardProps = CoordinationItem;

function SharedLifeCoordinationCard({
  description,
  icon: Icon,
  leftLabel,
  rightLabel,
  title,
}: SharedLifeCoordinationCardProps) {
  return (
    <div className="flex flex-col gap-200 overflow-hidden rounded-medium bg-neutral-100 p-300">
      <div className="flex items-center gap-200">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-primary text-icon-on-primary">
          <Icon aria-hidden="true" className="size-4 [&_path]:stroke-current" />
        </span>
        <div className="flex min-w-0 flex-col gap-100">
          <h3 className="truncate typo-title3 text-neutral-black">{title}</h3>
          <div className="flex items-center gap-100 typo-label3 text-text-normal">
            <span className="rounded-full bg-neutral-200 px-200 py-100">{leftLabel}</span>
            <span aria-hidden="true" className="text-text-caption">
              ↔
            </span>
            <span className="rounded-full bg-neutral-200 px-200 py-100">{rightLabel}</span>
          </div>
        </div>
      </div>
      <p className="typo-caption2 text-text-caption">{description}</p>
    </div>
  );
}

export { SharedLifeCoordinationCard };
