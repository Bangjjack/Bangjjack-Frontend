import { ChevronRightIcon } from "@/assets/icons";
import type { ChecklistEditLinkProps } from "@/features/mypage/types";

function ChecklistEditLink({ onClick }: ChecklistEditLinkProps) {
  return (
    <button
      className="flex cursor-pointer items-center justify-between rounded-medium bg-bg-secondary px-400 py-400 text-left"
      onClick={onClick}
      type="button"
    >
      <span>
        <span className="block typo-title2 text-text-strong">내 체크리스트 수정</span>
        <span className="mt-200 block typo-caption2 text-text-caption">
          편집 탭으로 이동합니다.
        </span>
      </span>
      <ChevronRightIcon
        aria-hidden="true"
        className="size-600 shrink-0 text-icon-strong [&_path]:stroke-current"
      />
    </button>
  );
}

export { ChecklistEditLink };
