import { ChatCircleIcon, CheckIcon, LightbulbIcon, SlidersHorizontalIcon } from "@/assets/icons";
import { Button, Card, Header, ProfileAvatar } from "@/components/ui";
import {
  SharedLifeChecklistRow,
  SharedLifeCoordinationCard,
  SharedLifeGuideSectionCard,
  SharedLifeTopicRow,
} from "@/features/chat/components/shared-life-guide";
import type { ChatUserProfile } from "@/features/chat/types";
import type { PostMatchRateData } from "@/features/board/types";
import { cn } from "@/lib/cn";

export interface SharedLifeGuideContentProps
  extends Required<Pick<ChatUserProfile, "nickname">>, Pick<ChatUserProfile, "age" | "department"> {
  avatarSeed?: number;
  className?: string;
  matchReport: PostMatchRateData;
  profileImage?: string | null;
  onBack: () => void;
  onContinueChat: () => void;
  onGoHome: () => void;
}

function SharedLifeGuideContent({
  age,
  avatarSeed,
  className,
  department,
  matchReport,
  nickname,
  profileImage,
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
              imageUrl={profileImage}
              seed={avatarSeed}
              size={70}
            />
            <div className="min-w-0">
              <h1 className="truncate typo-title2 text-neutral-black">{nickname}</h1>
              <div className="flex min-w-0 items-center gap-1.5 typo-caption2 text-text-alternative">
                {age ? <span className="shrink-0">{age}세</span> : null}
                {age && department ? (
                  <span aria-hidden="true" className="h-3 w-px shrink-0 bg-border-strong" />
                ) : null}
                {department ? <span className="truncate">{department}</span> : null}
              </div>
            </div>
          </div>
          <div className="ml-300 shrink-0 text-right">
            <p className="text-lg font-extrabold leading-5 tracking-(--letter-spacing) text-brand-primary">
              {matchReport.matchRate}%
            </p>
            <p className="typo-title4 leading-5 text-text-disabled">매칭률</p>
          </div>
        </Card>

        {matchReport.summaryComment.brief && (
          <div className="flex items-center gap-2.5 overflow-hidden rounded-small border border-brand-primary bg-brand-primary-light p-300">
            <LightbulbIcon
              aria-hidden="true"
              className="size-6 shrink-0 text-brand-primary-dark [&_path]:stroke-current"
            />
            <p className="typo-caption1 text-brand-primary-dark">
              {matchReport.summaryComment.brief}
            </p>
          </div>
        )}

        {matchReport.matchedFeatures.length > 0 && (
          <SharedLifeGuideSectionCard
            icon={<CheckIcon aria-hidden="true" className="size-4 [&_path]:stroke-current" />}
            title="공동 생활 체크포인트"
          >
            <div className="flex flex-col gap-2.5">
              {matchReport.matchedFeatures.map(({ key, ...rest }) => (
                <SharedLifeChecklistRow key={key} {...rest} />
              ))}
            </div>
          </SharedLifeGuideSectionCard>
        )}

        {matchReport.mismatchedFeatures.length > 0 && (
          <SharedLifeGuideSectionCard
            icon={
              <SlidersHorizontalIcon
                aria-hidden="true"
                className="size-4 [&_path]:stroke-current"
              />
            }
            title="미리 조율하면 좋은 점"
          >
            <div className="flex flex-col gap-2.5">
              {matchReport.mismatchedFeatures.map(({ key, ...rest }, index) => (
                <SharedLifeCoordinationCard key={key} index={index} {...rest} />
              ))}
            </div>
          </SharedLifeGuideSectionCard>
        )}

        {matchReport.conversationStarters.length > 0 && (
          <SharedLifeGuideSectionCard
            icon={<ChatCircleIcon aria-hidden="true" className="size-4 [&_path]:stroke-current" />}
            title="대화 추천 주제"
          >
            <div className="flex flex-col gap-2.5">
              {matchReport.conversationStarters.map(({ key, ...rest }) => (
                <SharedLifeTopicRow key={key} {...rest} />
              ))}
            </div>
          </SharedLifeGuideSectionCard>
        )}

        <div className="flex flex-col gap-200">
          <Button className="w-full" onClick={onContinueChat}>
            채팅 계속하기
          </Button>
          <Button className="w-full" variant="neutral" onClick={onGoHome}>
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </main>
  );
}

export { SharedLifeGuideContent };
