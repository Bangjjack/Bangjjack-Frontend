import { Button } from "@/components/ui";

import type { ButtonProps } from "@/components/ui";
import type { MyRecruitPostActionTone } from "@/features/mypage/types";

interface ActivityButtonProps {
  label: string;
  onClick?: () => void;
  tone: MyRecruitPostActionTone;
}

function ActivityButton({ label, onClick, tone }: ActivityButtonProps) {
  return (
    <Button
      className="h-9 cursor-pointer py-200"
      onClick={onClick}
      size="sm"
      type="button"
      variant={getActionButtonVariant(tone)}
    >
      {label}
    </Button>
  );
}

function getActionButtonVariant(tone: MyRecruitPostActionTone): ButtonProps["variant"] {
  if (tone === "dark") {
    return "black";
  }

  if (tone === "neutral") {
    return "neutral";
  }

  return "default";
}

export { ActivityButton };
