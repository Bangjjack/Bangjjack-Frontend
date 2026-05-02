import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

type TextareaProps = ComponentProps<"textarea"> & {
  error?: boolean;
  unstyled?: boolean;
};

function Textarea({ className, error, unstyled = false, ...props }: TextareaProps) {
  return (
    <textarea
      aria-invalid={error || props["aria-invalid"]}
      className={cn(
        unstyled
          ? "outline-none placeholder:text-text-placeholder"
          : "flex min-h-16 w-full rounded-small border-[1.5px] border-border-normal bg-bg-secondary px-300 py-200 typo-body1 text-text-strong outline-none transition-colors placeholder:text-text-placeholder focus:border-border-focus-primary disabled:border-transparent disabled:bg-border-strong disabled:text-text-disabled disabled:placeholder:text-text-disabled aria-invalid:border-border-focus-error",
        className,
      )}
      data-slot="textarea"
      {...props}
    />
  );
}

export { Textarea };
export type { TextareaProps };
