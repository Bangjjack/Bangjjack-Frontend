import { CheckIcon, CircleCheckIcon } from "@/assets/icons";
import { Card } from "@/components/ui";

type MatchedItem = {
  id: string;
  label: string;
  description: string;
};

type MatchedItemsCardProps = {
  items: MatchedItem[];
};

function MatchedItemsCard({ items }: MatchedItemsCardProps) {
  return (
    <Card className="gap-300 rounded-medium border-0 bg-bg-secondary px-400 py-450 shadow-none">
      <div className="flex items-center gap-[6px]">
        <CheckIcon aria-hidden="true" className="size-[16px] text-brand-primary" />
        <h3 className="typo-title2 text-text-strong">잘 맞는 점</h3>
      </div>

      <div className="flex flex-col gap-200">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-200 rounded-small bg-neutral-100 p-300"
          >
            <CircleCheckIcon aria-hidden="true" className="mt-[2px] size-[24px] shrink-0" />
            <div className="flex flex-col gap-[2px]">
              <p className="typo-caption1 text-text-caption">{item.label}</p>
              <p className="typo-title3 text-text-strong">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export { MatchedItemsCard };
export type { MatchedItemsCardProps, MatchedItem };
