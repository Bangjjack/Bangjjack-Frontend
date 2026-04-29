import { forwardRef, useState, type ComponentProps } from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/cn";

const textareaVariants = cva(
  "flex min-h-16 w-full rounded-small border-[1.5px] px-300 py-200 typo-body1 text-text-strong outline-none transition-colors placeholder:text-text-placeholder",
  {
    variants: {
      variant: {
        default: "border-border-normal bg-bg-secondary",
        focused: "border-border-focus-primary bg-bg-secondary",
        filled: "border-border-normal bg-bg-secondary",
        error: "border-border-focus-error bg-bg-secondary",
        disabled:
          "border-transparent bg-border-strong text-text-disabled placeholder:text-text-disabled",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type TextareaProps = ComponentProps<"textarea"> & {
  error?: boolean;
  unstyled?: boolean;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      defaultValue,
      disabled,
      error,
      onBlur,
      onChange,
      onFocus,
      unstyled = false,
      value,
      ...props
    },
    ref,
  ) => {
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

    return (
      <textarea
        className={cn(
          unstyled
            ? "outline-none placeholder:text-text-placeholder"
            : textareaVariants({ variant }),
          className,
        )}
        defaultValue={isControlled ? undefined : defaultValue}
        disabled={disabled}
        onBlur={(event) => {
          setFocused(false);
          onBlur?.(event);
        }}
        onChange={(event) => {
          if (!isControlled) {
            setInternalValue(event.target.value);
          }

          onChange?.(event);
        }}
        onFocus={(event) => {
          setFocused(true);
          onFocus?.(event);
        }}
        ref={ref}
        value={isControlled ? value : undefined}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
export { textareaVariants };
export type { TextareaProps };
