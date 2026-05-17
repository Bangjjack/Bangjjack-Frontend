import { Tag } from "@/components/ui";
import { MY_PROFILE, MY_PROFILE_CHECKLIST } from "@/features/mypage/mocks";
import type { ProfileViewContentProps } from "@/features/mypage/types";
import { ChecklistCard, ImportanceSection } from "@/features/roommate/components";

function ProfileViewContent({ importanceItems, values }: ProfileViewContentProps) {
  return (
    <>
      <section className="flex flex-col gap-1.5 px-100 pt-300">
        <h2 className="typo-title2 text-text-strong">{values.name}</h2>
        <div className="flex items-center gap-1.5">
          <span className="typo-label2 text-text-alternative">{values.age}세</span>
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

export { ProfileViewContent };
