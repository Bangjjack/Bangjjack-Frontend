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

type TagProps = React.ComponentProps<"span"> & VariantProps<typeof tagVariants>;

function Tag({ className, color, ...props }: TagProps) {
  return <span className={cn(tagVariants({ color }), className)} {...props} />;
}

export { Tag, tagVariants };
export type { TagProps };
