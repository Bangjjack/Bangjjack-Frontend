import type { ReactNode } from "react";

import { Button } from "@/components/ui";
import { MatchAlertDialog } from "@/features/board/components/roommate/MatchAlertDialog";

type MatchActionBarProps = {
  disabledMessage?: string;
  leadingElement?: ReactNode;
  matchHighlights: string[];
  matchRate: number;
  onChatConfirm: () => void;
  onMatchConfirm: () => void;
};

function MatchActionBar({
  disabledMessage,
  leadingElement,
  matchHighlights,
  matchRate,
  onChatConfirm,
  onMatchConfirm,
}: MatchActionBarProps) {
  const isDisabled = !!disabledMessage;

  return (
    <div className="absolute inset-x-0 bottom-0 z-40 flex items-center gap-[10px] bg-bg-primary px-400 pb-9 pt-300">
      {leadingElement}
      {isDisabled ? (
        <Button className="flex-1" disabled>
          {disabledMessage}
        </Button>
      ) : (
        <>
          <MatchAlertDialog
            matchRate={matchRate}
            matchHighlights={matchHighlights}
            onConfirm={onMatchConfirm}
          >
            <Button className="flex-1" variant="ghost">
              매칭하기
            </Button>
          </MatchAlertDialog>
          <MatchAlertDialog
            matchRate={matchRate}
            matchHighlights={matchHighlights}
            onConfirm={onChatConfirm}
          >
            <Button className="flex-1">채팅하기</Button>
          </MatchAlertDialog>
        </>
      )}
    </div>
  );
}

export { MatchActionBar };
export type { MatchActionBarProps };
