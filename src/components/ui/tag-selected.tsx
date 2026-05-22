import { cn } from "@/lib/cn";

type TagSelectedProps = React.ComponentProps<"span"> & {
  rank: number;
  variant?: "default" | "variant2";
};

function TagSelected({
  children,
  className,
  rank,
  variant = "default",
  ...props
}: TagSelectedProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-100 rounded-large px-2.5 py-1.5 typo-label1 whitespace-nowrap",
        variant === "default" &&
          "border border-brand-primary bg-brand-primary-light text-text-primary-alternative",
        variant === "variant2" && "bg-neutral-150 text-text-label",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "flex size-3.75 shrink-0 items-center justify-center rounded-full typo-label3 text-neutral-white",
          variant === "default" ? "bg-brand-primary" : "bg-neutral-800",
        )}
      >
        {rank}
      </span>
      {children}
    </span>
  );
}

export { TagSelected };
export type { TagSelectedProps };
