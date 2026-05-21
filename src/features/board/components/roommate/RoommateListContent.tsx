import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import { BookmarkFilledIcon, BookmarkIcon } from "@/assets/icons";
import { Card, Header } from "@/components/ui";
import { LIFESTYLE_MULTI_QUESTIONS, LIFESTYLE_SINGLE_QUESTIONS } from "@/constants";
import { ChecklistCard } from "@/features/roommate/components";
import { useBookmarkToggle } from "@/features/board/hooks";
import { useGoBack } from "@/hooks";

import { MatchActionBar } from "./MatchActionBar";
import { RoommateList } from "./RoommateList";

import type { Member } from "./RoommateList";
import type { ChecklistEntry } from "@/features/roommate/components";

// TODO: API 연동 시 제거
const MOCK_MEMBERS: Member[] = [
  { nickname: "무구정광대다라니경", seed: 1, isHost: true },
  { nickname: "햄무라비법전", seed: 2 },
  { nickname: "직지심체요절", seed: 3 },
];

// TODO: API 연동 시 제거
const MOCK_CHECKLIST_VALUES: Record<string, string> = {
  sleepTime: "24~2시",
  wakeUpTime: "불규칙",
  cleaningCycle: "주 1~2회",
  sleepingHabit: "없음",
  callHabit: "소곤소곤",
  smoking: "비흡연",
  dormStayDuration: "절반 정도",
  indoorTemperature: "더위 잘 탐",
  noiseSensitivity: "보통",
};

const MOCK_MATCHED_KEYS = new Set([
  "sleepTime",
  "wakeUpTime",
  "callHabit",
  "smoking",
  "dormStayDuration",
]);

function buildMockChecklist(): ChecklistEntry[] {
  const entries: ChecklistEntry[] = [];

  for (const q of LIFESTYLE_SINGLE_QUESTIONS) {
    const value = MOCK_CHECKLIST_VALUES[q.key];
    if (value) {
      entries.push({
        id: q.key,
        label: q.label,
        value,
        isMatched: MOCK_MATCHED_KEYS.has(q.key) ? undefined : false,
      });
    }
  }

  for (const q of LIFESTYLE_MULTI_QUESTIONS) {
    const value = MOCK_CHECKLIST_VALUES[q.key];
    if (value) {
      entries.push({
        id: q.key,
        label: q.label,
        value,
        isMatched: MOCK_MATCHED_KEYS.has(q.key) ? undefined : false,
      });
    }
  }

  return entries;
}

const MOCK_CHECKLISTS: Record<string, ChecklistEntry[]> = {
  무구정광대다라니경: buildMockChecklist(),
};

const MOCK_MATCH = {
  matchRate: 92,
  matchHighlights: ["청소 빈도", "흡연 여부"],
};

function RoommateListContent() {
  const { id } = useParams();
  const postId = Number(id);
  const navigate = useNavigate();
  const handleBackClick = useGoBack();
  const [selectedMember, setSelectedMember] = useState<Member | null>(MOCK_MEMBERS[0] ?? null);

  const { isBookmarked, isOwner, toggle } = useBookmarkToggle(postId);

  const checklist = selectedMember ? (MOCK_CHECKLISTS[selectedMember.nickname] ?? []) : [];

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-bg-primary">
      <Header showBack title="룸메이트 목록" onBackClick={handleBackClick} />

      <main className="scrollbar-none min-h-0 flex-1 overflow-y-auto pb-[100px]">
        <div className="flex flex-col gap-300 px-400">
          {/* 룸메이트 목록 카드 */}
          <Card className="gap-0 rounded-medium border-0 bg-bg-secondary px-450 py-600 shadow-none">
            <div className="flex flex-col gap-300">
              <div className="flex flex-col gap-[2px]">
                <h2 className="typo-title1 text-text-strong">룸메이트 목록</h2>
                <span className="typo-caption2 text-text-caption">
                  프로필을 선택하면 체크리스트를 확인할 수 있어요
                </span>
              </div>

              <RoommateList
                members={MOCK_MEMBERS}
                selectedNickname={selectedMember?.nickname}
                onMemberClick={setSelectedMember}
              />
            </div>
          </Card>

          {/* 체크리스트 카드 */}
          {selectedMember && checklist.length > 0 && (
            <ChecklistCard items={checklist} nickname={selectedMember.nickname} />
          )}
        </div>
      </main>

      <MatchActionBar
        leadingElement={
          !isOwner ? (
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
          ) : undefined
        }
        matchRate={MOCK_MATCH.matchRate}
        matchHighlights={MOCK_MATCH.matchHighlights}
        onMatchConfirm={() => navigate(`/posts/${postId}/matching-report`)}
        onChatConfirm={() => navigate("/chat")}
      />
    </div>
  );
}

export { RoommateListContent };
