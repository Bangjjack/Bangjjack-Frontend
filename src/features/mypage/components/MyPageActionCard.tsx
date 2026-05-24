import type { ComponentType, SVGProps } from "react";

import { BookmarkIcon, PuzzleIcon, SquarePenIcon } from "@/assets/icons";
import { Surface } from "@/components/ui";
import { cn } from "@/lib/cn";

interface MyPageAction {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconClassName?: string;
  label: string;
  onClick?: () => void;
}

export interface MyPageActionCardProps {
  onActivityClick?: () => void;
  onBookmarkClick?: () => void;
  onChecklistClick?: () => void;
}

function MyPageActionCard({
  onActivityClick,
  onBookmarkClick,
  onChecklistClick,
}: MyPageActionCardProps) {
  const actions: MyPageAction[] = [
    { icon: SquarePenIcon, label: "내 체크리스트", onClick: onChecklistClick },
    {
      icon: PuzzleIcon,
      iconClassName: "[&_path]:fill-current",
      label: "나의 활동",
      onClick: onActivityClick,
    },
    {
      icon: BookmarkIcon,
      iconClassName: "fill-current",
      label: "북마크한 글",
      onClick: onBookmarkClick,
    },
  ];

  return (
    <Surface
      as="section"
      variant="default"
      className="inline-grid w-full grid-cols-3 grid-rows-1 items-center gap-0 self-stretch px-0 py-400"
    >
      {actions.map(({ icon: Icon, iconClassName, label, onClick }, index) => (
        <button
          key={label}
          className="relative flex min-w-0 cursor-pointer flex-col items-center gap-2.5"
          onClick={onClick}
          type="button"
        >
          {index > 0 ? (
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 top-0 my-auto h-10 w-px bg-neutral-250"
            />
          ) : null}
          <Icon aria-hidden="true" className={cn("size-5 text-icon-disabled", iconClassName)} />
          <span className="typo-label1 text-center text-text-normal">{label}</span>
        </button>
      ))}
    </Surface>
  );
}

export { MyPageActionCard };
