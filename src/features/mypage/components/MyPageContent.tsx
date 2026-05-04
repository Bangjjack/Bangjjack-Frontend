import { MyPageActionCard } from "@/features/mypage/components/MyPageActionCard";
import { MyPageMenuSection } from "@/features/mypage/components/MyPageMenuSection";
import { MyPageProfileCard } from "@/features/mypage/components/MyPageProfileCard";
import { MY_PROFILE } from "@/features/mypage/mocks";
import { cn } from "@/lib/cn";

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
  return (
    <div className={cn("flex flex-col gap-400 pt-400", className)}>
      <MyPageProfileCard
        age={MY_PROFILE.age}
        department={MY_PROFILE.department}
        name={MY_PROFILE.name}
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
