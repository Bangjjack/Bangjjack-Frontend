import { CheckIcon } from "@/assets/icons";
import { Button, Card, ProfileAvatar } from "@/components/ui";
import { cn } from "@/lib/cn";

export interface ChatRoommateConfirmedContentProps {
  age?: number;
  className?: string;
  department?: string;
  matchRate?: number;
  nickname?: string;
  onContinueChat: () => void;
  onGoHome: () => void;
}

const CONFETTI_DOTS = [
  { className: "left-0 top-4.5 size-2.5 bg-[#ffc500]", delay: "0ms" },
  { className: "left-5.5 top-12.5 size-2.5 bg-brand-primary-dark", delay: "80ms" },
  { className: "left-10 top-8 size-2.5 bg-[#ffc500] opacity-70", delay: "40ms" },
  { className: "left-22.5 top-2.5 size-2.5 bg-[#ffc500] opacity-80", delay: "130ms" },
  { className: "left-30 top-10.5 size-2 bg-brand-primary-dark opacity-75", delay: "70ms" },
  { className: "left-39.5 top-7 size-2 bg-brand-primary opacity-90", delay: "160ms" },
  { className: "left-45 top-14 size-3 bg-[#ffc500] opacity-85", delay: "110ms" },
  { className: "left-18 top-20 size-1.5 bg-brand-primary opacity-85", delay: "210ms" },
  { className: "left-55 top-10 size-2 bg-brand-primary opacity-85", delay: "190ms" },
  { className: "right-0 top-7.5 size-1.5 bg-[#ffc500] opacity-80", delay: "250ms" },
  { className: "left-62.5 top-2.5 size-2 bg-brand-primary-dark opacity-95", delay: "140ms" },
];

function ChatRoommateConfirmedContent({
  age = 20,
  className,
  department = "컴퓨터공학과",
  matchRate = 92,
  nickname = "박서연",
  onContinueChat,
  onGoHome,
}: ChatRoommateConfirmedContentProps) {
  return (
    <main
      className={cn(
        "relative flex min-h-dvh flex-col items-center justify-center bg-bg-primary p-400",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-23.5 h-25 w-72 -translate-x-1/2 overflow-hidden"
      >
        {CONFETTI_DOTS.map((dot, index) => (
          <span
            key={index}
            className={cn("animate-confetti-pop absolute rounded-full", dot.className)}
            style={{ animationDelay: dot.delay }}
          />
        ))}
      </div>

      <div className="relative flex w-full flex-col items-center justify-center gap-600 overflow-hidden p-400">
        <div className="flex size-17.5 items-center justify-center rounded-full bg-brand-primary">
          <CheckIcon className="size-9 text-icon-on-primary [&_path]:stroke-current" />
        </div>

        <div className="flex flex-col items-center gap-2.5 text-center">
          <h1 className="typo-h4 text-neutral-black">룸메이트 확정!</h1>
          <p className="typo-caption1 text-text-alternative">
            {nickname}님과 룸메이트가 되었어요
          </p>
        </div>

        <Card className="w-full flex-row items-center justify-between gap-0 rounded-2xl border-border-normal bg-bg-secondary p-400 py-400 shadow-none">
          <div className="flex min-w-0 items-center gap-2.5">
            <ProfileAvatar className="shrink-0 border border-brand-primary" seed={1} size={70} />

            <div className="flex min-w-0 flex-col justify-center gap-100">
              <h2 className="typo-title2 truncate text-neutral-black">{nickname}</h2>
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

        <div className="flex w-full flex-col gap-200">
          <Button
            className="h-9 w-full cursor-pointer rounded-medium py-200 typo-button2"
            onClick={onContinueChat}
            size="sm"
          >
            채팅 계속하기
          </Button>
          <Button
            className="h-9 w-full cursor-pointer rounded-medium py-200 typo-button2 text-text-normal"
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

export { ChatRoommateConfirmedContent };
