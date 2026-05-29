import { useNavigate } from "react-router";

import { Button, Card, Header, toast } from "@/components/ui";
import { useMatchReport, usePostMatchRate } from "@/features/board/hooks";
import {
  AiCommentCard,
  MatchedItemsCard,
  MismatchedItemsCard,
  MatchRateCard,
} from "@/features/roommate/components";
import { useCreateChatRoom } from "@/features/chat";
import type { ChatDetail } from "@/features/chat";
import { useGoBack } from "@/hooks";
import { parseDisplayName } from "@/lib/parseDisplayName";

type MatchingReportContentProps = {
  postId?: number;
  roommateId?: number;
  targetUserId?: number;
  targetUsername?: string;
  targetProfileImage?: string | null;
};

function MatchingReportContent({
  postId,
  roommateId,
  targetUserId,
  targetUsername,
  targetProfileImage,
}: MatchingReportContentProps) {
  const goBack = useGoBack();
  const navigate = useNavigate();
  const { mutate: createChatRoom, isPending: isCreatingChatRoom } = useCreateChatRoom();

  const {
    data: postData,
    isLoading: isPostLoading,
    isError: isPostError,
    refetch: refetchPost,
  } = usePostMatchRate(postId ?? 0, !!postId);

  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
    refetch: refetchUser,
  } = useMatchReport(roommateId ?? 0, !postId && !!roommateId);

  const data = postData ?? userData;
  const isLoading = isPostLoading || isUserLoading;
  const isError = isPostError || isUserError;
  function refetch() {
    if (postId) refetchPost();
    else refetchUser();
  }

  const effectiveTargetUserId = targetUserId ?? roommateId;

  function handleMatchClick() {
    if (!effectiveTargetUserId) return;

    createChatRoom(
      { targetUserId: effectiveTargetUserId },
      {
        onError: () => {
          toast.error("채팅방을 생성하지 못했어요.");
        },
        onSuccess: (chatRoom) => {
          const chatDetail: ChatDetail = {
            dateLabel: "",
            id: effectiveTargetUserId,
            matchRate: data?.matchRate ?? 0,
            messages: [],
            nickname: parseDisplayName(targetUsername ?? ""),
            profileImage: targetProfileImage,
            profileSummary: data?.topInfluentialFeatures?.map((f) => f.label) ?? [],
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

  return (
    <div className="relative flex h-dvh flex-col bg-bg-primary">
      <Header className="shrink-0" title="AI 매칭 리포트" showBack onBackClick={goBack} />

      <main className="scrollbar-none min-h-0 flex-1 overflow-y-auto">
        {isLoading && (
          <div className="flex h-full items-center justify-center">
            <div className="size-10 animate-spin rounded-full border-4 border-text-disabled border-t-brand-primary" />
          </div>
        )}

        {isError && (
          <div className="flex h-full flex-col items-center justify-center gap-3">
            <p className="typo-body2 text-text-caption">매칭 리포트를 불러오지 못했어요</p>
            <Button variant="ghost" size="sm" onClick={() => refetch()}>
              다시 시도하기
            </Button>
          </div>
        )}

        {data && (
          <div className="flex flex-col gap-300 px-400 py-300 pb-[100px]">
            <MatchRateCard
              matchRate={data.matchRate}
              matchCount={data.counts.matched}
              mismatchCount={data.counts.mismatched}
              totalCount={data.counts.total}
              summary={data.summaryComment.brief}
            />

            {data.matchedFeatures.length > 0 && (
              <MatchedItemsCard
                items={data.matchedFeatures.map((f) => ({
                  id: f.key,
                  label: f.label,
                  description: f.description,
                }))}
              />
            )}

            {data.mismatchedFeatures.length > 0 && (
              <MismatchedItemsCard items={data.mismatchedFeatures} />
            )}

            {data.conversationStarters.length > 0 && (
              <Card className="gap-[10px] rounded-medium border-0 bg-bg-secondary px-400 py-400 shadow-none">
                <h3 className="typo-title2 text-text-strong">대화 추천 주제</h3>
                <div className="flex flex-col gap-[10px]">
                  {data.conversationStarters.map((item) => (
                    <div
                      key={item.key}
                      className="flex flex-col gap-[4px] rounded-small bg-neutral-100 p-300"
                    >
                      <p className="typo-caption2 text-text-caption">{item.starter}</p>
                      <p className="typo-title3 text-text-strong">{item.subtitle}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <AiCommentCard>
              <div className="flex flex-col gap-200">
                <p className="typo-caption1 whitespace-pre-line text-text-normal">
                  {data.summaryComment.positive}
                </p>
                {data.summaryComment.caution && (
                  <p className="typo-caption1 whitespace-pre-line text-text-normal">
                    {data.summaryComment.caution}
                  </p>
                )}
              </div>
            </AiCommentCard>
          </div>
        )}
      </main>

      {/* 하단 버튼 */}
      <div className="absolute inset-x-0 bottom-0 z-40 bg-bg-primary px-400 pb-9 pt-300">
        <Button
          className="w-full"
          disabled={!effectiveTargetUserId || isCreatingChatRoom}
          onClick={handleMatchClick}
        >
          매칭하기
        </Button>
      </div>
    </div>
  );
}

export { MatchingReportContent };
export type { MatchingReportContentProps };
