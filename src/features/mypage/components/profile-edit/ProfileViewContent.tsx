import { CheckIcon } from "@/assets/icons";
import { Button, TagSelected } from "@/components/ui";
import { ChecklistItem } from "@/features/roommate/components";
import { MY_PROFILE_BASIC_INFO } from "@/features/mypage/mocks";
import type { ProfileViewContentProps } from "@/features/mypage/types";
import type { ChecklistEntry } from "@/features/roommate/types/checklist";

function ProfileViewContent({
  checklistItems,
  importanceItems,
  onChecklistClick,
  values,
}: ProfileViewContentProps) {
  const basicInfoItems = [
    { label: "이름", value: values.name },
    ...MY_PROFILE_BASIC_INFO.slice(0, 4),
    { label: "학과·학년", value: `${values.department} ${values.grade}` },
    ...MY_PROFILE_BASIC_INFO.slice(4),
  ];

  const hasChecklist = checklistItems.length > 0;
  const hasImportanceItems = importanceItems.length > 0;

  return (
    <div className="flex flex-col gap-300">
      <BasicInfoCard items={basicInfoItems} />
      {hasChecklist ? (
        <ProfileChecklistCard items={checklistItems} nickname={values.name} />
      ) : (
        <ChecklistEmptyCard onChecklistClick={onChecklistClick} />
      )}
      {hasImportanceItems ? (
        <ProfileImportanceSection items={importanceItems} />
      ) : (
        <ImportanceEmptyCard />
      )}
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

function ProfileChecklistCard({ items, nickname }: { items: ChecklistEntry[]; nickname: string }) {
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
          {items.map((item) => (
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

function ChecklistEmptyCard({ onChecklistClick }: { onChecklistClick?: () => void }) {
  return (
    <section className="flex flex-col items-start rounded-medium border border-dashed border-brand-primary bg-bg-secondary px-400 py-450">
      <div className="flex w-full flex-col gap-400">
        <div className="flex items-center gap-1.5">
          <CheckIcon
            aria-hidden="true"
            className="size-400 shrink-0 text-brand-primary [&_path]:stroke-current"
          />
          <h2 className="typo-title2 min-w-0 text-text-strong">
            아직 체크리스트가 작성되지 않았어요
          </h2>
        </div>

        <Button className="w-full" onClick={onChecklistClick} size="sm" type="button">
          체크리스트 완성하러 가기
        </Button>
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
          <TagSelected key={item} rank={index + 1} variant="variant2">
            {item}
          </TagSelected>
        ))}
      </div>
    </section>
  );
}

function ImportanceEmptyCard() {
  return (
    <section className="flex flex-col items-start rounded-medium border border-dashed border-brand-primary bg-bg-secondary px-400 py-300">
      <div className="flex flex-col gap-1.5">
        <h2 className="typo-title2 text-text-strong">룸메이트 우선순위 조건이 작성되지 않았어요</h2>
        <p className="typo-caption2 text-text-primary-alternative">안내 문구</p>
      </div>
    </section>
  );
}

export { ProfileViewContent };
