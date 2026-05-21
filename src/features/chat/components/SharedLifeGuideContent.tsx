import { ChatCircleIcon, CheckIcon, LightbulbIcon, SlidersHorizontalIcon } from "@/assets/icons";
import { Button, Card, Header, ProfileAvatar } from "@/components/ui";
import {
  SharedLifeChecklistRow,
  SharedLifeCoordinationCard,
  SharedLifeGuideSectionCard,
  SharedLifeTopicRow,
} from "@/features/chat/components/shared-life-guide";
import {
  SHARED_LIFE_CHECKLIST_ITEMS,
  SHARED_LIFE_CONVERSATION_TOPICS,
  SHARED_LIFE_COORDINATION_ITEMS,
} from "@/features/chat/constants";
import type { ChatUserProfile } from "@/features/chat/types";
import { cn } from "@/lib/cn";

export interface SharedLifeGuideContentProps extends Required<
  Pick<ChatUserProfile, "age" | "department" | "matchRate" | "nickname">
> {
  avatarSeed?: number;
  className?: string;
  onBack: () => void;
  onContinueChat: () => void;
  onGoHome: () => void;
}

function SharedLifeGuideContent({
  age,
  avatarSeed,
  className,
  department,
  matchRate,
  nickname,
  onBack,
  onContinueChat,
  onGoHome,
}: SharedLifeGuideContentProps) {
  return (
    <main className={cn("min-h-dvh bg-bg-primary", className)}>
      <Header showBack title="공동 생활 시작 가이드" onBackClick={onBack} />

      <div className="flex flex-col gap-300 px-400 pb-600">
        <Card className="flex-row items-center justify-between gap-0 rounded-medium border-border-normal bg-bg-secondary p-400 py-400 shadow-none">
          <div className="flex min-w-0 items-center gap-2.5">
            <ProfileAvatar
              className="shrink-0 border border-brand-primary"
              seed={avatarSeed}
              size={70}
            />
            <div className="min-w-0">
              <h1 className="truncate typo-title2 text-neutral-black">{nickname}</h1>
              <div className="flex min-w-0 items-center gap-1.5 typo-caption2 text-text-alternative">
                <span className="shrink-0">{age}세</span>
                <span aria-hidden="true" className="h-3 w-px shrink-0 bg-border-strong" />
                <span className="truncate">{department}</span>
              </div>
            </div>
          </div>
          <div className="ml-300 shrink-0 text-right">
            <p className="text-lg font-extrabold leading-5 tracking-(--letter-spacing) text-brand-primary">
              {matchRate}%
            </p>
            <p className="typo-title4 leading-5 text-text-disabled">매칭률</p>
          </div>
        </Card>

        <SharedLifeGuideSectionCard
          icon={<CheckIcon aria-hidden="true" className="size-4 [&_path]:stroke-current" />}
          title="공동 생활 체크포인트"
        >
          <div className="flex flex-col gap-2.5">
            {SHARED_LIFE_CHECKLIST_ITEMS.map((item) => (
              <SharedLifeChecklistRow key={item.label} {...item} />
            ))}
          </div>
        </SharedLifeGuideSectionCard>

        <SharedLifeGuideSectionCard
          icon={
            <SlidersHorizontalIcon aria-hidden="true" className="size-4 [&_path]:stroke-current" />
          }
          title="미리 조율하면 좋은 점"
        >
          <div className="grid grid-cols-2 gap-2.5">
            {SHARED_LIFE_COORDINATION_ITEMS.map((item) => (
              <SharedLifeCoordinationCard key={item.title} {...item} />
            ))}
          </div>
        </SharedLifeGuideSectionCard>

        <SharedLifeGuideSectionCard
          icon={<ChatCircleIcon aria-hidden="true" className="size-4 [&_path]:stroke-current" />}
          title="대화 추천 주제"
        >
          <div className="flex flex-col gap-2.5">
            {SHARED_LIFE_CONVERSATION_TOPICS.map((topic, index) => (
              <SharedLifeTopicRow key={topic.title} index={index} {...topic} />
            ))}
          </div>
        </SharedLifeGuideSectionCard>

        <div className="flex gap-2.5 overflow-hidden rounded-medium border border-brand-secondary bg-brand-secondary-light p-300">
          <LightbulbIcon
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-brand-secondary-dark [&_path]:stroke-current"
          />
          <div className="flex min-w-0 flex-col gap-100">
            <h2 className="typo-title3 leading-5 text-brand-secondary-dark">
              처음 2주가 가장 중요해요.
            </h2>
            <p className="typo-caption2 text-text-secondary-normal">
              어색하더라도 작은 것부터 솔직하게 이야기하는 습관을 들이면, 장기적으로 훨씬 편한
              관계가 돼요.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-200">
          <Button
            className="h-9 rounded-medium py-200 typo-button2 cursor-pointer"
            onClick={onContinueChat}
            size="sm"
          >
            채팅 계속하기
          </Button>
          <Button
            className="h-9 rounded-medium py-200 typo-button2 text-text-normal cursor-pointer"
            onClick={onGoHome}
            size="sm"
            variant="disabled"
          >
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </main>
  );
}

export { SharedLifeGuideContent };
