import type { ReactNode } from "react";

interface ActivityTagProps {
  children: ReactNode;
}

function ActivityTag({ children }: ActivityTagProps) {
  return (
    <span className="typo-label1 rounded-full bg-brand-primary-light px-200 py-100 text-brand-primary">
      {children}
    </span>
  );
}

export { ActivityTag };
