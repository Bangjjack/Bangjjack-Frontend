import type { ComponentType, SVGProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { CheckIcon } from "@/assets/icons";
import { cn } from "@/lib/cn";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const iconBadgeVariants = cva("inline-flex shrink-0 items-center justify-center rounded-medium", {
  variants: {
    size: {
      small: "size-400",
      medium: "size-12",
      large: "size-13",
    },
    variant: {
      transparent: "bg-transparent text-brand-primary",
      light: "bg-brand-primary-light text-icon-primary-alternative",
      solid: "bg-brand-primary text-icon-on-primary",
    },
  },
  defaultVariants: {
    size: "large",
    variant: "light",
  },
});

const iconBadgeIconVariants = cva("shrink-0 [&_path]:stroke-current", {
  variants: {
    size: {
      small: "size-400",
      medium: "size-600",
      large: "size-600",
    },
  },
  defaultVariants: {
    size: "large",
  },
});

type IconBadgeProps = Omit<React.ComponentProps<"span">, "children"> &
  VariantProps<typeof iconBadgeVariants> & {
    icon?: IconComponent;
    iconClassName?: string;
  };

function IconBadge({
  className,
  icon: Icon = CheckIcon,
  iconClassName,
  size,
  variant,
  ...props
}: IconBadgeProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(iconBadgeVariants({ size, variant }), className)}
      {...props}
    >
      <Icon className={cn(iconBadgeIconVariants({ size }), iconClassName)} />
    </span>
  );
}

export { IconBadge };
export type { IconBadgeProps };
