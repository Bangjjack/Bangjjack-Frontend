import { cn } from "@/lib/cn";

type RoomHeaderProps = React.ComponentProps<"header">;

function RoomHeader({
  className,
  ...props
}: RoomHeaderProps) {
  return (
    <header className={cn("px-400 pb-400 pt-9", className)} {...props}>
      <div className="flex items-center justify-center">
        <div className="typo-title1 text-center text-text-strong">
          방 찾기
        </div>
      </div>
    </header>
  );
}

export { RoomHeader };
export type { RoomHeaderProps };
