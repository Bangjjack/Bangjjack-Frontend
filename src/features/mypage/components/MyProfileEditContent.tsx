import { useEffect, useRef, useState } from "react";

import { CameraIcon, ChevronRightIcon, WaveBackgroundIcon } from "@/assets/icons";
import { Button, Header, Input, ProfileAvatar, SelectField, Tag } from "@/components/ui";
import { OnBoardingPriorityStep } from "@/features/onboarding/components";
import { PRIORITY_FACTOR_OPTIONS } from "@/features/onboarding/constants";
import {
  MY_PROFILE,
  MY_PROFILE_CHECKLIST,
  MY_PROFILE_IMPORTANCE_ITEMS,
} from "@/features/mypage/mocks";
import { ChecklistCard, ImportanceSection } from "@/features/roommate/components";
import { cn } from "@/lib/cn";

const AGE_OPTIONS = ["18", "19", "20", "21", "22", "23", "24", "25"] as const;
const DEPARTMENT_OPTIONS = [
  "컴퓨터공학과",
  "소프트웨어학과",
  "정보통신공학과",
  "전자공학과",
  "경영학과",
] as const;

const INITIAL_PROFILE_FORM = {
  age: String(MY_PROFILE.age),
  department: MY_PROFILE.department,
  name: MY_PROFILE.name,
};

const PROFILE_PLACEHOLDER = {
  age: "나이",
  department: "학과를 선택해 주세요",
  name: "이름을 입력해 주세요",
} as const;

const SELECT_TRIGGER_CLASS_NAME =
  "h-11 rounded-medium border-[1.5px] border-border-normal bg-bg-secondary px-300 typo-body1";
const WAVE_BACKGROUND_CLASS_NAME = "absolute left-0 -top-0.75 w-full";

type ProfileForm = typeof INITIAL_PROFILE_FORM;
type ProfileFieldKey = keyof ProfileForm;

export interface MyProfileEditContentProps {
  className?: string;
  onBack: () => void;
  onChecklistClick?: () => void;
  onEditClick?: () => void;
}

type ProfileAvatarSectionProps = {
  imageUrl: string | null;
  isEditing: boolean;
  name: string;
  onImageChange: (file: File) => void;
};

type ProfileEditFieldsProps = {
  onFieldChange: (key: ProfileFieldKey, value: string) => void;
  values: ProfileForm;
};

type ImportanceEditSectionProps = {
  items: string[];
  onToggle: (item: string) => void;
};

type ProfileViewContentProps = {
  importanceItems: string[];
  values: ProfileForm;
};

type ChecklistEditLinkProps = {
  onClick?: () => void;
};

