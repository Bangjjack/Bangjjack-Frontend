import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { waveImage } from "@/assets/images";
import { Button, Header } from "@/components/ui";
import {
  ChecklistEditLink,
  ImportanceEditSection,
  ProfileAvatarSection,
  ProfileEditFields,
  ProfileViewContent,
} from "@/features/mypage/components/profile-edit";
import {
  MY_PROFILE_EDIT_DEFAULT_VALUES,
  MY_PROFILE_EDIT_FORM_ID,
  WAVE_BACKGROUND_CLASS_NAME,
} from "@/features/mypage/constants";
import { MY_PROFILE_CHECKLIST, MY_PROFILE_IMPORTANCE_ITEMS } from "@/features/mypage/mocks";
import { myProfileEditSchema, type MyProfileEditFormValues } from "@/features/mypage/schemas";
import type { MyProfileEditContentProps } from "@/features/mypage/types";
import type { ChecklistEntry } from "@/features/roommate/types/checklist";
import { cn } from "@/lib/cn";

function MyProfileEditContent({
  className,
  onBack,
  onChecklistClick,
  onEditClick,
}: MyProfileEditContentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState<MyProfileEditFormValues>(
    MY_PROFILE_EDIT_DEFAULT_VALUES,
  );
  const [checklistItems] = useState<ChecklistEntry[]>(MY_PROFILE_CHECKLIST);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [importanceItems, setImportanceItems] = useState<string[]>(MY_PROFILE_IMPORTANCE_ITEMS);
  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { isValid },
  } = useForm<MyProfileEditFormValues>({
    defaultValues: MY_PROFILE_EDIT_DEFAULT_VALUES,
    mode: "onChange",
    resolver: zodResolver(myProfileEditSchema),
  });
  const watchedProfileName = useWatch({ control, name: "name" });

  useEffect(() => {
    return () => {
      if (profileImageUrl) {
        URL.revokeObjectURL(profileImageUrl);
      }
    };
  }, [profileImageUrl]);

  function handleEditButtonClick() {
    reset(profileForm);
    setIsEditing(true);
    void trigger();
    onEditClick?.();
  }

  function submitProfileForm(values: MyProfileEditFormValues) {
    setProfileForm(values);
    setIsEditing(false);
  }

  function updateProfileImage(file: File) {
    const nextImageUrl = URL.createObjectURL(file);

    setProfileImageUrl((prev) => {
      if (prev) {
        URL.revokeObjectURL(prev);
      }

      return nextImageUrl;
    });
  }

  function toggleImportanceItem(item: string) {
    setImportanceItems((prev) => {
      if (prev.includes(item)) {
        return prev.filter((value) => value !== item);
      }

      return [...prev, item];
    });
  }

  return (
    <div className={cn("relative flex h-full flex-col overflow-hidden bg-bg-primary", className)}>
      <img alt="" aria-hidden="true" className={WAVE_BACKGROUND_CLASS_NAME} src={waveImage} />

      <Header
        className="absolute inset-x-0 top-0 z-20"
        onBackClick={onBack}
        showBack
        title={isEditing ? "내 프로필 편집" : "내 프로필"}
      />

      <main className="scrollbar-none relative z-10 min-h-0 flex-1 overflow-y-auto pb-28">
        <div className={cn("flex flex-col px-400 gap-600 pt-29 pb-400")}>
          <ProfileAvatarSection
            imageUrl={profileImageUrl}
            isEditing={isEditing}
            name={isEditing ? watchedProfileName : profileForm.name}
            onImageChange={updateProfileImage}
          />

          {isEditing ? (
            <form
              className="flex flex-col gap-300"
              id={MY_PROFILE_EDIT_FORM_ID}
              onSubmit={handleSubmit(submitProfileForm)}
            >
              <ProfileEditFields control={control} />
              <ChecklistEditLink onClick={onChecklistClick} />
              <ImportanceEditSection items={importanceItems} onToggle={toggleImportanceItem} />
            </form>
          ) : (
            <ProfileViewContent
              checklistItems={checklistItems}
              importanceItems={importanceItems}
              onChecklistClick={onChecklistClick}
              values={profileForm}
            />
          )}
        </div>
      </main>

      <div className="absolute bottom-0 left-0 right-0 z-40 bg-bg-primary px-400 pb-9 pt-300">
        <Button
          className="w-full cursor-pointer"
          disabled={isEditing && !isValid}
          onClick={isEditing ? handleSubmit(submitProfileForm) : handleEditButtonClick}
          type="button"
          variant={isEditing ? "black" : "default"}
        >
          {isEditing ? "저장하기" : "수정하기"}
        </Button>
      </div>
    </div>
  );
}

export { MyProfileEditContent };
export type { MyProfileEditContentProps };
