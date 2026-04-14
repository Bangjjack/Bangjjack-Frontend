import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-[10px] rounded-medium px-400 py-[10px] typo-button1 whitespace-nowrap transition-colors disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-button-primary text-text-on-primary active:bg-button-primary-pressed",
        ghost:
          "border-[1.5px] border-button-primary bg-button-primary-ghost text-text-primary-normal active:bg-brand-primary-light",
        neutral: "bg-button-neutral-ghost text-text-normal active:bg-neutral-250",
        black: "bg-button-neutral text-text-on-primary active:bg-button-neutral-pressed",
        "black-ghost":
          "border-[1.5px] border-border-strong bg-bg-primary text-text-alternative active:bg-neutral-200",
        disabled: "bg-button-disabled text-text-disabled",
      },
      size: {
        default: "",
        sm: "px-300 py-200 typo-button2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({ className, variant, size, asChild = false, disabled, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  const resolvedVariant = disabled ? "disabled" : (variant ?? "default");

  return (
    <Comp
      className={cn(buttonVariants({ variant: resolvedVariant, size }), className)}
      disabled={disabled}
      {...props}
    />
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
