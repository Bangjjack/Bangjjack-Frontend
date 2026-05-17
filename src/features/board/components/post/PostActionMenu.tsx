import { useRef, useState } from "react";
import { useNavigate } from "react-router";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogIcon,
  AlertDialogTitle,
} from "@/components/ui";
import { useClickOutside } from "@/hooks";
import { cn } from "@/lib/cn";

type PostActionMenuProps = {
  postId: string;
  isOpen: boolean;
  onToggle: () => void;
};

function PostActionMenu({ postId, isOpen, onToggle }: PostActionMenuProps) {
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useClickOutside(menuRef, () => {
    if (isOpen) {
      onToggle();
    }
  });

  function handleDeleteConfirm() {
    // TODO: 삭제 API 연동
    navigate("/board");
  }

  return (
    <>
      {isOpen && (
        <div
          ref={menuRef}
          className="animate-dropdown-panel absolute right-400 top-[72px] z-50 flex w-[120px] flex-col gap-100 overflow-hidden rounded-medium bg-bg-secondary px-100 py-100 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.08)]"
        >
          <button
            type="button"
            className="w-full cursor-pointer rounded-medium px-[10px] py-200 text-left font-medium text-text-strong typo-body1 transition-colors hover:bg-neutral-100"
            onClick={() => {
              onToggle();
              navigate(`/board/${postId}/edit`);
            }}
          >
            수정
          </button>
          <button
            type="button"
            className={cn(
              "w-full cursor-pointer rounded-medium px-[10px] py-200 text-left font-medium typo-body1 transition-colors",
              "text-state-error hover:bg-neutral-100",
            )}
            onClick={() => {
              onToggle();
              setIsDeleteDialogOpen(true);
            }}
          >
            삭제
          </button>
        </div>
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogIcon />
            <AlertDialogTitle icon>정말 삭제하시겠어요?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export { PostActionMenu };
export type { PostActionMenuProps };
