import { cn } from "@/lib/cn";

type MyPageHeaderProps = React.ComponentProps<"header">;

function MyPageHeader({
  className,
  ...props
}: MyPageHeaderProps) {
  return (
    <header className={cn("px-400 pb-400 pt-9", className)} {...props}>
      <h1 className="typo-h3 text-text-strong">마이 페이지</h1>
    </header>
  );
}

export { MyPageHeader };
export type { MyPageHeaderProps };
