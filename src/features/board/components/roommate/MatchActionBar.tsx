import { useState } from "react";
import type { ReactNode } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  Button,
  toast,
} from "@/components/ui";
import { usePostMatchRate } from "@/features/board/hooks";
import { MatchAlertDialog } from "@/features/board/components/roommate/MatchAlertDialog";

type DialogTarget = "match" | "chat" | null;

type MatchActionBarProps = {
  disabledMessage?: string;
  leadingElement?: ReactNode;
  matchHighlights: string[];
  matchRate: number;
  postId: number;
  onChatConfirm: () => void;
  onMatchConfirm: () => void;
};

function MatchActionBar({
  disabledMessage,
  leadingElement,
  matchHighlights,
  matchRate,
  postId,
  onChatConfirm,
  onMatchConfirm,
}: MatchActionBarProps) {
  const isDisabled = !!disabledMessage;

  const [dialogTarget, setDialogTarget] = useState<DialogTarget>(null);
  const [apiMatchData, setApiMatchData] = useState<{
    matchRate: number;
    matchHighlights: string[];
  } | null>(null);

  const { refetch, isFetching } = usePostMatchRate(postId);

  const currentMatchData = apiMatchData ?? { matchRate, matchHighlights };

  async function handleMatchClick() {
    const result = await refetch();
    if (result.isError) {
      toast.error("매칭률 정보를 불러오지 못했어요");
      return;
    }
    if (result.data) {
      setApiMatchData({
        matchRate: result.data.matchRate,
        matchHighlights: result.data.matchedAttributes,
      });
    }
    setDialogTarget("match");
  }

  function handleConfirm() {
    setDialogTarget(null);
    if (dialogTarget === "match") onMatchConfirm();
    else onChatConfirm();
  }

  return (
    <>
      <AlertDialog open={isFetching}>
        <AlertDialogContent className="flex flex-col items-center gap-400 py-8">
          <div className="size-10 animate-spin rounded-full border-4 border-text-disabled border-t-brand-primary" />
          <AlertDialogDescription>매칭을 시도 중이에요</AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>

      <div className="absolute inset-x-0 bottom-0 z-40 flex items-center gap-[10px] bg-bg-primary px-400 pb-9 pt-300">
        {leadingElement}
        {isDisabled ? (
          <Button className="flex-1" disabled>
            {disabledMessage}
          </Button>
        ) : (
          <>
            <Button
              className="flex-1"
              variant="ghost"
              disabled={isFetching}
              onClick={handleMatchClick}
            >
              매칭하기
            </Button>
            <Button className="flex-1" onClick={() => setDialogTarget("chat")}>
              채팅하기
            </Button>
          </>
        )}
      </div>

      <MatchAlertDialog
        open={dialogTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDialogTarget(null);
        }}
        matchRate={currentMatchData.matchRate}
        matchHighlights={currentMatchData.matchHighlights}
        onConfirm={handleConfirm}
      />
    </>
  );
}

export { MatchActionBar };
export type { MatchActionBarProps };
