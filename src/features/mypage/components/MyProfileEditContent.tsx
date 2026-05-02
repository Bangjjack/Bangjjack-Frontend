import { WaveBackgroundIcon } from "@/assets/icons";
import { Button, Header, ProfileAvatar, Tag } from "@/components/ui";
import {
  MY_PROFILE,
  MY_PROFILE_CHECKLIST,
  MY_PROFILE_IMPORTANCE_ITEMS,
} from "@/features/mypage/mocks";
import { ChecklistCard, ImportanceSection } from "@/features/roommate/components";
import { cn } from "@/lib/cn";

export interface MyProfileEditContentProps {
  className?: string;
  onBack: () => void;
  onEditClick?: () => void;
}

function MyProfileEditContent({ className, onBack, onEditClick }: MyProfileEditContentProps) {
  return (
    <div className={cn("relative flex h-full flex-col overflow-hidden bg-bg-primary", className)}>
      <WaveBackgroundIcon
        aria-hidden="true"
        className="absolute left-0 -top-0.75 w-full"
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
          <div className="flex flex-col items-start px-3.5">
            <ProfileAvatar seed={MY_PROFILE.name.length} size={100} />
          </div>

          <section className="flex flex-col gap-1.5 px-100 pt-300">
            <h2 className="typo-title1 text-text-strong">{MY_PROFILE.name}</h2>
            <div className="flex items-center gap-1.5">
              <span className="typo-label2 text-text-alternative">{MY_PROFILE.age}세</span>
              <span aria-hidden="true" className="h-3 w-px bg-neutral-300" />
              <span className="typo-label2 text-text-alternative">{MY_PROFILE.department}</span>
            </div>
          </section>

          <div className="flex flex-wrap gap-1.5 px-100 pb-300">
            {MY_PROFILE.tags.map((tag) => (
              <Tag key={tag} color="black">
                {tag}
              </Tag>
            ))}
          </div>

          <ImportanceSection items={MY_PROFILE_IMPORTANCE_ITEMS} />
          <ChecklistCard items={MY_PROFILE_CHECKLIST} nickname={MY_PROFILE.name} />
        </div>
      </main>

      <div className="absolute bottom-0 left-0 right-0 z-40 px-400 pb-9 pt-300">
        <Button className="w-full cursor-pointer" onClick={onEditClick} type="button">
          수정하기
        </Button>
      </div>
    </div>
  );
}

export { MyProfileEditContent };
