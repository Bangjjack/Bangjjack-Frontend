import { cn } from "@/lib/cn";

type RoomHeaderProps = React.ComponentProps<"header">;

function RoomHeader({
  className,
  ...props
}: RoomHeaderProps) {
  return (
    <header className={cn("px-400 pb-400 pt-9", className)} {...props}>
      <h1 className="typo-h3 text-text-strong">방 찾기</h1>
    </header>
  );
}

export { RoomHeader };
export type { RoomHeaderProps };
