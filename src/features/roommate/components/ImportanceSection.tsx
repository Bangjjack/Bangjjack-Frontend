import { TagSelected } from "@/components/ui";

type ImportanceSectionProps = {
  items: string[];
};

function ImportanceSection({ items }: ImportanceSectionProps) {
  return (
    <div className="flex flex-col gap-[6px] rounded-medium bg-bg-secondary px-400 py-400">
      <h3 className="typo-title2 text-text-strong">룸메이트에게 이런 점이 중요해요</h3>
      <div className="flex flex-wrap gap-[6px]">
        {items.map((item, index) => (
          <TagSelected key={item} rank={index + 1} variant="neutral">
            {item}
          </TagSelected>
        ))}
      </div>
    </div>
  );
}

export { ImportanceSection };
export type { ImportanceSectionProps };
