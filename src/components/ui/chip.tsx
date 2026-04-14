import { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { CheckIcon } from "@/assets/icons";

/* ── Rank badge ── */

type RankProps = {
  rank: number;
};

function Rank({ rank }: RankProps) {
  return (
    <span className="flex size-[20px] shrink-0 items-center justify-center rounded-full bg-brand-primary typo-label1 text-white">
      {rank}
    </span>
  );
}

/* ── Chip ── */

const chipVariants = cva(
  "inline-flex items-center justify-center rounded-[20px] px-300 py-200 typo-button2 whitespace-nowrap transition-colors",
  {
    variants: {
      variant: {
        single: "",
        multi: "",
        rank: "",
        neutral: "",
      },
      selected: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "single",
        selected: false,
        class: "border border-transparent bg-bg-input text-text-alternative",
      },
      {
        variant: "multi",
        selected: false,
        class: "border border-transparent bg-bg-input text-text-alternative",
      },
      {
        variant: "rank",
        selected: false,
        class: "border border-transparent bg-bg-input text-text-alternative",
      },
      {
        variant: "neutral",
        selected: false,
        class: "border border-border-normal bg-bg-secondary text-text-alternative",
      },
      {
        variant: "single",
        selected: true,
        class: "border border-brand-primary bg-brand-primary-light text-brand-primary-dark",
      },
      {
        variant: "multi",
        selected: true,
        class: "gap-100 border border-brand-primary bg-brand-primary-light text-brand-primary-dark",
      },
      {
        variant: "rank",
        selected: true,
        class:
          "gap-[6px] border border-brand-primary bg-brand-primary-light text-brand-primary-dark",
      },
      {
        variant: "neutral",
        selected: true,
        class: "border border-transparent bg-text-label text-text-on-primary",
      },
    ],
    defaultVariants: {
      variant: "single",
      selected: false,
    },
  },
);

type ChipProps = Omit<React.ComponentProps<"button">, "color"> &
  Omit<VariantProps<typeof chipVariants>, "selected"> & {
    rank?: number;
    selected?: boolean;
    onSelectedChange?: (selected: boolean) => void;
  };

function Chip({
  className,
  variant = "single",
  selected: controlledSelected,
  onSelectedChange,
  rank,
  children,
  onClick,
  ...props
}: ChipProps) {
  const [internalSelected, setInternalSelected] = useState(false);
  const isControlled = controlledSelected !== undefined;
  const selected = isControlled ? controlledSelected : internalSelected;

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const next = !selected;
    if (!isControlled) setInternalSelected(next);
    onSelectedChange?.(next);
    onClick?.(e);
  }

  return (
    <button
      type="button"
      className={cn(chipVariants({ variant, selected }), className)}
      onClick={handleClick}
      {...props}
    >
      {variant === "multi" && selected && <CheckIcon className="size-[20px] shrink-0" />}
      {variant === "rank" && selected && rank != null && <Rank rank={rank} />}
      {children}
    </button>
  );
}

export { Chip, chipVariants };
export type { ChipProps };
