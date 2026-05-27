import { useState } from "react";

import { CheckIcon } from "@/assets/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogIcon,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@/components/ui";

export type ChatRoommateRequestMessageProps = {
  onAccept?: () => void;
  onReject?: () => void;
  isProcessing?: boolean;
  requesterName: string;
};

function ChatRoommateRequestMessage({
  isProcessing = false,
  onAccept,
  onReject,
  requesterName,
}: ChatRoommateRequestMessageProps) {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <div className="flex w-55 flex-col items-start justify-center gap-[12px] overflow-hidden rounded-tl-2xl rounded-tr-2xl rounded-br-2xl border border-brand-primary bg-bg-secondary px-[20px] py-[16px]">
        <div className="flex items-center gap-[4px] overflow-hidden">
          <CheckIcon className="size-[12px] shrink-0 text-brand-primary [&_path]:stroke-current" />
          <span className="whitespace-nowrap text-[12px] font-semibold leading-3.75 tracking-[-0.005em] text-brand-primary">
            룸메이트 요청
          </span>
        </div>

        <div className="flex flex-col items-start gap-[4px] whitespace-normal">
          <p className="wrap-break-word text-[14px] font-semibold leading-[20px] tracking-normal text-text-strong">
            {requesterName} 님이
            <br />
            룸메이트를 제안했어요!
          </p>
          <p className="text-[12px] font-medium leading-[16px] tracking-[-0.005em] text-text-caption">
            수락하면 룸메이트를 확정할 수 있어요
          </p>
        </div>

        <AlertDialogTrigger asChild>
          <Button className="h-9 w-full cursor-pointer rounded-[12px] px-[16px] py-[8px]" size="sm">
            확인하기
          </Button>
        </AlertDialogTrigger>
      </div>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogIcon />
          <AlertDialogTitle>룸메이트 요청을 수락할까요?</AlertDialogTitle>
          <AlertDialogDescription className="whitespace-normal break-keep text-center">
            수락 시 룸메이트 매칭이 확정됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-500">
          <AlertDialogCancel className="cursor-pointer" disabled={isProcessing} onClick={onReject}>
            거절하기
          </AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer" disabled={isProcessing} onClick={onAccept}>
            수락하기
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { ChatRoommateRequestMessage };
