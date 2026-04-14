import { cn } from "@/lib/cn";
import type { HeaderVariant } from "@/types/header";

type HeaderProps = React.ComponentProps<"div"> & {
  title?: string;
  userName: string;
  variant: HeaderVariant;
};

function Header({ className, title, userName, variant, ...props }: HeaderProps) {
  return (
    <div className={cn(className)} {...props}>
      {variant === "home" ? (
        <header className="px-400 pb-400 pt-9">
          <h1 className="typo-h3 text-text-strong">
            <span className="text-text-primary-alternative">{userName}</span>
            <span>{"님 안녕하세요!"}</span>
          </h1>
        </header>
      ) : variant === "chat" || variant === "title" ? (
        <header className="px-400 pb-400 pt-9">
          <div className="flex items-center justify-center">
            <h1 className="typo-title1 text-center text-text-strong">{title}</h1>
          </div>
        </header>
      ) : variant === "none" ? null : null}
    </div>
  );
}

export { Header };
export type { HeaderProps };
