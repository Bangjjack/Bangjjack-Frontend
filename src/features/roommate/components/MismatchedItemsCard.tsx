import { CircleErrorIcon, DeleteIcon } from "@/assets/icons";
import { Card } from "@/components/ui";

type MismatchedItem = {
  key: string;
  label: string;
  description: string;
  advice: string;
};

type MismatchedItemsCardProps = {
  items: MismatchedItem[];
};

function MismatchedItemsCard({ items }: MismatchedItemsCardProps) {
  return (
    <Card className="gap-300 rounded-medium border-0 bg-bg-secondary px-400 py-450 shadow-none">
      <div className="flex items-center gap-[6px]">
        <DeleteIcon aria-hidden="true" className="size-[16px]" />
        <h3 className="typo-title2 text-text-strong">다른 점</h3>
      </div>

      <div className="flex flex-col gap-200">
        {items.map((item) => (
          <div
            key={item.key}
            className="flex items-start gap-200 rounded-small bg-neutral-100 p-300"
          >
            <CircleErrorIcon
              aria-hidden="true"
              className="mt-[2px] size-[24px] shrink-0 text-state-error-2"
            />
            <div className="flex flex-col gap-[2px]">
              <p className="typo-caption1 text-text-caption">{item.label}</p>
              <p className="typo-title3 text-text-strong">{item.description}</p>
              <p className="typo-caption2 text-text-disabled">{item.advice}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export { MismatchedItemsCard };
export type { MismatchedItemsCardProps, MismatchedItem };
