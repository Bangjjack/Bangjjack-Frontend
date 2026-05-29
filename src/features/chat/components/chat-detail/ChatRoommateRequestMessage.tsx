import { useState } from "react";

import { CheckIcon, CircleErrorIcon } from "@/assets/icons";
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
import { cn } from "@/lib/cn";

type RequestProps = {
  type?: "request";
  isProcessing?: boolean;
  onAccept?: () => void;
  onReject?: () => void;
  requesterName: string;
};

type CancelProps = {
  type: "cancel";
  variant: "received" | "sent";
  partnerName: string;
  isResending?: boolean;
  onResend?: () => void;
  onViewProfile?: () => void;
};

export type ChatRoommateRequestMessageProps = RequestProps | CancelProps;

function ChatRoommateRequestMessage(props: ChatRoommateRequestMessageProps) {
  const [open, setOpen] = useState(false);

  if (props.type === "cancel") {
    const { variant, partnerName, isResending, onResend, onViewProfile } = props;
    const isSent = variant === "sent";

    return (
      <div
        className={cn(
          "flex w-55 flex-col items-start gap-300 overflow-hidden rounded-tl-2xl rounded-tr-2xl border border-border-disabled bg-bg-secondary px-500 py-400",
          isSent ? "rounded-bl-2xl" : "rounded-br-2xl",
        )}
      >
        <div className="flex items-center gap-100 overflow-hidden">
          <CircleErrorIcon className="size-3 shrink-0 text-neutral-400" />
          <span className="typo-title4 text-neutral-400">요청 취소됨</span>
        </div>

        <div className="flex flex-col items-start gap-100 whitespace-normal">
          <p className="wrap-break-word typo-button2 tracking-normal text-text-strong">
            {isSent ? `${partnerName} 님께` : `${partnerName} 님이`}
            <br />
            보낸 요청을 취소했어요
          </p>
          <p className="typo-caption2 text-text-caption">
            {isSent ? "언제든 다시 요청을 보낼 수 있어요" : "수락 또는 거절이 어려워요"}
          </p>
        </div>

        <Button
          className="h-9 w-full cursor-pointer rounded-medium"
          disabled={isSent && isResending}
          onClick={isSent ? onResend : onViewProfile}
          size="sm"
          variant="black"
        >
          {isSent ? "다시 요청 보내기" : "프로필 보기"}
        </Button>
      </div>
    );
  }

  const { isProcessing = false, onAccept, onReject, requesterName } = props;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <div className="flex w-55 flex-col items-start justify-center gap-[12px] overflow-hidden rounded-tl-2xl rounded-tr-2xl rounded-br-2xl border border-brand-primary bg-bg-secondary px-[20px] py-[16px]">
        <div className="flex items-center gap-[4px] overflow-hidden">
          <CheckIcon className="size-[12px] shrink-0 text-brand-primary [&_path]:stroke-current" />
          <span className="whitespace-nowrap text-[12px] font-semibold leading-3.75 tracking-[-0.005em] text-brand-primary">
            룸메이트 요청
          </span>
        </div>

        <div className="flex flex-col items-start gap-100 whitespace-normal">
          <p className="wrap-break-word typo-button2 tracking-normal text-text-strong">
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
            수락 시 룸메이트 매칭이 확정돼요
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
