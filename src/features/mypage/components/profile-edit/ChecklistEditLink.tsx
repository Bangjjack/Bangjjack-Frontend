import { CheckIcon, ChevronRightIcon } from "@/assets/icons";
import type { ChecklistEditLinkProps } from "@/features/mypage/types";

function ChecklistEditLink({ onClick }: ChecklistEditLinkProps) {
  return (
    <button
      className="flex cursor-pointer items-center justify-between gap-1.5 rounded-medium bg-bg-secondary px-400 py-300 text-left"
      onClick={onClick}
      type="button"
    >
      <span className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span className="flex items-center gap-1.5">
          <CheckIcon
            aria-hidden="true"
            className="size-400 shrink-0 text-brand-primary [&_path]:stroke-current"
          />
          <span className="block typo-title2 text-text-strong">내 체크리스트 수정</span>
        </span>
        <span className="block typo-caption2 text-text-caption">편집 탭으로 이동합니다.</span>
      </span>
      <ChevronRightIcon
        aria-hidden="true"
        className="size-600 shrink-0 text-icon-strong [&_path]:stroke-current"
      />
    </button>
  );
}

export { ChecklistEditLink };
