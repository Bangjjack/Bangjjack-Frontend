import { cn } from "@/lib/cn";

type ChatHeaderProps = React.ComponentProps<"header">;

function ChatHeader({
  className,
  ...props
}: ChatHeaderProps) {
  return (
    <header className={cn("px-400 pb-400 pt-9", className)} {...props}>
      <h1 className="typo-h3 text-text-strong">채팅</h1>
    </header>
  );
}

export { ChatHeader };
export type { ChatHeaderProps };
