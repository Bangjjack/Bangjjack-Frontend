import { ChevronRight } from "lucide-react";

import { Card, ProfileAvatar } from "@/components/ui";

export interface MyPageProfileCardProps {
  age: number;
  department: string;
  name: string;
}

function MyPageProfileCard({ age, department, name }: MyPageProfileCardProps) {
  return (
    <Card className="w-full flex-row items-center justify-between gap-0 rounded-2xl border-0 bg-bg-secondary p-400 py-400 shadow-none">
      <div className="flex min-w-0 items-center gap-300">
        <ProfileAvatar seed={name.length} size={48} />

        <div className="flex min-w-0 flex-col justify-center gap-100">
          <h2 className="typo-title2 text-text-strong">{name}</h2>
          <div className="flex min-w-0 items-center gap-1.5 typo-label2 text-text-alternative">
            <span>{age}세</span>
            <span aria-hidden="true" className="h-3 w-px bg-border-strong" />
            <span className="truncate">{department}</span>
          </div>
        </div>
      </div>

      <button
        aria-label="프로필 상세 보기"
        className="flex size-600 shrink-0 cursor-pointer items-center justify-center text-icon-alternative"
        type="button"
      >
        <ChevronRight aria-hidden="true" className="size-600 stroke-2" />
      </button>
    </Card>
  );
}

export { MyPageProfileCard };
