import { useState } from "react";

import { toast } from "@/components/ui";
import { MY_CHECKLIST_LAST_UPDATED } from "@/features/mypage/mocks";
import type { MyChecklistSectionMock } from "@/features/mypage/types";
import {
  createMyChecklistSections,
  mapMyChecklistSectionsToRequest,
} from "@/features/mypage/utils";
import { useSaveOnboardingChecklist } from "@/features/onboarding/hooks";
import { useMyProfile, useUpdateUserChecklist } from "@/features/user/hooks";

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

function useMyChecklistEditor(initialEditing = false) {
  const { data: userProfile, isLoading: isProfileLoading } = useMyProfile();
  const { mutate: createChecklist, isPending: isCreatePending } = useSaveOnboardingChecklist();
  const { mutate: updateChecklist, isPending: isUpdatePending } = useUpdateUserChecklist();
  const profileSections = createMyChecklistSections(userProfile?.checklist ?? null);
  const [draftSections, setDraftSections] = useState<MyChecklistSectionMock[] | null>(null);
  const [isEditing, setIsEditing] = useState(initialEditing);
  const [lastUpdated, setLastUpdated] = useState(MY_CHECKLIST_LAST_UPDATED);
  const isSaving = isCreatePending || isUpdatePending;
  const hasChecklist = userProfile?.checklist != null;
  const editingSections = draftSections ?? profileSections;
  const visibleSections = isEditing ? editingSections : profileSections;
  const checklistRequest = mapMyChecklistSectionsToRequest(editingSections);
  const isSaveDisabled =
    isProfileLoading || isSaving || (isEditing && checklistRequest.status === "invalid");

  function handleSaveSuccess() {
    setLastUpdated(formatChecklistUpdatedDate(new Date()));
    setIsEditing(false);
    setDraftSections(null);
    toast.success("체크리스트가 저장되었어요");
  }

  const handleEditButtonClick = () => {
    if (isEditing) {
      if (checklistRequest.status === "invalid") {
        toast.error(checklistRequest.error);
        return;
      }

      if (hasChecklist) {
        updateChecklist(checklistRequest.value, {
          onSuccess: handleSaveSuccess,
          onError: () => toast.error("체크리스트 저장에 실패했어요"),
        });
        return;
      }

      createChecklist(checklistRequest.value, {
        onSuccess: handleSaveSuccess,
        onError: () => toast.error("체크리스트 저장에 실패했어요"),
      });
      return;
    }

    setDraftSections(profileSections);
    setIsEditing(true);
  };

  const handleOptionToggle = (sectionId: string, option: string) => {
    setDraftSections((prev) =>
      updateChecklistSelection(prev ?? profileSections, sectionId, option),
    );
  };

  return {
    handleEditButtonClick,
    handleOptionToggle,
    isEditing,
    isSaveDisabled,
    isSaving,
    lastUpdated,
    visibleSections,
  };
}

export { useMyChecklistEditor };
