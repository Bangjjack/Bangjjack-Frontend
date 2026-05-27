import { cn } from "@/lib/cn";

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded bg-neutral-150", className)} />;
}

export { Skeleton };
