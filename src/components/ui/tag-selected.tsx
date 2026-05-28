import { cn } from "@/lib/cn";

type TagSelectedBaseProps = React.ComponentProps<"span">;

type TagSelectedProps = TagSelectedBaseProps &
  (
    | {
        rank: number;
        rankClassName?: string;
        variant?: "default" | "neutral";
      }
    | {
        rank?: never;
        rankClassName?: never;
        variant: "gray";
      }
  );

function TagSelected({
  children,
  className,
  rank,
  rankClassName,
  variant = "default",
  ...props
}: TagSelectedProps) {
  const hasRank = variant !== "gray";

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-large px-2.5 py-1.5 typo-label1 whitespace-nowrap transition-[background-color,border-color,color,gap] duration-400 ease-[ease]",
        hasRank ? "gap-100" : "gap-0",
        variant === "default" &&
          "border border-brand-primary bg-brand-primary-light text-text-primary-alternative",
        variant === "neutral" && "bg-neutral-150 text-text-label",
        variant === "gray" && "bg-neutral-150 text-text-alternative",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden={!hasRank}
        className={cn(
          "shrink-0 overflow-hidden transition-[max-width,opacity] duration-400 ease-[ease]",
          hasRank ? "max-w-3.75 opacity-100" : "max-w-0 opacity-0",
        )}
      >
        <span
          className={cn(
            "flex size-3.75 items-center justify-center rounded-full typo-label3 leading-none text-neutral-white",
            variant === "neutral" ? "bg-text-primary-alternative" : "bg-brand-primary",
            rankClassName,
          )}
        >
          {rank}
        </span>
      </span>
      {children}
    </span>
  );
}

export { TagSelected };
export type { TagSelectedProps };
