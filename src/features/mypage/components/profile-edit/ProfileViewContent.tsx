import { CheckIcon } from "@/assets/icons";
import { Chip } from "@/components/ui";
import { ChecklistItem } from "@/features/roommate/components";
import { MY_PROFILE_BASIC_INFO, MY_PROFILE_CHECKLIST } from "@/features/mypage/mocks";
import type { ProfileViewContentProps } from "@/features/mypage/types";

function ProfileViewContent({ importanceItems, values }: ProfileViewContentProps) {
  const basicInfoItems = [
    { label: "이름", value: values.name },
    ...MY_PROFILE_BASIC_INFO.slice(0, 4),
    { label: "학과·학년", value: `${values.department} ${values.grade}` },
    ...MY_PROFILE_BASIC_INFO.slice(4),
  ];

  return (
    <div className="flex flex-col gap-300">
      <BasicInfoCard items={basicInfoItems} />
      <ProfileChecklistCard nickname={values.name} />
      <ProfileImportanceSection items={importanceItems} />
    </div>
  );
}

function BasicInfoCard({ items }: { items: { label: string; value: string }[] }) {
  return (
    <section className="flex flex-col gap-300 rounded-medium bg-bg-secondary p-500">
      <div className="flex items-center gap-2.5 pb-1.5">
        <span className="size-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
        <h2 className="typo-title1 text-text-strong">기본 정보</h2>
      </div>

      <dl className="flex flex-col gap-300">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-300 border-border-normal pb-300 last:pb-0 [&:not(:last-child)]:border-b"
          >
            <dt className="typo-title2 shrink-0 text-text-alternative">{item.label}</dt>
            <dd className="typo-title2 min-w-0 text-right text-text-strong">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function ProfileChecklistCard({ nickname }: { nickname: string }) {
  return (
    <section className="flex flex-col gap-2.5 rounded-medium bg-bg-secondary px-400 py-450">
      <div className="flex flex-col gap-600">
        <div className="flex items-center gap-1.5">
          <CheckIcon
            aria-hidden="true"
            className="size-400 shrink-0 text-brand-primary [&_path]:stroke-current"
          />
          <h2 className="typo-title2 min-w-0 text-text-strong">{nickname} 님의 체크리스트</h2>
        </div>

        <div className="flex flex-col gap-1.5">
          {MY_PROFILE_CHECKLIST.map((item) => (
            <ChecklistItem
              key={item.id}
              isMatched={item.isMatched}
              label={item.label}
              value={item.value}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-1.5 px-1.5 py-100">
        <span className="size-1.5 rounded-full bg-state-error-2" aria-hidden="true" />
        <span className="typo-title4 text-icon-alternative">불일치</span>
      </div>
    </section>
  );
}

function ProfileImportanceSection({ items }: { items: string[] }) {
  return (
    <section className="flex flex-col gap-300 rounded-medium bg-bg-secondary px-400 py-300">
      <h2 className="typo-title2 text-text-strong">룸메이트에게 이런 점이 중요해요</h2>

      <div className="flex flex-wrap gap-1.5">
        {items.map((item, index) => (
          <Chip
            key={item}
            className="pointer-events-none"
            rank={index + 1}
            selected
            tabIndex={-1}
            variant="rank-neutral"
          >
            {item}
          </Chip>
        ))}
      </div>
    </section>
  );
}

export { ProfileViewContent };
