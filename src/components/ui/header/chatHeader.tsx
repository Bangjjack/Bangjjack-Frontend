import { cn } from "@/lib/cn";

type ChatHeaderProps = React.ComponentProps<"header">;

function ChatHeader({
  className,
  ...props
}: ChatHeaderProps) {
  return (
    <header className={cn("px-400 pb-400 pt-9", className)} {...props}>
      <div className="flex items-center justify-center">
        <h1 className="typo-title1 font-semibold text-center text-text-strong">
          채팅
        </h1>
      </div>
    </header>
  );
}

export { ChatHeader };
export type { ChatHeaderProps };
