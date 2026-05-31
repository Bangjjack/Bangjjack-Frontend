import type { ReactNode } from "react";
import { ChevronLeftIcon } from "@/assets/icons";
import { Button } from "@/components/ui";
import type { ProgressState } from "@/features/onboarding/types";
import { cn } from "@/lib/cn";

type OnBoardingLayoutProps = {
  actionDisabled: boolean;
  actionLabel: string;
  children: ReactNode;
  description?: string;
  footerDescription?: ReactNode;
  footerDescriptionKey?: string;
  headerActionLabel?: string;
  onBack?: () => void;
  onHeaderAction?: () => void;
  progressStates: readonly ProgressState[];
  title: string;
};

function ProgressBar({ progressStates }: { progressStates: readonly ProgressState[] }) {
  return (
    <div className="flex w-full items-center justify-center gap-100 px-400">
      {progressStates.map((state, index) => (
        <div
          key={`${state}-${index}`}
          className={cn(
            "h-0.75 min-w-0 flex-1 rounded-full",
            state === "active" ? "bg-brand-primary" : "bg-neutral-250",
          )}
        />
      ))}
    </div>
  );
}

function OnBoardingLayout({
  actionDisabled,
  actionLabel,
  children,
  description,
  footerDescription,
  footerDescriptionKey,
  headerActionLabel,
  onBack,
  onHeaderAction,
  progressStates,
  title,
}: OnBoardingLayoutProps) {
  return (
    <div className="h-dvh overflow-hidden bg-bg-primary">
      <div className="flex h-full w-full flex-col">
        <div className="h-600 bg-neutral-50" />

        <header className="flex flex-col gap-600">
          <ProgressBar progressStates={progressStates} />

          <div className="flex flex-col gap-400 px-400 py-600">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={onBack}
                className="flex size-600 items-center justify-center cursor-pointer"
                aria-label="이전으로"
              >
                <ChevronLeftIcon className="size-600" />
              </button>
              {headerActionLabel ? (
                <button
                  type="button"
                  onClick={onHeaderAction}
                  className="cursor-pointer typo-button2 text-text-primary-alternative"
                >
                  {headerActionLabel}
                </button>
              ) : (
                <div className="h-600 w-700" />
              )}
            </div>

            <div className="flex flex-col gap-200 px-100">
              <h1 className="typo-h3 whitespace-pre-line text-text-strong">{title}</h1>
              {description ? <p className="typo-title2 text-text-caption">{description}</p> : null}
            </div>
          </div>
        </header>

        <main className="flex flex-1 flex-col overflow-y-auto scrollbar-none pb-800">
          {children}
        </main>

        <footer className="flex flex-col gap-400 px-400 pb-[calc(36px+env(safe-area-inset-bottom))] pt-300">
          {footerDescription ? (
            <div
              key={footerDescriptionKey}
              className="animate-footer-flow typo-caption2 text-text-placeholder"
            >
              {footerDescription}
            </div>
          ) : null}
          <Button type="submit" disabled={actionDisabled} className="w-full cursor-pointer">
            {actionLabel}
          </Button>
        </footer>
      </div>
    </div>
  );
}

export { OnBoardingLayout };
