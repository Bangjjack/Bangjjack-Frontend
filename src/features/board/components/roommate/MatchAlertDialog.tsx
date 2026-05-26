import { Fragment } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui";

interface MatchAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  matchRate: number;
  matchHighlights: string[];
  onConfirm: () => void;
}

function MatchAlertDialog({
  open,
  onOpenChange,
  matchRate,
  matchHighlights,
  onConfirm,
}: MatchAlertDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {"나와의 매칭률은 "}
            <span className="text-brand-primary">{matchRate}%</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            {matchHighlights.map((highlight, i) => (
              <Fragment key={i}>
                {i > 0 && ", "}
                <span className="text-brand-primary">{highlight}</span>
              </Fragment>
            ))}
            {matchHighlights.length > 0 && "이 일치해요!"}
            <br />
            {"AI 매칭 리포트를 확인할 수 있어요"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소하기</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>확인하기</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { MatchAlertDialog };
export type { MatchAlertDialogProps };
