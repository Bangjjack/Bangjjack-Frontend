import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const tagVariants = cva(
  "inline-flex items-center justify-center rounded-full px-[10px] py-[4px] typo-label1 whitespace-nowrap",
  {
    variants: {
      color: {
        default: "bg-button-primary-ghost text-text-primary-alternative",
        gray: "bg-neutral-150 text-text-alternative",
        mint: "bg-brand-secondary-light text-text-secondary-normal",
        black: "bg-neutral-800 text-neutral-50",
        pink: "bg-state-error-light text-state-error-2",
        orange: "bg-icon-primary-normal text-text-on-primary",
        disabled: "bg-button-neutral-ghost text-text-disabled",
      },
    },
    defaultVariants: {
      color: "default",
    },
  },
);

type TagProps = React.ComponentProps<"span"> &
  VariantProps<typeof tagVariants> & {
    rank?: number;
  };

function Tag({ className, color, rank, children, ...props }: TagProps) {
  if (rank !== undefined) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-100 rounded-full bg-neutral-150 px-[10px] py-[6px]",
          className,
        )}
        {...props}
      >
        <span className="flex size-[15px] shrink-0 items-center justify-center rounded-full bg-brand-primary text-[9px] font-bold leading-none text-white">
          {rank}
        </span>
        <span className="typo-label1 text-text-label">{children}</span>
      </span>
    );
  }

  return (
    <span className={cn(tagVariants({ color }), className)} {...props}>
      {children}
    </span>
  );
}

export { Tag };
export type { TagProps };
