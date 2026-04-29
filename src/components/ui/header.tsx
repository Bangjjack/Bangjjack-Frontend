import { ChevronLeftIcon, MoreVerticalIcon, ProfileOrangeIcon } from "@/assets/icons";
import { cn } from "@/lib/cn";
import type { HeaderVariant } from "@/types/header";
import type { ReactNode } from "react";

type HeaderProps = React.ComponentProps<"div"> & {
  onBackClick?: () => void;
  onMoreClick?: () => void;
  onProfileClick?: () => void;
  profileElement?: ReactNode;
  showBack?: boolean;
  showMore?: boolean;
  showProfile?: boolean;
  title?: string;
  userName?: string;
  variant?: HeaderVariant;
};

function Header({
  className,
  onBackClick,
  onMoreClick,
  onProfileClick,
  profileElement,
  showBack = false,
  showMore = false,
  showProfile = false,
  title,
  userName,
  variant = "title",
  ...props
}: HeaderProps) {
  if (variant === "none") {
    return null;
  }

  if (variant === "home") {
    return (
      <div className={cn(className)} {...props}>
        <header className="px-400 pb-400 pt-9">
          <h1 className="typo-h3 text-text-strong">
            <span className="text-text-primary-alternative">{userName}</span>
            <span>{"님 안녕하세요"}</span>
          </h1>
        </header>
      </div>
    );
  }

  const shouldUseCompactTopPadding = showBack && showProfile;
  const shouldShowMoreButton = showMore && Boolean(onMoreClick);

  if (showProfile) {
    const profileContent = profileElement ?? (
      <ProfileOrangeIcon aria-hidden="true" className="size-9 shrink-0" />
    );

    return (
      <div className={cn(className)} {...props}>
        <header className={cn("px-400 pb-400", shouldUseCompactTopPadding ? "pt-6.5" : "pt-9")}>
          <div className="flex items-center justify-between">
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2.5">
              {showBack ? (
                <button
                  aria-label="뒤로가기"
                  className="flex size-600 shrink-0 cursor-pointer items-center justify-center text-icon-strong"
                  onClick={onBackClick}
                  type="button"
                >
                  <ChevronLeftIcon
                    aria-hidden="true"
                    className="size-600 [&_path]:stroke-current"
                  />
                </button>
              ) : null}

              <div className="flex flex-[1_0_0] items-center gap-2.5">
                {onProfileClick ? (
                  <button
                    aria-label="프로필 보기"
                    className="shrink-0 cursor-pointer"
                    onClick={onProfileClick}
                    type="button"
                  >
                    {profileContent}
                  </button>
                ) : (
                  profileContent
                )}
                <h1 className="typo-title1 text-text-strong">{title}</h1>
              </div>
            </div>

            {shouldShowMoreButton ? (
              <button
                aria-label="더보기"
                className="flex h-5.5 w-5.5 items-center justify-center text-icon-strong"
                onClick={onMoreClick}
                type="button"
              >
                <MoreVerticalIcon
                  aria-hidden="true"
                  className="h-5.5 w-5.5 [&_path]:fill-current"
                />
              </button>
            ) : (
              <div className="size-600 shrink-0" aria-hidden="true" />
            )}
          </div>
        </header>
      </div>
    );
  }

  return (
    <div className={cn(className)} {...props}>
      <header className={cn("px-400 pb-400", shouldUseCompactTopPadding ? "pt-6.5" : "pt-9")}>
        <div className="flex items-center justify-between">
          {showBack ? (
            <button
              aria-label="뒤로가기"
              className="flex size-600 cursor-pointer items-center justify-center text-icon-strong"
              onClick={onBackClick}
              type="button"
            >
              <ChevronLeftIcon aria-hidden="true" className="size-600 [&_path]:stroke-current" />
            </button>
          ) : (
            <div className="size-600 shrink-0" aria-hidden="true" />
          )}

          <div className="flex flex-1 items-center justify-center">
            <h1 className="typo-title1 text-center text-text-strong">{title}</h1>
          </div>

          {shouldShowMoreButton ? (
            <button
              aria-label="더보기"
              className="flex h-5.5 w-5.5 items-center justify-center text-icon-strong"
              onClick={onMoreClick}
              type="button"
            >
              <MoreVerticalIcon aria-hidden="true" className="h-5.5 w-5.5 [&_path]:fill-current" />
            </button>
          ) : (
            <div className="size-600 shrink-0" aria-hidden="true" />
          )}
        </div>
      </header>
    </div>
  );
}

export { Header };
export type { HeaderProps };
