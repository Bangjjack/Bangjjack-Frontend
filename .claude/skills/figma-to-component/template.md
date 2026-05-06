# Component template

## 기본: 정적 태그 (`div`)

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const variants = cva("/* base: layout + 토큰 기반 스타일 */", {
  variants: {
    variant: {
      primary: "/* … */",
      secondary: "/* … */",
    },
    size: {
      lg: "/* … */",
      md: "/* … */",
      sm: "/* … */",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type ComponentProps = React.ComponentProps<"div"> & VariantProps<typeof variants>;

function Component({ className, variant, size, ...props }: ComponentProps) {
  return (
    <div className={cn(variants({ variant, size }), className)} {...props} />
  );
}

export { Component, variants, type ComponentProps };
```

## `asChild` + Radix Slot (shadcn 스타일)

프로젝트에 `@radix-ui/react-slot`이 없으면: `pnpm add @radix-ui/react-slot`.

```tsx
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const variants = cva("/* base */", {
  variants: {
    variant: { primary: "", secondary: "" },
    size: { lg: "", md: "", sm: "" },
  },
  defaultVariants: { variant: "primary", size: "md" },
});

type ComponentProps = React.ComponentProps<"div"> &
  VariantProps<typeof variants> & {
    asChild?: boolean;
  };

function Component({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={cn(variants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Component, variants, type ComponentProps };
```

- `asChild`일 때 **자식은 단일 React 요소**여야 한다 (Slot 규약).

## `index.ts` 배럴 export

`src/components/ui/index.ts`:

```ts
export { Component } from "./component";
export { type ComponentProps } from "./component";
```

(파일명·이름은 실제 컴포넌트에 맞게 조정.)