function ProfileAvatarSection({
  imageUrl,
  isEditing,
  name,
  onImageChange,
}: ProfileAvatarSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    onImageChange(file);
    event.target.value = "";
  }

  return (
    <div className="flex flex-col items-start px-3.5">
      <div className={cn("relative", isEditing && "w-28")}>
        {imageUrl ? (
          <img alt="" className="size- rounded-full bg-bg-secondary object-cover" src={imageUrl} />
        ) : (
          <ProfileAvatar seed={name.length} size={100} variant="orange" />
        )}
        {isEditing ? (
          <>
            <input
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              type="file"
            />
            <button
              aria-label="프로필 사진 변경"
              className="absolute bottom-0 left-18 flex cursor-pointer items-center gap-2.5 rounded-[6.25rem] border border-border-normal bg-bg-primary p-200 text-icon-primary-alternative"
              onClick={() => fileInputRef.current?.click()}
              type="button"
            >
              <CameraIcon aria-hidden="true" className="size-400 [&_path]:stroke-current" />
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}

function ProfileEditFields({ onFieldChange, values }: ProfileEditFieldsProps) {
  return (
    <section className="flex flex-col gap-300 px-100 pt-300">
      <Input
        aria-label="이름"
        className="h-11 rounded-medium bg-bg-secondary px-300 typo-body1"
        onChange={(event) => onFieldChange("name", event.target.value)}
        onClear={() => onFieldChange("name", "")}
        placeholder={PROFILE_PLACEHOLDER.name}
        value={values.name}
      />

      <div className="flex items-center justify-center gap-2.5 self-stretch">
        <div className="flex flex-[1_0_0] items-center justify-center gap-100">
          <SelectField
            ariaLabel="나이"
            className="min-w-0 flex-1"
            fieldClassName="gap-0"
            onChange={(value) => onFieldChange("age", value)}
            options={AGE_OPTIONS}
            placeholder={PROFILE_PLACEHOLDER.age}
            triggerClassName={SELECT_TRIGGER_CLASS_NAME}
            value={values.age}
          />

          <span className="shrink-0 typo-body1 text-text-normal">세</span>
        </div>

        <span aria-hidden="true" className="h-3.75 w-[0.09375rem] shrink-0 bg-border-strong" />

        <SelectField
          ariaLabel="학과"
          className="min-w-0 flex-1"
          fieldClassName="gap-0"
          onChange={(value) => onFieldChange("department", value)}
          options={DEPARTMENT_OPTIONS}
          placeholder={PROFILE_PLACEHOLDER.department}
          triggerClassName={SELECT_TRIGGER_CLASS_NAME}
          value={values.department}
        />
      </div>
    </section>
  );
}

function TagSyncNoticeSection() {
  return (
    <section className="flex flex-col items-start gap-1.5 self-stretch rounded-medium bg-bg-secondary px-400 py-300">
      <h2 className="typo-title2 text-text-strong">나의 성향 태그</h2>
      <p className="typo-caption2 text-text-caption">체크리스트를 수정하면 태그가 업데이트돼요.</p>
    </section>
  );
}

function ImportanceEditSection({ items, onToggle }: ImportanceEditSectionProps) {
  return (
    <section className="flex flex-col items-start gap-1.5 self-stretch rounded-medium bg-bg-secondary px-400 py-300">
      <h2 className="typo-title2 text-text-strong">룸메이트에게 이런 점이 중요해요</h2>
      <OnBoardingPriorityStep
        className="w-full flex-none px-0 pt-3.5"
        onToggleFactor={onToggle}
        options={PRIORITY_FACTOR_OPTIONS}
        selectedFactors={items}
      />
    </section>
  );
}

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

function ProfileViewContent({ importanceItems, values }: ProfileViewContentProps) {
  return (
    <>
      <section className="flex flex-col gap-1.5 px-100 pt-300">
        <h2 className="typo-title2 text-text-strong">{values.name}</h2>
        <div className="flex items-center gap-1.5">
          <span className="typo-label2 text-text-alternative">{values.age}살</span>
          <span aria-hidden="true" className="h-3 w-px bg-neutral-300" />
          <span className="typo-label2 text-text-alternative">{values.department}</span>
        </div>
      </section>

      <div className="flex flex-wrap gap-1.5 px-100 pb-300">
        {MY_PROFILE.tags.map((tag) => (
          <Tag key={tag} color="black">
            {tag}
          </Tag>
        ))}
      </div>

      <ImportanceSection items={importanceItems} />
      <ChecklistCard items={MY_PROFILE_CHECKLIST} nickname={values.name} />
    </>
  );
}

function MyProfileEditContent({
  className,
  onBack,
  onChecklistClick,
  onEditClick,
}: MyProfileEditContentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState(INITIAL_PROFILE_FORM);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [importanceItems, setImportanceItems] = useState(MY_PROFILE_IMPORTANCE_ITEMS);

  useEffect(() => {
    return () => {
      if (profileImageUrl) {
        URL.revokeObjectURL(profileImageUrl);
      }
    };
  }, [profileImageUrl]);

  function handleEditButtonClick() {
    if (!isEditing) {
      setIsEditing(true);
      onEditClick?.();
      return;
    }

    setIsEditing(false);
  }

  function updateProfileField(key: ProfileFieldKey, value: string) {
    setProfileForm((prev) => ({ ...prev, [key]: value }));
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

      if (prev.length >= 3) {
        return [...prev.slice(1), item];
      }

      return [...prev, item];
    });
  }

  return (
    <div className={cn("relative flex h-full flex-col overflow-hidden bg-bg-primary", className)}>
      <WaveBackgroundIcon
        aria-hidden="true"
        className={WAVE_BACKGROUND_CLASS_NAME}
        preserveAspectRatio="none"
      />

      <Header
        className="absolute inset-x-0 top-0 z-20"
        onBackClick={onBack}
        showBack
        title="프로필 편집"
      />

      <main className="scrollbar-none relative z-10 min-h-0 flex-1 overflow-y-auto pb-28">
        <div className="flex flex-col gap-300 px-400 pt-36.5">
          <ProfileAvatarSection
            imageUrl={profileImageUrl}
            isEditing={isEditing}
            name={profileForm.name}
            onImageChange={updateProfileImage}
          />

          {isEditing ? (
            <>
              <ProfileEditFields onFieldChange={updateProfileField} values={profileForm} />
              <TagSyncNoticeSection />
              <ImportanceEditSection items={importanceItems} onToggle={toggleImportanceItem} />
              <ChecklistEditLink onClick={onChecklistClick} />
            </>
          ) : (
            <ProfileViewContent importanceItems={importanceItems} values={profileForm} />
          )}
        </div>
      </main>

      <div className="absolute bottom-0 left-0 right-0 z-40 bg-bg-primary px-400 pb-9 pt-300">
        <Button
          className="w-full cursor-pointer"
          onClick={handleEditButtonClick}
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
