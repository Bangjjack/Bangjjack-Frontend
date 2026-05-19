import { useState } from "react";
import { BottomSheet, Button } from "@/components/ui";

type AiRecommendBottomSheetProps = {
  onConfirm: () => void;
  onClose: () => void;
};

function AiRecommendBottomSheet({ onConfirm, onClose }: AiRecommendBottomSheetProps) {
  const [confirming, setConfirming] = useState(false);

  return (
    <BottomSheet onClose={confirming ? onConfirm : onClose}>
      {(requestClose) => (
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
            <Button className="flex-1" size="sm" variant="neutral" onClick={requestClose}>
              확인
            </Button>
            <Button
              className="flex-1"
              size="sm"
              onClick={() => {
                setConfirming(true);
                requestClose();
              }}
            >
              AI 추천 보기
            </Button>
          </div>
        </div>
      )}
    </BottomSheet>
  );
}

export { AiRecommendBottomSheet };
