import { useRef } from "react";

import { BottomSheet, BottomSheetClose, BottomSheetContent, Button } from "@/components/ui";

type AiRecommendBottomSheetProps = {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

function AiRecommendBottomSheet({ open, onConfirm, onClose }: AiRecommendBottomSheetProps) {
  const confirmedRef = useRef(false);

  return (
    <BottomSheet
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          const wasConfirmed = confirmedRef.current;
          confirmedRef.current = false;
          if (wasConfirmed) onConfirm();
          else onClose();
        }
      }}
    >
      <BottomSheetContent>
        <div className="flex flex-col gap-600 pb-300">
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
            <BottomSheetClose asChild>
              <Button className="flex-1" size="sm" variant="neutral">
                확인
              </Button>
            </BottomSheetClose>
            <BottomSheetClose asChild>
              <Button
                className="flex-1"
                size="sm"
                onClick={() => {
                  confirmedRef.current = true;
                }}
              >
                AI 추천 보기
              </Button>
            </BottomSheetClose>
          </div>
        </div>
      </BottomSheetContent>
    </BottomSheet>
  );
}

export { AiRecommendBottomSheet };
