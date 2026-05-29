import type { MatchRateMismatchedFeature } from "@/features/board/types";

type SharedLifeCoordinationCardProps = Omit<MatchRateMismatchedFeature, "key"> & {
  index: number;
};

function SharedLifeCoordinationCard({
  advice,
  description,
  index,
  label,
}: SharedLifeCoordinationCardProps) {
  return (
    <div className="flex gap-2.5 overflow-hidden rounded-medium bg-neutral-100 p-300">
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-primary typo-label1 leading-none text-text-on-primary">
        {index + 1}
      </span>
      <div className="flex min-w-0 flex-col gap-2.5">
        <h3 className="typo-title3 text-neutral-black">{label}</h3>
        <div className="flex flex-col gap-0.5">
          <p className="typo-caption2 text-text-caption">{description}</p>
          {advice && <p className="typo-caption2 text-brand-primary-dark">{advice}</p>}
        </div>
      </div>
    </div>
  );
}

export { SharedLifeCoordinationCard };
