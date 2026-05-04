import { cn } from "@/lib/cn";

type WriteCardProps = React.ComponentProps<"section">;

function WriteCard({ className, children, ...props }: WriteCardProps) {
  return (
    <section
      className={cn("flex flex-col rounded-medium bg-bg-secondary px-450 py-600", className)}
      {...props}
    >
      {children}
    </section>
  );
}

export { WriteCard };
export type { WriteCardProps };
