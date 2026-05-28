import { useNavigate } from "react-router";

import { CircleErrorIcon } from "@/assets/icons";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";

export type ChatRoommateRejectMessageProps = {
  partnerName: string;
  variant: "received" | "sent";
};

function ChatRoommateRejectMessage({ partnerName, variant }: ChatRoommateRejectMessageProps) {
  const navigate = useNavigate();
  const isSent = variant === "sent";

  return (
    <div
      className={cn(
        "flex w-55 flex-col overflow-hidden rounded-tl-2xl rounded-tr-2xl bg-neutral-700",
        isSent ? "rounded-bl-2xl" : "rounded-br-2xl",
      )}
    >
      <div className="flex flex-col gap-300 px-500 pb-400 pt-400">
        <div className="flex items-center gap-100 overflow-hidden">
          <CircleErrorIcon className="size-3 shrink-0" />
          <span className="typo-title4 text-neutral-200">
            {isSent ? "룸메이트 매칭 실패" : "룸메이트 요청 거절"}
          </span>
        </div>

        <p className="typo-title3 whitespace-pre-line text-text-on-primary">
          {partnerName} 님{isSent ? "의" : "이"}
          {"\n"}요청을 거절했어요
        </p>
      </div>

      <div className="flex flex-col gap-300 bg-bg-secondary px-500 py-400">
        <p className="typo-caption2 text-text-caption">다른 룸메이트를 찾아볼까요?</p>
        <Button
          className="h-9 w-full cursor-pointer rounded-medium"
          onClick={() => navigate("/home")}
          size="sm"
          variant="black"
        >
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
}

export { ChatRoommateRejectMessage };
