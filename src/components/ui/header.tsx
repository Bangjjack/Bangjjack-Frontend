import ChevronLeftIcon from "@/assets/icons/chevronLeft.svg?react";
import MoreVerticalIcon from "@/assets/icons/moreVertical.svg?react";
import ProfileIcon from "@/assets/icons/profile.svg?react";
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
      ) : variant === "backTitle" ? (
        <header className="px-400 pb-400 pt-9">
          <div className="flex items-center justify-between">
            <button
              aria-label="뒤로가기"
              className="flex size-600 items-center justify-center text-icon-strong"
              type="button"
            >
              <ChevronLeftIcon aria-hidden="true" className="size-600 [&_path]:stroke-current" />
            </button>
            <div className="flex flex-1 items-center justify-center pr-600">
              <h1 className="typo-title1 text-center text-text-strong">{title}</h1>
            </div>
          </div>
        </header>
      ) : variant === "backTitleMore" ? (
        <header className="px-400 pb-400 pt-9">
          <div className="flex items-center justify-between">
            <button
              aria-label="뒤로가기"
              className="flex size-600 items-center justify-center text-icon-strong"
              type="button"
            >
              <ChevronLeftIcon aria-hidden="true" className="size-600 [&_path]:stroke-current" />
            </button>
            <div className="flex flex-1 items-center justify-center">
              <h1 className="typo-title1 text-center text-text-strong">{title}</h1>
            </div>
            <button
              aria-label="더보기"
              className="flex h-5.5 w-5.5 items-center justify-center text-icon-strong"
              type="button"
            >
              <MoreVerticalIcon aria-hidden="true" className="h-5.5 w-5.5 [&_path]:fill-current" />
            </button>
          </div>
        </header>
      ) : variant === "backProfileTitle" ? (
        <header className="px-400 pb-400 pt-6.5">
          <div className="flex items-center gap-2.5">
            <button
              aria-label="뒤로가기"
              className="flex size-600 items-center justify-center text-icon-strong"
              type="button"
            >
              <ChevronLeftIcon aria-hidden="true" className="size-600 [&_path]:stroke-current" />
            </button>
            <div className="flex items-center gap-2.5 pr-600">
              <ProfileIcon aria-hidden="true" className="size-9" />
              <h1 className="typo-title1 text-text-strong">{title}</h1>
            </div>
          </div>
        </header>
      ) : variant === "title" ? (
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
