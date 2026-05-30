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
  const {
    handleEditButtonClick,
    handleOptionToggle,
    isEditing,
    isSaveDisabled,
    isSaving,
    visibleSections,
  } = useMyChecklistEditor(initialEditing);

  return (
    <div className={cn("flex h-full flex-col bg-bg-primary", className)}>
      <header className="flex shrink-0 items-center justify-between px-400 pb-400 pt-9">
        <button
          aria-label="뒤로가기"
          className="flex cursor-pointer items-center text-icon-strong"
          onClick={onBack}
          type="button"
        >
          <ChevronLeftIcon aria-hidden="true" className="size-6" />
        </button>
        <span className="typo-title1 text-text-strong">내 체크리스트</span>
        <div className="size-6" />
      </header>

      <div className="scrollbar-none flex-1 overflow-y-auto">
        <div className="flex flex-col gap-500 p-400 pb-500">
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
        </div>
      </div>

      <div className="shrink-0 px-400 pb-9 pt-300">
        <Button
          className="w-full cursor-pointer"
          disabled={isSaveDisabled}
          onClick={handleEditButtonClick}
          type="button"
          variant={isEditing ? "default" : "black"}
        >
          {isSaving ? "저장 중" : isEditing ? "저장하기" : "수정하기"}
        </Button>
      </div>
    </div>
  );
}

export { MyChecklistContent };
