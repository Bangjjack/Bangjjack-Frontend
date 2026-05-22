import type { Control } from "react-hook-form";

import type { MyProfileEditFormValues } from "@/features/mypage/schemas";
import type { ChecklistEntry } from "@/features/roommate/types/checklist";

export type ProfileForm = MyProfileEditFormValues;

export interface MyProfileEditContentProps {
  className?: string;
  onBack: () => void;
  onChecklistClick?: () => void;
  onEditClick?: () => void;
}

export interface ProfileAvatarSectionProps {
  imageUrl: string | null;
  isEditing: boolean;
  name: string;
  onImageChange: (file: File) => void;
}

export interface ProfileEditFieldsProps {
  control: Control<MyProfileEditFormValues>;
}

export interface ImportanceEditSectionProps {
  items: string[];
  onToggle: (item: string) => void;
  replaceFeedbackKey: number;
}

export interface ProfileViewContentProps {
  checklistItems: ChecklistEntry[];
  importanceItems: string[];
  onChecklistClick?: () => void;
  values: ProfileForm;
}

export interface ChecklistEditLinkProps {
  onClick?: () => void;
}
