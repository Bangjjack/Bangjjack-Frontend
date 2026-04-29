import { useState } from "react";
import { useNavigate } from "react-router";

import { BookmarkFilledIcon, BookmarkIcon } from "@/assets/icons";
import { Button, Card, Header } from "@/components/ui";
import { ChecklistCard } from "@/features/roommate/components";
import { useGoBack } from "@/hooks/useGoBack";

import { MatchAlertDialog } from "./MatchAlertDialog";
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
const MOCK_CHECKLISTS: Record<string, ChecklistEntry[]> = {
  무구정광대다라니경: [
    { id: "sleep-time", label: "취침 시간", value: "24~2시" },
    { id: "wake-time", label: "기상 시간", value: "불규칙" },
    { id: "cleaning", label: "청소 주기", value: "주 1~2회", isMatched: false },
    { id: "sleep-habit", label: "잠버릇", value: "없음", isMatched: false },
    { id: "call-habit", label: "통화 습관", value: "소곤소곤" },
    { id: "smoking", label: "흡연", value: "24~2시" },
    { id: "stay-time", label: "기숙사 체류 시간", value: "절반 정도" },
    { id: "temperature", label: "온도 민감도", value: "더위를 잘 탐" },
  ],
};

const MOCK_MATCH = {
  matchRate: 92,
  matchDetails: "청소 빈도, 흡연 여부",
};

function RoommateListContent() {
  const navigate = useNavigate();
  const handleBackClick = useGoBack();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(MOCK_MEMBERS[0] ?? null);

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

      {/* Fixed bottom bar */}
      <div className="absolute inset-x-0 bottom-0 z-40 flex items-center gap-[10px] bg-bg-primary px-400 pb-9 pt-300">
        <button
          type="button"
          aria-label={isBookmarked ? "북마크 해제" : "북마크"}
          className="flex size-[30px] shrink-0 items-center justify-center"
          onClick={() => setIsBookmarked((prev) => !prev)}
        >
          {isBookmarked ? (
            <BookmarkFilledIcon className="size-[30px]" />
          ) : (
            <BookmarkIcon className="size-[30px]" />
          )}
        </button>
        <MatchAlertDialog
          matchRate={MOCK_MATCH.matchRate}
          matchDetails={MOCK_MATCH.matchDetails}
          onConfirm={() => navigate("/chat")}
        >
          <Button className="flex-1" variant="ghost">
            매칭하기
          </Button>
        </MatchAlertDialog>
        <MatchAlertDialog
          matchRate={MOCK_MATCH.matchRate}
          matchDetails={MOCK_MATCH.matchDetails}
          onConfirm={() => navigate("/chat")}
        >
          <Button className="flex-1">채팅하기</Button>
        </MatchAlertDialog>
      </div>
    </div>
  );
}

export { RoommateListContent };
