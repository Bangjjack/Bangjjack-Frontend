import { ChipQuestionSection } from "@/components/ui";
import type { MyChecklistSelectionType } from "@/features/mypage/types";

export interface MyChecklistChipSectionProps {
  editable?: boolean;
  helperText?: string;
  onOptionToggle?: (option: string) => void;
  options: string[];
  selectedOptions: string[];
  selectionType: MyChecklistSelectionType;
  title: string;
}

function MyChecklistChipSection({
  editable = false,
  helperText,
  onOptionToggle,
  options,
  selectedOptions,
  selectionType,
  title,
}: MyChecklistChipSectionProps) {
  return (
    <ChipQuestionSection
      editable={editable}
      helperText={helperText}
      onToggle={onOptionToggle}
      options={options}
      selectedValues={selectedOptions}
      selectionType={selectionType}
      title={title}
    />
  );
}

export { MyChecklistChipSection };
