import { WaveBackgroundIcon } from "@/assets/icons";
import { Header, ProfileAvatar, Tag } from "@/components/ui";
import { LIFESTYLE_MULTI_QUESTIONS, LIFESTYLE_SINGLE_QUESTIONS } from "@/constants";
import { MatchActionBar } from "@/features/board/components/roommate";
import type { ChatDetail } from "@/features/chat/types";
import { ChecklistCard, ImportanceSection } from "@/features/roommate/components";
import { useFadeInOnScroll, useGoBack } from "@/hooks";
import { useNavigate } from "react-router";

import type { ChecklistEntry } from "@/features/roommate/components";

type RoommateProfileContentProps = {
  profile?: ChatDetail;
  roommateId?: number;
};

// TODO: API 연동 시 제거
const MOCK_CHECKLIST_VALUES: Record<string, { value: string; isMatched: boolean }> = {
  sleepTime: { value: "24~2시", isMatched: true },
  wakeUpTime: { value: "불규칙", isMatched: true },
  sleepingHabit: { value: "없음", isMatched: false },
  cleaningCycle: { value: "거의 안 함", isMatched: false },
  dormStayDuration: { value: "대부분 기숙사 안에", isMatched: true },
  callHabit: { value: "소곤소곤", isMatched: true },
  indoorTemperature: { value: "둘 다 예민", isMatched: true },
  noiseSensitivity: { value: "보통", isMatched: true },
  smoking: { value: "비흡연", isMatched: true },
};

function buildMockChecklist(): ChecklistEntry[] {
  const entries: ChecklistEntry[] = [];

  for (const q of LIFESTYLE_SINGLE_QUESTIONS) {
    const entry = MOCK_CHECKLIST_VALUES[q.key];
    if (entry) {
      entries.push({ id: q.key, label: q.label, value: entry.value, isMatched: entry.isMatched });
    }
  }

  for (const q of LIFESTYLE_MULTI_QUESTIONS) {
    const entry = MOCK_CHECKLIST_VALUES[q.key];
    if (entry) {
      entries.push({ id: q.key, label: q.label, value: entry.value, isMatched: entry.isMatched });
    }
  }

  return entries;
}

const MOCK_PROFILE = {
  nickname: "무구정광대다라니경",
  age: 20,
  department: "컴퓨터공학과",
  tags: ["얼리버드", "집순이", "비흡연"],
  importanceItems: ["기상 시간", "흡연 여부", "취침 시간"],
  checklist: buildMockChecklist(),
};

function RoommateProfileContent({ profile, roommateId }: RoommateProfileContentProps) {
  const handleBackClick = useGoBack();
  const contentRef = useFadeInOnScroll<HTMLDivElement>();
  const navigate = useNavigate();
  const displayProfile = {
    ...MOCK_PROFILE,
    age: profile?.age ?? MOCK_PROFILE.age,
    department: profile?.department ?? MOCK_PROFILE.department,
    nickname: profile?.nickname ?? MOCK_PROFILE.nickname,
    tags: profile?.lifestyleTags ?? MOCK_PROFILE.tags,
  };
  const avatarSeed = profile?.id ?? displayProfile.nickname.length;

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-bg-primary">
      {/* Fixed header - transparent, overlays wave */}
      <Header
        className="absolute inset-x-0 top-0 z-20"
        showBack
        title="룸메이트 추천"
        onBackClick={handleBackClick}
      />

      {/* Scrollable content */}
      <main className="scrollbar-none min-h-0 flex-1 overflow-y-auto pb-[100px]">
        {/* Wave background - tucked behind fixed header */}
        <WaveBackgroundIcon aria-hidden="true" className="w-full" preserveAspectRatio="none" />

        {/* Content */}
        <div ref={contentRef} className="flex flex-col gap-300 px-400">
          {/* Profile avatar - overlaps wave by half */}
          <div className="-mt-[65px] flex flex-col items-start px-[14px]">
            <ProfileAvatar size={100} seed={avatarSeed} />
          </div>

          {/* Profile info */}
          <div className="flex flex-col gap-[6px] pt-300 px-100">
            <h2 className="typo-title1 text-text-strong">{displayProfile.nickname}</h2>
            <div className="flex items-center gap-[6px]">
              <span className="typo-label2 text-text-alternative">{displayProfile.age}세</span>
              <span className="h-[12px] w-px bg-neutral-300" aria-hidden="true" />
              <span className="typo-label2 text-text-alternative">{displayProfile.department}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-[6px] pb-300 px-100">
            {displayProfile.tags.map((tag) => (
              <Tag key={tag} color="black">
                {tag}
              </Tag>
            ))}
          </div>

          {/* Importance section */}
          <ImportanceSection items={MOCK_PROFILE.importanceItems} />

          {/* Checklist */}
          <ChecklistCard items={displayProfile.checklist} nickname={displayProfile.nickname} />
        </div>
      </main>

      {/* Bottom action buttons */}
      <MatchActionBar
        matchRate={88}
        matchHighlights={["청소 빈도", "수면 습관"]}
        onMatchConfirm={() => navigate(`/roommate/${roommateId}/matching-report`)}
        onChatConfirm={() => navigate("/chat")}
      />
    </div>
  );
}

export { RoommateProfileContent };
