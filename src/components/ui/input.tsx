import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { CircleDeleteIcon, CircleAlertIcon } from "@/assets/icons";

const inputVariants = cva(
  "flex w-full items-center rounded-small border-[1.5px] px-300 py-200 typo-body1 text-text-strong transition-colors",
  {
    variants: {
      variant: {
        default: "border-border-normal bg-bg-secondary",
        focused: "border-border-focus-primary bg-bg-secondary",
        filled: "border-border-normal bg-bg-secondary",
        error: "border-border-focus-error bg-bg-secondary",
        disabled: "border-transparent bg-border-strong text-text-disabled",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type InputProps = Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants> & {
    errorMessage?: string;
    onClear?: () => void;
  };

function Input({ className, variant, disabled, errorMessage, onClear, ...props }: InputProps) {
  const resolvedVariant = disabled ? "disabled" : (variant ?? "default");
  const showClear = resolvedVariant === "filled" && onClear;
  const showError = resolvedVariant === "error";

  return (
    <div className="flex w-full flex-col">
      <div className={cn(inputVariants({ variant: resolvedVariant }), className)}>
        <input
          className={cn(
            "flex-1 bg-transparent outline-none placeholder:text-text-placeholder",
            disabled && "text-text-disabled placeholder:text-text-disabled",
          )}
          disabled={disabled}
          {...props}
        />
        {showClear && (
          <button
            type="button"
            onClick={onClear}
            className="ml-200 shrink-0"
            aria-label="입력 지우기"
          >
            <CircleDeleteIcon className="size-[18px]" />
          </button>
        )}
        {showError && (
          <div className="ml-200 shrink-0">
            <CircleAlertIcon className="size-[18px]" />
          </div>
        )}
      </div>
      {showError && errorMessage && (
        <p className="mt-100 px-[6px] typo-caption2 text-state-error">{errorMessage}</p>
      )}
    </div>
  );
}

export { Input, inputVariants };
export type { InputProps };
