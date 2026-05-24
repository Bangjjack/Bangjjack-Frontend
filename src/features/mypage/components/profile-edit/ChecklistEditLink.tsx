import { ChevronRightIcon } from "@/assets/icons";
import { IconBadge } from "@/components/ui";
import type { ChecklistEditLinkProps } from "@/features/mypage/types";
import { cn } from "@/lib/cn";

function ChecklistEditLink({ hasChecklist = true, onClick }: ChecklistEditLinkProps) {
  return (
    <button
      className={cn(
        "flex cursor-pointer items-center justify-between gap-1.5 rounded-medium bg-bg-secondary text-left",
        hasChecklist ? "px-400 py-300" : "border border-dashed border-brand-primary px-300 py-450",
      )}
      onClick={onClick}
      type="button"
    >
      <span className="flex min-w-0 flex-1 items-center gap-300">
        <IconBadge
          size={hasChecklist ? "small" : "medium"}
          variant={hasChecklist ? "transparent" : "solid"}
        />

        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="block typo-title2 text-text-strong">
            {hasChecklist ? "내 체크리스트 수정" : "내 체크리스트 완성하기"}
          </span>
          <span
            className={cn(
              "block typo-caption2",
              hasChecklist ? "text-text-caption" : "text-text-primary-alternative",
            )}
          >
            {hasChecklist ? "편집 탭으로 이동합니다." : "나와 맞는 룸메이트를 추천 받아봐요"}
          </span>
        </span>
      </span>
      <ChevronRightIcon
        aria-hidden="true"
        className="size-600 shrink-0 text-icon-alternative [&_path]:stroke-current"
      />
    </button>
  );
}

export { ChecklistEditLink };
