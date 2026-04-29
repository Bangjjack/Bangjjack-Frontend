import { useState } from "react";

import { WaveBackgroundIcon } from "@/assets/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Header,
  ProfileAvatar,
  Tag,
} from "@/components/ui";
import type { ChatDetail } from "@/features/chat/types";
import { ChecklistCard, ImportanceSection } from "@/features/roommate/components";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";
import { useGoBack } from "@/hooks/useGoBack";

import type { ChecklistEntry } from "@/features/roommate/components";

type RoommateProfileContentProps = {
  profile?: ChatDetail;
};

// TODO: API 연동 시 제거
const MOCK_PROFILE = {
  nickname: "무구정광대다라니경",
  age: 20,
  department: "컴퓨터공학과",
  tags: ["얼리버드", "집순이", "비흡연"],
  importanceItems: ["기상 시간", "흡연 여부", "취침 시간"],
  checklist: [
    { id: "sleep-time", label: "취침 시간", value: "24~2시", isMatched: true },
    { id: "wake-time", label: "기상 시간", value: "불규칙", isMatched: true },
    { id: "sleep-habit", label: "잠버릇", value: "없음", isMatched: false },
    { id: "cleaning", label: "청소 주기", value: "거의 안 함", isMatched: false },
    { id: "stay-time", label: "기숙사 체류 시간", value: "대부분 기숙사 안에", isMatched: true },
    { id: "call-habit", label: "통화 습관", value: "소곤소곤", isMatched: true },
    { id: "temperature", label: "실내 온도", value: "둘 다 예민", isMatched: true },
    { id: "noise", label: "소음 민감도", value: "보통", isMatched: true },
    { id: "smoking", label: "흡연", value: "비흡연", isMatched: true },
  ] satisfies ChecklistEntry[],
};

function RoommateProfileContent({ profile }: RoommateProfileContentProps) {
  const handleBackClick = useGoBack();
  const contentRef = useFadeInOnScroll<HTMLDivElement>();
  const [isMatchDialogOpen, setIsMatchDialogOpen] = useState(false);
  const displayProfile = {
    ...MOCK_PROFILE,
    age: profile?.age ?? MOCK_PROFILE.age,
    department: profile?.department ?? MOCK_PROFILE.department,
    nickname: profile?.nickname ?? MOCK_PROFILE.nickname,
    tags: profile?.lifestyleTags ?? MOCK_PROFILE.tags,
  };
  const avatarSeed = profile?.id ?? displayProfile.nickname.length;

  // TODO: API 연동 시 실제 모집글 존재 여부 확인
  const hasExistingRecruit = true;

  const handleMatchClick = () => {
    if (hasExistingRecruit) {
      setIsMatchDialogOpen(true);
      return;
    }
    // TODO: 모집글이 없을 때 매칭 로직
  };

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
      <div className="absolute bottom-0 left-0 right-0 z-40 flex gap-[10px] px-400 pb-9 pt-300">
        <Button className="flex-1" variant="ghost" onClick={handleMatchClick}>
          매칭하기
        </Button>
        <Button className="flex-1" disabled>
          채팅하기
        </Button>
      </div>

      {/* 이미 모집글이 있을 때 표시되는 모달 */}
      <AlertDialog open={isMatchDialogOpen} onOpenChange={setIsMatchDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>이미 작성된 모집글이 있어요!</AlertDialogTitle>
            <AlertDialogDescription>
              채팅을 통해 {displayProfile.nickname} 님을 <br /> 내 방에 초대할 수 있어요
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소하기</AlertDialogCancel>
            <AlertDialogAction disabled>채팅하기</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export { RoommateProfileContent };
