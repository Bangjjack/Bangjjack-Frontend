import { useLayoutEffect, useRef, useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { CircleAlertIcon, CircleDeleteIcon } from "@/assets/icons";

const textareaVariants = cva(
  "flex w-full rounded-small typo-body1 text-text-strong transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-bg-input",
        focused: "border-border-focus-primary bg-bg-secondary",
        filled: "border-transparent bg-bg-input",
        error: "border-border-focus-error bg-bg-secondary",
        disabled: "border-transparent bg-border-strong text-text-disabled",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface TextareaProps extends Omit<React.ComponentProps<"textarea">, "ref"> {
  ref?: React.Ref<HTMLTextAreaElement>;
  error?: boolean;
  errorMessage?: string;
  unstyled?: boolean;
  autoGrow?: boolean;
  onClear?: () => void;
}

function Textarea({
  className,
  error,
  errorMessage,
  unstyled = false,
  autoGrow = false,
  disabled,
  onClear,
  onChange,
  onFocus,
  onBlur,
  value,
  defaultValue,
  ref,
  ...props
}: TextareaProps) {
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const internalRef = useRef<HTMLTextAreaElement>(null);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  useLayoutEffect(() => {
    if (!autoGrow) return;
    const textarea = internalRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [autoGrow, currentValue]);

  function setRefs(node: HTMLTextAreaElement | null) {
    (internalRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
    if (typeof ref === "function") {
      ref(node);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
    }
  }

  if (unstyled) {
    return (
      <textarea
        ref={setRefs}
        aria-invalid={error || props["aria-invalid"]}
        className={cn("outline-none placeholder:text-text-placeholder", className)}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      />
    );
  }

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
      <div className={cn(textareaVariants({ variant }), "border-[1.5px] p-0", className)}>
        <div className="flex w-full items-end">
          <textarea
            ref={setRefs}
            aria-invalid={error || props["aria-invalid"]}
            className={cn(
              "min-w-0 flex-1 resize-none bg-transparent px-300 py-200 outline-none placeholder:text-text-placeholder",
              autoGrow && "overflow-hidden",
              !autoGrow && [
                "[scrollbar-width:thin] [scrollbar-color:var(--color-neutral-350)_transparent]",
                "[&::-webkit-scrollbar]:w-[4px]",
                "[&::-webkit-scrollbar-track]:my-[6px] [&::-webkit-scrollbar-track]:bg-transparent",
                "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-350",
              ],
              disabled && "text-text-disabled placeholder:text-text-disabled",
            )}
            disabled={disabled}
            value={isControlled ? value : internalValue}
            onChange={(e) => {
              if (!isControlled) setInternalValue(e.target.value);
              onChange?.(e);
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
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                if (!isControlled) setInternalValue("");
                onClear?.();
              }}
              className="mb-200 mr-300 shrink-0 self-end"
              aria-label="입력 지우기"
            >
              <CircleDeleteIcon className="size-450" />
            </button>
          )}
          {showError && (
            <div className="mb-200 mr-300 shrink-0 self-end">
              <CircleAlertIcon className="size-450" />
            </div>
          )}
        </div>
      </div>
      {showError && errorMessage && (
        <p className="mt-100 px-1.5 typo-caption2 text-state-error">{errorMessage}</p>
      )}
    </div>
  );
}

export { Textarea, textareaVariants };
export type { TextareaProps };
