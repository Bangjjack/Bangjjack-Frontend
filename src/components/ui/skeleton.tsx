import { cn } from "@/lib/cn";

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded bg-bg-skeleton", className)} />;
}

export { Skeleton };
