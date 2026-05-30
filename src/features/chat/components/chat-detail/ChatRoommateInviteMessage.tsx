import { CheckIcon } from "@/assets/icons";
import { Button } from "@/components/ui";

export interface ChatRoommateInviteMessageProps {
  disabled?: boolean;
  onCancel?: () => void;
  recipientName?: string;
}

function ChatRoommateInviteMessage({
  disabled,
  onCancel,
  recipientName,
}: ChatRoommateInviteMessageProps) {
  return (
    <div className="flex max-w-56.25 flex-col justify-center gap-300 overflow-hidden rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl border border-brand-primary bg-bg-secondary px-600 py-400">
      <div className="flex items-center gap-100 overflow-hidden">
        <CheckIcon className="size-3 shrink-0 text-brand-primary [&_path]:stroke-current" />
        <span className="typo-title4 text-text-primary-alternative">룸메이트 요청</span>
      </div>

      <div className="flex w-full flex-col gap-100">
        <p className="typo-title3 whitespace-pre-line text-text-strong">
          {recipientName} 님께{"\n"}룸메이트를 제안했어요!
        </p>
        <p className="typo-caption2 text-text-caption">요청이 수락되길 기다리고 있어요</p>
      </div>

      <Button
        className="h-9 w-full cursor-pointer rounded-medium"
        disabled={disabled}
        onClick={onCancel}
        size="sm"
      >
        요청 취소하기
      </Button>
    </div>
  );
}

export { ChatRoommateInviteMessage };
