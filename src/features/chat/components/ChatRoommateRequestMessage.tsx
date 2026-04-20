import { CheckIcon } from "@/assets/icons";
import { Button } from "@/components/ui";

export type ChatRoommateRequestMessageProps = {
  onConfirm?: () => void;
  requesterName: string;
};

function ChatRoommateRequestMessage({ onConfirm, requesterName }: ChatRoommateRequestMessageProps) {
  return (
    <div className="flex max-w-60 flex-col justify-center gap-300 overflow-hidden rounded-tl-2xl rounded-tr-2xl rounded-br-2xl border border-brand-primary bg-bg-secondary px-600 py-400">
      <div className="flex items-center gap-100">
        <CheckIcon className="size-3 text-brand-primary [&_path]:stroke-current" />
        <span className="typo-title4 text-text-primary-alternative">룸메이트 요청</span>
      </div>

      <div className="flex flex-col gap-100">
        <p className="typo-title3 whitespace-pre-line text-text-strong">
          {requesterName} 님이{"\n"}룸메이트를 제안했어요!
        </p>
        <p className="typo-caption2 text-text-caption">수락하면 룸메이트를 확정할 수 있어요</p>
      </div>

      <Button className="w-full rounded-medium cursor-pointer" onClick={onConfirm} size="sm">
        확인하기
      </Button>
    </div>
  );
}

export { ChatRoommateRequestMessage };
