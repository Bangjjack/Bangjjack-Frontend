import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";

import { BookmarkFilledIcon, BookmarkIcon } from "@/assets/icons";
import { Button, Card, Header } from "@/components/ui";
import { ChecklistCard } from "@/features/roommate/components";
import { useBookmarkToggle, usePostDetail } from "@/features/board/hooks";
import { computeChecklistMatchStats, mapLifestyleChecklistToEntries } from "@/features/board/utils";
import { useGoBack } from "@/hooks";

import { MatchActionBar } from "./MatchActionBar";
import { RoommateList } from "./RoommateList";

function RoommateListContent() {
  const { id } = useParams();
  const postId = Number(id);
  const navigate = useNavigate();
  const handleBackClick = useGoBack();

  const [searchParams] = useSearchParams();
  const { data: post, isLoading, isError } = usePostDetail(postId);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(() => {
    const userId = searchParams.get("userId");
    const parsed = Number(userId);
    return userId && Number.isInteger(parsed) ? parsed : null;
  });
  const { isBookmarked, isOwner, toggle } = useBookmarkToggle(postId);

  if (!id || isNaN(postId)) {
    return (
      <div className="flex h-dvh items-center justify-center bg-bg-primary">
        <span className="typo-body2 text-text-caption">잘못된 접근입니다.</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-dvh items-center justify-center bg-bg-primary">
        <span className="typo-body2 text-text-caption">로딩 중...</span>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="flex h-dvh items-center justify-center bg-bg-primary">
        <span className="typo-body2 text-text-caption">정보를 불러올 수 없습니다.</span>
      </div>
    );
  }

  const effectiveUserId = selectedUserId ?? post.members[0]?.userId ?? null;
  const selectedPostMember = post.members.find((m) => m.userId === effectiveUserId) ?? null;

  const members = post.members.map((m) => ({
    nickname: m.username,
    seed: m.userId,
    isHost: m.role === "LEADER",
  }));
  const selectedMember = members.find((m) => m.seed === effectiveUserId) ?? null;

  const checklist = selectedPostMember
    ? mapLifestyleChecklistToEntries(selectedPostMember.lifestyleChecklist)
    : [];

  const { matchRate, matchHighlights } = selectedPostMember
    ? computeChecklistMatchStats(selectedPostMember.lifestyleChecklist)
    : { matchRate: 0, matchHighlights: [] };

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-bg-primary">
      <Header showBack title="룸메이트 목록" onBackClick={handleBackClick} />

      <main className="scrollbar-none min-h-0 flex-1 overflow-y-auto pb-[100px]">
        <div className="flex flex-col gap-300 px-400">
          <Card className="gap-0 rounded-medium border-0 bg-bg-secondary px-450 py-600 shadow-none">
            <div className="flex flex-col gap-300">
              <div className="flex flex-col gap-[2px]">
                <h2 className="typo-title1 text-text-strong">룸메이트 목록</h2>
                <span className="typo-caption2 text-text-caption">
                  프로필을 선택하면 체크리스트를 확인할 수 있어요
                </span>
              </div>

              <RoommateList
                members={members}
                selectedNickname={selectedMember?.nickname}
                onMemberClick={(member) => {
                  setSelectedUserId(member.seed);
                }}
              />
            </div>
          </Card>

          {selectedMember && checklist.length > 0 && (
            <ChecklistCard
              items={checklist}
              nickname={selectedMember.nickname}
              hideMatchStatus={isOwner}
            />
          )}
        </div>
      </main>

      {isOwner ? (
        <div className="absolute inset-x-0 bottom-0 z-40 flex items-center gap-[10px] bg-bg-primary px-400 pb-9 pt-300">
          <Button className="flex-1" onClick={() => navigate("/chat")}>
            채팅 확인하기
          </Button>
        </div>
      ) : (
        <MatchActionBar
          postId={postId}
          leadingElement={
            <button
              type="button"
              aria-label={isBookmarked ? "북마크 해제" : "북마크"}
              className="flex size-[30px] shrink-0 items-center justify-center"
              onClick={toggle}
            >
              {isBookmarked ? (
                <BookmarkFilledIcon className="size-[30px] text-brand-primary" />
              ) : (
                <BookmarkIcon className="size-[30px]" />
              )}
            </button>
          }
          matchRate={matchRate}
          matchHighlights={matchHighlights}
          onMatchConfirm={() => navigate(`/posts/${postId}/matching-report`)}
          onChatConfirm={() => navigate("/chat")}
        />
      )}
    </div>
  );
}

export { RoommateListContent };
