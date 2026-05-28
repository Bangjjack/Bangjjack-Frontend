import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogIcon,
  AlertDialogTitle,
} from "@/components/ui";

type OnBoardingSkipDialogProps = {
  onContinue: () => void;
  onSkip: () => void;
  onOpenChange: (open: boolean) => void;
  open: boolean;
};

function OnBoardingSkipDialog({
  onContinue,
  onSkip,
  onOpenChange,
  open,
}: OnBoardingSkipDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="px-7 py-[24px]">
        <AlertDialogHeader className="gap-400">
          <AlertDialogIcon />
          <AlertDialogTitle className="typo-title1">정말 건너뛸까요?</AlertDialogTitle>
          <AlertDialogDescription className="typo-caption1 whitespace-pre-line">
            체크리스트를 등록하지 않으면{"\n"}룸메이트 매칭이 불가능해요
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mt-500 flex flex-col gap-200">
          <AlertDialogAction className="w-full cursor-pointer" onClick={onSkip}>
            그래도 건너뛸래요
          </AlertDialogAction>
          <AlertDialogCancel className="w-full cursor-pointer" onClick={onContinue}>
            이어서 작성하기
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { OnBoardingSkipDialog };
