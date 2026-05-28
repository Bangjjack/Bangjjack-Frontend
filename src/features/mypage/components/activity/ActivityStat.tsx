import { formatPeopleCount } from "@/features/mypage/utils";

interface ActivityStatProps {
  label: string;
  value: string;
}

function ActivityStat({ label, value }: ActivityStatProps) {
  return (
    <div className="flex flex-col gap-200 rounded-2xl bg-bg-primary p-2.5">
      <span className="typo-label2 text-text-placeholder">{label}</span>
      <span className="typo-title3 text-text-strong">{formatPeopleCount(value)}</span>
    </div>
  );
}

export { ActivityStat };
