import { useNavigate, useParams } from "react-router";

import { CheckIcon } from "@/assets/icons";
import { Button } from "@/components/ui";
import type { ChatDetail } from "@/features/chat/types";
import { cn } from "@/lib/cn";

export type ChatRoommateAcceptMessageProps = {
  chatDetail: ChatDetail;
  partnerName: string;
  variant: "received" | "sent";
};

function ChatRoommateAcceptMessage({
  chatDetail,
  partnerName,
  variant,
}: ChatRoommateAcceptMessageProps) {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const isSent = variant === "sent";
  const sharedLifeGuidePath = chatId ? `/chat/${chatId}/shared-life-guide` : "/chat";

  return (
    <div
      className={cn(
        "flex w-55 flex-col overflow-hidden rounded-tl-2xl rounded-tr-2xl bg-brand-primary",
        isSent ? "rounded-bl-2xl" : "rounded-br-2xl",
      )}
    >
      <div className="flex flex-col gap-300 px-500 pb-400 pt-400">
        <div className="flex items-center gap-100 overflow-hidden">
          <CheckIcon className="size-3 shrink-0 text-text-on-primary [&_path]:stroke-current" />
          <span className="typo-title4 text-text-on-primary">매칭 확정</span>
        </div>

        <p className="typo-title3 whitespace-pre-line text-text-on-primary">
          {partnerName} 님과{"\n"}룸메이트가 되었어요!
        </p>
      </div>

      <div className="flex flex-col gap-300 bg-bg-secondary px-500 py-400">
        <p className="typo-caption2 text-text-caption">함께하는 새 출발을 응원해요</p>
        <Button
          className="h-9 w-full cursor-pointer rounded-medium"
          onClick={() => navigate(sharedLifeGuidePath, { state: { chatDetail } })}
          size="sm"
          variant="black"
        >
          공동 생활 가이드 보러가기
        </Button>
      </div>
    </div>
  );
}

export { ChatRoommateAcceptMessage };
