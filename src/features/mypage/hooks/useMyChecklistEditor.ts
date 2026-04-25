import { useState } from "react";

import { toast } from "@/components/ui";
import {
  MY_CHECKLIST_LAST_UPDATED,
  MY_CHECKLIST_SECTIONS,
  type MyChecklistSectionMock,
} from "@/features/mypage/mocks";

function formatChecklistUpdatedDate(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
    .format(date)
    .replace(/\. /g, ".")
    .replace(/\.$/, "");
}

function updateChecklistSelection(
  sections: MyChecklistSectionMock[],
  sectionId: string,
  option: string,
) {
  return sections.map((section) => {
    if (section.id !== sectionId) {
      return section;
    }

    if (section.selectionType === "single") {
      return { ...section, selectedOptions: [option] };
    }

    const isSelected = section.selectedOptions.includes(option);
    const selectedOptions = isSelected
      ? section.selectedOptions.filter((selectedOption) => selectedOption !== option)
      : [...section.selectedOptions, option];

    return { ...section, selectedOptions };
  });
}

function useMyChecklistEditor() {
  const [savedSections, setSavedSections] = useState(MY_CHECKLIST_SECTIONS);
  const [draftSections, setDraftSections] = useState(MY_CHECKLIST_SECTIONS);
  const [isEditing, setIsEditing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(MY_CHECKLIST_LAST_UPDATED);
  const visibleSections = isEditing ? draftSections : savedSections;

  const handleEditButtonClick = () => {
    if (isEditing) {
      setSavedSections(draftSections);
      setLastUpdated(formatChecklistUpdatedDate(new Date()));
      setIsEditing(false);
      toast.success("체크리스트가 저장되었어요");
      return;
    }

    setDraftSections(savedSections);
    setIsEditing(true);
  };

  const handleOptionToggle = (sectionId: string, option: string) => {
    setDraftSections((prev) => updateChecklistSelection(prev, sectionId, option));
  };

  return {
    handleEditButtonClick,
    handleOptionToggle,
    isEditing,
    lastUpdated,
    visibleSections,
  };
}

export { useMyChecklistEditor };
