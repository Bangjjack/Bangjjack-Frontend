import type { CoordinationItem } from "@/features/chat/constants";

type SharedLifeCoordinationCardProps = CoordinationItem;

function SharedLifeCoordinationCard({
  description,
  icon: Icon,
  title,
}: SharedLifeCoordinationCardProps) {
  return (
    <div className="flex min-h-28.75 flex-col items-start gap-2.5 overflow-hidden rounded-medium bg-neutral-100 p-300">
      <span className="flex size-6 items-center justify-center rounded-small bg-brand-primary text-icon-on-primary">
        <Icon aria-hidden="true" className="size-[14.4px] [&_path]:stroke-current" />
      </span>
      <h3 className="typo-title3 leading-5 text-neutral-black">{title}</h3>
      <p className="typo-caption2 text-text-caption">{description}</p>
    </div>
  );
}

export { SharedLifeCoordinationCard };
