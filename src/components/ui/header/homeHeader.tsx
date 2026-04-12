import { cn } from "@/lib/cn";

type HomeHeaderProps = React.ComponentProps<"header"> & {
  userName: string;
};

function HomeHeader({
  className,
  userName,
  ...props
}: HomeHeaderProps) {
  return (
    <header className={cn("px-400 pb-400 pt-9", className)} {...props}>
      <h1 className="typo-h3 text-text-strong">
        <span className="text-text-primary-alternative">{userName}</span>
        <span>님, 안녕하세요</span>
      </h1>
    </header>
  );
}

export { HomeHeader };
export type { HomeHeaderProps };
