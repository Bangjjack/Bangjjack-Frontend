import { Tag } from "@/components/ui";
import type { BasicTagCategory } from "@/features/board/types";

type BasicTagListProps = {
  categories: BasicTagCategory[];
};

function BasicTagList({ categories }: BasicTagListProps) {
  return (
    <div className="flex flex-col gap-300">
      {categories.map((category) => (
        <div key={category.title} className="flex flex-col gap-200">
          <span className="typo-title3 text-text-strong">{category.title}</span>
          <div className="flex flex-wrap gap-[4px]">
            {category.tags.map((tag) => (
              <Tag key={tag.label} color={tag.selected ? "black" : "disabled"}>
                {tag.label}
              </Tag>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export { BasicTagList };
export type { BasicTagListProps };
