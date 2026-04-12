import { cn } from "@/lib/cn";

type MyPageHeaderProps = React.ComponentProps<"header">;

function MyPageHeader({
  className,
  ...props
}: MyPageHeaderProps) {
  return (
    <header className={cn("px-400 pb-400 pt-9", className)} {...props}>
      <div className="flex items-center justify-center">
        <h1 className="typo-title1 font-semibold text-center text-text-strong">
          마이페이지
        </h1>
      </div>
    </header>
  );
}

export { MyPageHeader };
export type { MyPageHeaderProps };
