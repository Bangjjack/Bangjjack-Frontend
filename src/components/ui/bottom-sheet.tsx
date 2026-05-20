import { useState } from "react";
import { cn } from "@/lib/cn";

type BottomSheetProps = {
  children: (requestClose: () => void) => React.ReactNode;
  onClose: () => void;
  className?: string;
  closeAriaLabel?: string;
};

function BottomSheet({ children, onClose, className, closeAriaLabel = "닫기" }: BottomSheetProps) {
  const [isClosing, setIsClosing] = useState(false);

  const requestClose = () => {
    if (isClosing) return;
    setIsClosing(true);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-end bg-bg-overlay",
        isClosing ? "animate-overlay-fade-out" : "animate-overlay-fade-in",
        className,
      )}
    >
      <button
        aria-label={closeAriaLabel}
        className="absolute inset-0"
        onClick={requestClose}
        type="button"
      />
      <div
        className={cn(
          "relative z-10 mx-auto flex w-full max-w-(--width-app-shell) flex-col gap-7.5 rounded-t-[20px] bg-white px-500 pb-500 pt-500",
          isClosing ? "animate-bottom-sheet-down" : "animate-bottom-sheet-up",
        )}
        onAnimationEnd={(event) => {
          if (event.target !== event.currentTarget) return;
          if (isClosing) onClose();
        }}
      >
        <div className="mx-auto h-1 w-7.5 rounded-full bg-neutral-300" />
        {children(requestClose)}
      </div>
    </div>
  );
}

export { BottomSheet };
export type { BottomSheetProps };
