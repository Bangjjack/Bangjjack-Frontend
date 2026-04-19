import { WaveBackgroundIcon } from "@/assets/icons";
import { Button, Header, ProfileAvatar, Tag } from "@/components/ui";
import { ChecklistCard } from "@/features/roommate/components/ChecklistCard";
import { ImportanceSection } from "@/features/roommate/components/ImportanceSection";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";
import { useGoBack } from "@/hooks/useGoBack";

import type { ChecklistEntry } from "@/features/roommate/types/checklist";

// TODO: API 연동 시 제거
const MOCK_PROFILE = {
  nickname: "무구정광대다라니경",
  age: 20,
  department: "컴퓨터공학과",
  tags: ["얼리버드", "집순이", "비흡연"],
  importanceItems: ["기상 시간", "흡연 여부", "취침 시간"],
  checklist: [
    { label: "취침 시간", value: "24~2시", isMatched: true },
    { label: "기상 시간", value: "불규칙", isMatched: true },
    { label: "잠버릇", value: "없음", isMatched: false },
    { label: "청소 주기", value: "거의 안 함", isMatched: false },
    { label: "기숙사 체류 시간", value: "대부분 기숙사 안에", isMatched: true },
    { label: "통화 습관", value: "소곤소곤", isMatched: true },
    { label: "실내 온도", value: "둘 다 예민", isMatched: true },
    { label: "소음 민감도", value: "보통", isMatched: true },
    { label: "흡연", value: "비흡연", isMatched: true },
  ] satisfies ChecklistEntry[],
};

function RoommateProfileContent() {
  const handleBackClick = useGoBack();
  const contentRef = useFadeInOnScroll<HTMLDivElement>();

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
            <ProfileAvatar size={100} seed={MOCK_PROFILE.nickname.length} />
          </div>

          {/* Profile info */}
          <div className="flex flex-col gap-[6px] pt-300">
            <h2 className="typo-title1 text-text-strong">{MOCK_PROFILE.nickname}</h2>
            <div className="flex items-center gap-[6px]">
              <span className="typo-label2 text-text-alternative">{MOCK_PROFILE.age}세</span>
              <span className="h-[12px] w-px bg-neutral-300" aria-hidden="true" />
              <span className="typo-label2 text-text-alternative">{MOCK_PROFILE.department}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-[6px] pb-300">
            {MOCK_PROFILE.tags.map((tag) => (
              <Tag key={tag} color="black">
                {tag}
              </Tag>
            ))}
          </div>

          {/* Importance section */}
          <ImportanceSection items={MOCK_PROFILE.importanceItems} />

          {/* Checklist */}
          <ChecklistCard items={MOCK_PROFILE.checklist} nickname={MOCK_PROFILE.nickname} />
        </div>
      </main>

      {/* Bottom action buttons */}
      <div className="absolute bottom-0 left-0 right-0 z-40 flex gap-[10px] px-400 pb-9 pt-300">
        <Button className="flex-1" variant="ghost">
          매칭하기
        </Button>
        <Button className="flex-1">채팅하기</Button>
      </div>
    </div>
  );
}

export { RoommateProfileContent };
