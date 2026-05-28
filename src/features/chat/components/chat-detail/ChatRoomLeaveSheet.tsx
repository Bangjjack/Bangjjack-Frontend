import { useRef } from "react";

import { CircleAlertIcon } from "@/assets/icons";
import { BottomSheet, BottomSheetClose, BottomSheetContent, Button } from "@/components/ui";

export type ChatRoomLeaveSheetProps = {
  confirmDisabled?: boolean;
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

function ChatRoomLeaveSheet({
  confirmDisabled = false,
  open,
  onCancel,
  onConfirm,
}: ChatRoomLeaveSheetProps) {
  const confirmedRef = useRef(false);

  return (
    <BottomSheet
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          const wasConfirmed = confirmedRef.current;
          confirmedRef.current = false;
          if (wasConfirmed) onConfirm();
          else onCancel();
        }
      }}
    >
      <BottomSheetContent variant="chatRoomOut">
        <div className="flex flex-col items-center gap-600 pb-100">
          <div className="flex flex-col items-center gap-400 text-center">
            <h2 className="typo-h4 text-text-strong">채팅방을 나가시겠어요?</h2>
            <p className="typo-caption1 text-text-caption">
              지금까지의 대화 내역을 다시 확인하기 어려워요.
            </p>
          </div>

          <div className="flex w-full items-center gap-300 rounded-2xl bg-state-error-light px-400 py-300 text-state-error">
            <CircleAlertIcon className="size-6 shrink-0 [&_path]:stroke-current" />
            <p className="typo-caption1 break-keep">
              나가기 전 중요한 정보(연락처, 입사일 등)는 따로 저장해주세요.
            </p>
          </div>

          <div className="flex w-full gap-200">
            <BottomSheetClose asChild>
              <Button
                className="h-9 flex-1 cursor-pointer rounded-medium"
                size="sm"
                variant="neutral"
              >
                취소
              </Button>
            </BottomSheetClose>
            <BottomSheetClose asChild>
              <Button
                className="h-9 flex-1 cursor-pointer rounded-medium bg-state-error text-text-on-primary hover:brightness-95 active:bg-state-error-strong"
                disabled={confirmDisabled}
                size="sm"
                onClick={() => {
                  confirmedRef.current = true;
                }}
              >
                나가기
              </Button>
            </BottomSheetClose>
          </div>
        </div>
      </BottomSheetContent>
    </BottomSheet>
  );
}

export { ChatRoomLeaveSheet };
