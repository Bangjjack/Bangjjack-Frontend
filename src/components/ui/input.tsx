import { useState } from "react";
import { cva } from "class-variance-authority";
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

type InputProps = Omit<React.ComponentProps<"input">, "size"> & {
  error?: boolean;
  errorMessage?: string;
  onClear?: () => void;
};

function Input({
  className,
  error,
  disabled,
  errorMessage,
  onClear,
  onFocus,
  onBlur,
  value,
  defaultValue,
  ...props
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const isFilled = String(currentValue).length > 0;

  function resolveVariant() {
    if (disabled) return "disabled" as const;
    if (error) return "error" as const;
    if (focused) return "focused" as const;
    if (isFilled) return "filled" as const;
    return "default" as const;
  }

  const variant = resolveVariant();
  const showClear = isFilled && onClear && !disabled && !error;
  const showError = variant === "error";

  return (
    <div className="flex w-full flex-col">
      <div className={cn(inputVariants({ variant }), className)}>
        <input
          className={cn(
            "flex-1 bg-transparent outline-none placeholder:text-text-placeholder",
            disabled && "text-text-disabled placeholder:text-text-disabled",
          )}
          disabled={disabled}
          value={isControlled ? value : internalValue}
          onChange={(e) => {
            if (!isControlled) setInternalValue(e.target.value);
            props.onChange?.(e);
          }}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...props}
        />
        {showClear && (
          <button
            type="button"
            onClick={() => {
              if (!isControlled) setInternalValue("");
              onClear?.();
            }}
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
