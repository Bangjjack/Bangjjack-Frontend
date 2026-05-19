import { useState } from "react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";

type AiRecommendBottomSheetProps = {
  onConfirm: () => void;
  onClose: () => void;
};

function AiRecommendBottomSheet({ onConfirm, onClose }: AiRecommendBottomSheetProps) {
  const [closeAction, setCloseAction] = useState<"close" | "confirm" | null>(null);
  const isClosing = closeAction !== null;

  const handleClose = () => {
    if (isClosing) return;
    setCloseAction("close");
  };

  const handleConfirm = () => {
    if (isClosing) return;
    setCloseAction("confirm");
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-end bg-bg-overlay",
        isClosing ? "animate-overlay-fade-out" : "animate-overlay-fade-in",
      )}
    >
      <button aria-label="닫기" className="absolute inset-0" onClick={handleClose} type="button" />
      <div
        className={cn(
          "relative z-10 mx-auto flex w-full max-w-(--width-app-shell) flex-col gap-7.5 rounded-t-[20px] bg-white px-500 pb-500 pt-500",
          isClosing ? "animate-bottom-sheet-down" : "animate-bottom-sheet-up",
        )}
        onAnimationEnd={() => {
          if (closeAction === "confirm") {
            onConfirm();
            return;
          }
          if (closeAction === "close") {
            onClose();
          }
        }}
      >
        <div className="mx-auto h-1 w-[30px] rounded-full bg-neutral-300" />
        <div className="flex flex-col gap-400">
          <div className="flex flex-col gap-400">
            <div className="flex items-center gap-200">
              <span className="rounded-full bg-brand-primary px-300 py-[4px] typo-button2 text-text-on-primary">
                AI
              </span>
              <h2 className="typo-h4 text-text-strong">추천 룸메이트 찾기</h2>
            </div>
            <p className="typo-caption1 text-text-placeholder">
              내 생활 습관을 기반으로 룸메이트를 추천받을 수 있어요
              <br />
              <span className="text-brand-primary">AI 매칭</span>으로 잘 맞는 룸메이트를 찾아보세요
            </p>
          </div>
          <div className="flex gap-200">
            <Button className="flex-1" size="sm" variant="neutral" onClick={handleClose}>
              확인
            </Button>
            <Button className="flex-1" size="sm" onClick={handleConfirm}>
              AI 추천 보기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AiRecommendBottomSheet };
