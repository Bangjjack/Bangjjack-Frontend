import { useNavigate } from "react-router";
import { ChevronRightIcon } from "@/assets/icons";
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
  Surface,
} from "@/components/ui";
import { cn } from "@/lib/cn";
import { useAuthStore } from "@/stores/authStore";

interface MyPageMenuItem {
  danger?: boolean;
  label: string;
  type: "logout" | "withdraw";
}

const MENU_ITEMS: MyPageMenuItem[] = [
  { label: "로그아웃", type: "logout" },
  { danger: true, label: "회원 탈퇴", type: "withdraw" },
];

function MyPageMenuSection() {
  return (
    <section className="flex flex-col gap-300">
      <h2 className="typo-title2 px-0.5 text-neutral-black">기타</h2>

      <Surface padding="none" className="flex w-full flex-col gap-0 overflow-hidden">
        {MENU_ITEMS.map((item, index) => (
          <MyPageMenuButton key={item.label} index={index} item={item} />
        ))}
      </Surface>
    </section>
  );
}

function MyPageMenuButton({ index, item }: { index: number; item: MyPageMenuItem }) {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleConfirm = () => {
    if (item.type === "logout") {
      clearAuth();
      navigate("/login");
    }
  };

  const button = (
    <button
      className="relative flex w-full cursor-pointer items-center justify-between p-400 text-left"
      type="button"
    >
      <span className={cn("typo-button2", item.danger ? "text-state-error" : "text-text-normal")}>
        {item.label}
      </span>
      <ChevronRightIcon aria-hidden="true" className="size-600 shrink-0 text-icon-alternative" />
      {index < MENU_ITEMS.length - 1 ? (
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-400 right-400 h-px bg-border-normal"
        />
      ) : null}
    </button>
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{button}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{getDialogTitle(item.type)}</AlertDialogTitle>
          <AlertDialogDescription>{getDialogDescription(item.type)}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">취소</AlertDialogCancel>
          <AlertDialogAction
            className={cn("cursor-pointer", item.danger && "bg-state-error text-text-on-primary")}
            onClick={handleConfirm}
          >
            {item.label}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function getDialogTitle(type: MyPageMenuItem["type"]) {
  return type === "logout" ? "방짝에서 로그아웃하시겠어요?" : "정말 탈퇴하시겠습니까?";
}

function getDialogDescription(type: MyPageMenuItem["type"]) {
  return type === "logout" ? "다시 이용하려면 로그인이 필요해요." : "탈퇴 후에는 되돌릴 수 없어요.";
}

export { MyPageMenuSection };
