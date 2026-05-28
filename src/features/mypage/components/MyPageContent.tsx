import { MyPageActionCard } from "@/features/mypage/components/MyPageActionCard";
import { MyPageMenuSection } from "@/features/mypage/components/MyPageMenuSection";
import { MyPageProfileCard } from "@/features/mypage/components/MyPageProfileCard";
import { useMyProfileEditData } from "@/features/mypage/hooks";
import { MY_PROFILE } from "@/features/mypage/mocks";
import { cn } from "@/lib/cn";
import { parseDisplayName } from "@/lib/parseDisplayName";
import { useAuthStore } from "@/stores/authStore";

export interface MyPageContentProps {
  className?: string;
  onActivityClick?: () => void;
  onBookmarkClick?: () => void;
  onChecklistClick?: () => void;
  onProfileClick?: () => void;
}

function MyPageContent({
  className,
  onActivityClick,
  onBookmarkClick,
  onChecklistClick,
  onProfileClick,
}: MyPageContentProps) {
  const { defaultProfileForm, profileImageUrl } = useMyProfileEditData();
  const username = useAuthStore((state) => state.username);
  const profileName = defaultProfileForm.name || (username ? parseDisplayName(username) : MY_PROFILE.name);
  const profileDepartment = defaultProfileForm.department || MY_PROFILE.department;
  const birthYear = Number(defaultProfileForm.birthYear);
  const profileAge = Number.isFinite(birthYear)
    ? new Date().getFullYear() - birthYear + 1
    : MY_PROFILE.age;

  return (
    <div className={cn("flex flex-col gap-400 pt-400", className)}>
      <MyPageProfileCard
        age={profileAge}
        department={profileDepartment}
        imageUrl={profileImageUrl}
        name={parseDisplayName(profileName)}
        onClick={onProfileClick}
      />
      <MyPageActionCard
        onActivityClick={onActivityClick}
        onBookmarkClick={onBookmarkClick}
        onChecklistClick={onChecklistClick}
      />
      <MyPageMenuSection />
    </div>
  );
}

export { MyPageContent };
