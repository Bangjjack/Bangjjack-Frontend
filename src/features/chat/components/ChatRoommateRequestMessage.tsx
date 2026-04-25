import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogIcon,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@/components/ui";
import { CheckIcon } from "@/assets/icons";

export type ChatRoommateRequestMessageProps = {
  onAccept?: () => void;
  onReject?: () => void;
  requesterName: string;
};

function ChatRoommateRequestMessage({
  onAccept,
  onReject,
  requesterName,
}: ChatRoommateRequestMessageProps) {
  return (
    <AlertDialog>
      <div className="flex max-w-60 flex-col justify-center gap-300 overflow-hidden rounded-tl-2xl rounded-tr-2xl rounded-br-2xl border border-brand-primary bg-bg-secondary px-600 py-400">
        <div className="flex items-center gap-100">
          <CheckIcon className="size-3 text-brand-primary [&_path]:stroke-current" />
          <span className="typo-title4 text-text-primary-alternative">룸메이트 요청</span>
        </div>

        <div className="flex flex-col gap-100">
          <p className="typo-title3 whitespace-pre-line text-text-strong">
            {requesterName} 님이{"\n"}룸메이트를 제안했어요!
          </p>
          <p className="typo-caption2 text-text-caption">수락하면 룸메이트를 확정할 수 있어요</p>
        </div>

        <AlertDialogTrigger asChild>
          <Button className="w-full cursor-pointer rounded-medium" size="sm">
            확인하기
          </Button>
        </AlertDialogTrigger>
      </div>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogIcon />
          <AlertDialogTitle>룸메이트 요청을 수락할까요?</AlertDialogTitle>
          <AlertDialogDescription className="whitespace-normal break-keep text-center">
            수락 시 룸메이트 매칭이 확정됩니다
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-500">
          <AlertDialogCancel className="cursor-pointer" onClick={onAccept}>
            거절하기
          </AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer" onClick={onReject}>
            수락하기
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { ChatRoommateRequestMessage };
