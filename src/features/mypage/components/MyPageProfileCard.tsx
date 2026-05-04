import { ChevronRightIcon } from "@/assets/icons";
import { Card, ProfileAvatar } from "@/components/ui";
import { cn } from "@/lib/cn";

export interface MyPageProfileCardProps {
  age: number;
  department: string;
  name: string;
  onClick?: () => void;
}

function MyPageProfileCard({ age, department, name, onClick }: MyPageProfileCardProps) {
  return (
    <Card
      className={cn(
        "w-full flex-row items-center justify-between gap-0 rounded-2xl border-0 bg-bg-secondary p-400 py-400 shadow-none",
        onClick && "cursor-pointer",
      )}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (event) => {
              if (event.key !== "Enter" && event.key !== " ") {
                return;
              }

              event.preventDefault();
              onClick();
            }
          : undefined
      }
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
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

      <div
        aria-hidden="true"
        className="flex size-600 shrink-0 items-center justify-center text-icon-alternative"
      >
        <ChevronRightIcon aria-hidden="true" className="size-600" />
      </div>
    </Card>
  );
}

export { MyPageProfileCard };
