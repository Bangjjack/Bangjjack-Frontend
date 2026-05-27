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

const DEFAULT_DESCRIPTION = "나와 딱 맞는 룸메이트를 찾으려면\n몇 가지 정보가 필요해요";

type ChecklistRequiredDialogProps = {
  description?: string;
  highlight?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

function renderDescription(description: string, highlight?: string) {
  if (!highlight) return description;

  return description.split(highlight).map((part, index, parts) => (
    <span key={index}>
      {part}
      {index < parts.length - 1 && <span className="text-brand-primary">{highlight}</span>}
    </span>
  ));
}

function ChecklistRequiredDialog({
  description = DEFAULT_DESCRIPTION,
  highlight,
  open,
  onOpenChange,
  onConfirm,
}: ChecklistRequiredDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="whitespace-pre-line">
            {"아직 체크리스트가\n작성되지 않았어요"}
          </AlertDialogTitle>
          <AlertDialogDescription className="whitespace-pre-line">
            {renderDescription(description, highlight)}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="flex-1">취소하기</AlertDialogCancel>
          <AlertDialogAction className="flex-1" onClick={onConfirm}>
            작성하러 가기
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { ChecklistRequiredDialog };
export type { ChecklistRequiredDialogProps };
