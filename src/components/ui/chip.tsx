import { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { CheckIcon } from "@/assets/icons";

/* ── Rank badge ── */

type RankProps = {
  color?: "brand" | "neutral";
  rank: number;
  size?: "default" | "sm";
  visible: boolean;
};

type CheckMarkProps = {
  visible: boolean;
};

function CheckMark({ visible }: CheckMarkProps) {
  return (
    <span
      aria-hidden={!visible}
      className={cn(
        "shrink-0 overflow-hidden transition-[max-width,opacity] duration-400 ease-[ease]",
        visible ? "max-w-[20px] opacity-100" : "max-w-0 opacity-0",
      )}
    >
      <span className="flex size-[20px] items-center justify-center overflow-hidden">
        <CheckIcon className={cn("size-[20px] shrink-0", visible && "animate-chip-rank-pop")} />
      </span>
    </span>
  );
}

function Rank({ color = "brand", rank, size = "default", visible }: RankProps) {
  return (
    <span
      aria-hidden={!visible}
      className={cn(
        "shrink-0 overflow-hidden transition-[max-width,opacity] duration-400 ease-[ease]",
        visible ? "max-w-[20px] opacity-100" : "max-w-0 opacity-0",
      )}
    >
      <span
        className={cn(
          "flex items-center justify-center overflow-hidden rounded-full text-white",
          color === "brand" ? "bg-brand-primary" : "bg-neutral-800",
          size === "default" ? "size-[20px] typo-label1" : "size-3.75 typo-label3",
          visible && "animate-chip-rank-pop",
        )}
      >
        {rank}
      </span>
    </span>
  );
}

/* ── Chip ── */

const chipVariants = cva(
  "inline-flex items-center justify-center rounded-[20px] px-300 py-200 typo-button2 whitespace-nowrap cursor-pointer transition-[background-color,border-color,color,gap,padding,box-shadow] duration-400 ease-[ease] hover:brightness-[0.96] active:brightness-[0.92] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus-primary",
  {
    variants: {
      variant: {
        single: "",
        multi: "",
        rank: "",
        "rank-neutral": "",
        neutral: "",
        "neutral-primary": "",
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
        variant: "rank-neutral",
        selected: false,
        class: "bg-neutral-150 text-text-label",
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
        variant: "rank-neutral",
        selected: true,
        class: "gap-100 bg-neutral-150 px-2.5 py-1.5 typo-label1 text-text-label",
      },
      {
        variant: "neutral",
        selected: true,
        class: "border border-transparent bg-text-label text-text-on-primary",
      },
      {
        variant: "neutral-primary",
        selected: false,
        class: "border border-border-normal bg-bg-secondary text-text-alternative",
      },
      {
        variant: "neutral-primary",
        selected: true,
        class: "border border-brand-primary bg-brand-primary-light text-brand-primary-dark",
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
      aria-pressed={selected}
      className={cn(chipVariants({ variant, selected }), className)}
      onClick={handleClick}
      {...props}
    >
      {variant === "multi" && <CheckMark visible={selected} />}
      {variant === "rank" && <Rank rank={rank ?? 0} visible={selected && rank != null} />}
      {variant === "rank-neutral" && (
        <Rank color="neutral" rank={rank ?? 0} size="sm" visible={selected && rank != null} />
      )}
      {children}
    </button>
  );
}

export { Chip, chipVariants };
export type { ChipProps };
