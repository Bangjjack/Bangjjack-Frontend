import { ChevronLeftIcon } from "@/assets/icons";
import { Button, ChipQuestionSection } from "@/components/ui";
import { useMyChecklistEditor } from "@/features/mypage/hooks";
import { cn } from "@/lib/cn";

export interface MyChecklistContentProps {
  className?: string;
  initialEditing?: boolean;
  onBack: () => void;
}

function MyChecklistContent({
  className,
  initialEditing = false,
  onBack,
}: MyChecklistContentProps) {
  const { handleEditButtonClick, handleOptionToggle, isEditing, lastUpdated, visibleSections } =
    useMyChecklistEditor(initialEditing);

  return (
    <div className={cn("-mx-400 flex min-h-full flex-col bg-bg-primary", className)}>
      <header className="flex h-18.5 items-center justify-between px-400 pb-400 pt-9">
        <button
          aria-label="뒤로가기"
          className="flex cursor-pointer items-center gap-2.5 text-icon-strong"
          onClick={onBack}
          type="button"
        >
          <ChevronLeftIcon aria-hidden="true" className="size-5" />
          <span className="typo-title1 text-neutral-black">내 체크리스트</span>
        </button>

        <Button
          className="h-11 cursor-pointer rounded-medium px-400 py-2.5 typo-button1"
          onClick={handleEditButtonClick}
          type="button"
          variant={isEditing ? "black" : "default"}
        >
          {isEditing ? "저장하기" : "수정하기"}
        </Button>
      </header>

      <div className="flex flex-col gap-400 bg-bg-primary p-400 pb-500">
        {visibleSections.map((section) => (
          <ChipQuestionSection
            key={section.id}
            editable={isEditing}
            helperText={section.helperText}
            onToggle={(option) => handleOptionToggle(section.id, option)}
            options={section.options}
            selectedValues={section.selectedOptions}
            selectionType={section.selectionType}
            title={section.title}
          />
        ))}

        <p className="typo-caption2 text-center text-text-disabled">마지막 수정 {lastUpdated}</p>
      </div>
    </div>
  );
}

export { MyChecklistContent };
