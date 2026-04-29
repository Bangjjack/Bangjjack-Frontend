import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui";

interface MatchAlertDialogProps {
  matchRate: number;
  matchDetails: string;
  onConfirm: () => void;
  children: React.ReactNode;
}

function MatchAlertDialog({ matchRate, matchDetails, onConfirm, children }: MatchAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            나와의 매칭률은 <span className="text-text-primary-alternative">{matchRate}%</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            {matchDetails}가 일치해요!
            <br />
            매칭을 계속 진행할까요?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소하기</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>계속하기</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { MatchAlertDialog };
export type { MatchAlertDialogProps };
