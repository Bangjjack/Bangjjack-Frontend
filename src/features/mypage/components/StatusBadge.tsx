import { cn } from "@/lib/cn";

type StatusBadgeVariant = "active" | "closed" | "dark";

interface StatusBadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: StatusBadgeVariant;
}

function StatusBadge({ children, className, variant = "active" }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "typo-label1 shrink-0 rounded-full px-2.5 py-0.5",
        variant === "closed" && "bg-button-disabled text-text-caption",
        variant === "active" && "bg-text-strong text-text-on-primary",
        variant === "dark" && "bg-neutral-800 py-100 text-neutral-50",
        className,
      )}
    >
      {children}
    </span>
  );
}

export { StatusBadge };
export type { StatusBadgeProps, StatusBadgeVariant };
