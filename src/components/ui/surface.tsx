import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const surfaceVariants = cva("rounded-medium", {
  variants: {
    padding: {
      default: "p-400",
      none: "p-0",
    },
    variant: {
      default: "bg-bg-secondary",
      outlined: "border border-border-normal bg-bg-secondary",
      primary: "bg-brand-primary-light",
      secondary: "bg-brand-secondary-light",
      neutral: "bg-neutral-150",
    },
  },
  defaultVariants: {
    padding: "default",
    variant: "default",
  },
});

type SurfaceElement = "article" | "div" | "section";

type SurfaceProps = React.ComponentProps<"div"> &
  VariantProps<typeof surfaceVariants> & {
    as?: SurfaceElement;
  };

function Surface({ as: Comp = "div", className, padding, variant, ...props }: SurfaceProps) {
  return <Comp className={cn(surfaceVariants({ padding, variant }), className)} {...props} />;
}

export { Surface };
export type { SurfaceProps };
