import { ChevronRight } from "lucide-react";

import { Card } from "@/components/ui";
import { cn } from "@/lib/cn";

interface MyPageMenuItem {
  danger?: boolean;
  label: string;
}

const MENU_ITEMS: MyPageMenuItem[] = [
  { label: "로그아웃" },
  { danger: true, label: "회원 탈퇴" },
];

function MyPageMenuSection() {
  return (
    <section className="flex flex-col gap-300">
      <h2 className="typo-title2 px-0.5 text-neutral-black">기타</h2>

      <Card className="w-full gap-0 overflow-hidden rounded-2xl border-0 bg-bg-secondary p-0 py-0 shadow-none">
        {MENU_ITEMS.map((item, index) => (
          <button
            key={item.label}
            className="relative flex w-full cursor-pointer items-center justify-between p-400 text-left"
            type="button"
          >
            <span
              className={cn("typo-button2", item.danger ? "text-state-error" : "text-text-normal")}
            >
              {item.label}
            </span>
            <ChevronRight aria-hidden="true" className="size-600 shrink-0 text-icon-alternative" />
            {index < MENU_ITEMS.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-400 right-400 h-px bg-border-normal"
              />
            ) : null}
          </button>
        ))}
      </Card>
    </section>
  );
}

export { MyPageMenuSection };
