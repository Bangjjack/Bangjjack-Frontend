import type { ReactNode } from "react";

import { Card } from "@/components/ui";

type SharedLifeGuideSectionCardProps = {
  children: ReactNode;
  icon: ReactNode;
  title: string;
};

function SharedLifeGuideSectionCard({ children, icon, title }: SharedLifeGuideSectionCardProps) {
  return (
    <Card className="gap-2.5 rounded-medium border-0 bg-bg-secondary p-400 py-400 shadow-none">
      <div className="flex items-center gap-200">
        <span className="flex size-4 shrink-0 items-center justify-center text-icon-primary-alternative">
          {icon}
        </span>
        <h2 className="typo-title2 text-neutral-black">{title}</h2>
      </div>
      {children}
    </Card>
  );
}

export { SharedLifeGuideSectionCard };
