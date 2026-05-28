import { useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  Button,
  toast,
} from "@/components/ui";
import { usePostMatchRate } from "@/features/board/hooks";
import { ChecklistRequiredDialog } from "@/features/onboarding/components";
import { MatchAlertDialog } from "@/features/board/components/roommate/MatchAlertDialog";
import { useAuthStore } from "@/stores/authStore";
import { useCreateChatRoom } from "@/features/chat";
import type { ChatDetail } from "@/features/chat";
import { parseDisplayName } from "@/lib/parseDisplayName";

type DialogTarget = "match" | null;

type MatchActionBarProps = {
  disabledMessage?: string;
  leadingElement?: ReactNode;
  matchHighlights: string[];
  matchRate: number;
  postId: number;
  targetUserId: number;
  targetUsername: string;
  targetProfileImage?: string | null;
  onMatchConfirm: () => void;
};

function MatchActionBar({
  disabledMessage,
  leadingElement,
  matchHighlights,
  matchRate,
  postId,
  targetUserId,
  targetUsername,
  targetProfileImage,
  onMatchConfirm,
}: MatchActionBarProps) {
  const isDisabled = !!disabledMessage;
  const isOnboardingCompleted = useAuthStore((state) => state.isOnboardingCompleted);
  const navigate = useNavigate();

  const [dialogTarget, setDialogTarget] = useState<DialogTarget>(null);
  const [showChecklistDialog, setShowChecklistDialog] = useState(false);
  const [apiMatchData, setApiMatchData] = useState<{
    matchRate: number;
    matchHighlights: string[];
  } | null>(null);

  const { refetch, isFetching } = usePostMatchRate(postId);
  const { mutate: createChatRoom, isPending: isCreatingChatRoom } = useCreateChatRoom();

  const currentMatchData = apiMatchData ?? { matchRate, matchHighlights };

  async function handleMatchClick() {
    if (!isOnboardingCompleted) {
      setShowChecklistDialog(true);
      return;
    }
    const result = await refetch();
    if (result.isError) {
      toast.error("매칭에 실패했어요");
      return;
    }
    if (result.data) {
      setApiMatchData({
        matchRate: result.data.matchRate,
        matchHighlights: result.data.topInfluentialFeatures.map((f) => f.label),
      });
    }
    setDialogTarget("match");
  }

  function handleChatClick() {
    if (!isOnboardingCompleted) {
      setShowChecklistDialog(true);
      return;
    }
    createChatRoom(
      { targetUserId },
      {
        onError: () => {
          toast.error("채팅방을 생성하지 못했어요.");
        },
        onSuccess: (chatRoom) => {
          const chatDetail: ChatDetail = {
            dateLabel: "",
            id: targetUserId,
            matchRate: currentMatchData.matchRate,
            messages: [],
            nickname: parseDisplayName(targetUsername),
            profileImage: targetProfileImage,
            profileSummary: currentMatchData.matchHighlights,
            recruitPostId: postId,
            startSource: "recruit_post",
          };

          navigate(`/chat/${chatRoom.roomId}`, {
            state: {
              chatDetail,
              chatRoom,
            },
          });
        },
      },
    );
  }

  function handleConfirm() {
    setDialogTarget(null);
    onMatchConfirm();
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
            <Button className="flex-1" disabled={isCreatingChatRoom} onClick={handleChatClick}>
              채팅하기
            </Button>
          </>
        )}
      </div>

      <ChecklistRequiredDialog
        open={showChecklistDialog}
        onOpenChange={setShowChecklistDialog}
        onConfirm={() => {
          setShowChecklistDialog(false);
          navigate("/mypage/profile");
        }}
      />

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
