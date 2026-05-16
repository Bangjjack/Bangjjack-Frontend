export interface ProfileForm {
  age: string;
  department: string;
  name: string;
}

export type ProfileFieldKey = keyof ProfileForm;

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
  onFieldChange: (key: ProfileFieldKey, value: string) => void;
  values: ProfileForm;
}

export interface ImportanceEditSectionProps {
  items: string[];
  onToggle: (item: string) => void;
  replaceFeedbackKey: number;
}

export interface ProfileViewContentProps {
  importanceItems: string[];
  values: ProfileForm;
}

export interface ChecklistEditLinkProps {
  onClick?: () => void;
}
