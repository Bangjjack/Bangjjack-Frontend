import { Toaster as Sonner, toast as sonnerToast } from "sonner";
import { CircleCheckIcon, CircleDeleteIcon } from "@/assets/icons";

/* ── Toaster (레이아웃에 한 번 배치) ── */

function Toaster() {
  return (
    <Sonner
      position="bottom-center"
      offset={110}
      toastOptions={{ unstyled: true }}
      style={{ fontFamily: "var(--font-pretendard)" }}
    />
  );
}

/* ── Toast 내부 레이아웃 ── */

function ToastContent({ icon, message }: { icon: React.ReactNode; message: string }) {
  return (
    <div className="flex w-[365px] items-center gap-[10px] rounded-medium bg-neutral-800/90 px-400 py-300">
      {icon}
      <span className="typo-button2 text-text-on-primary">{message}</span>
    </div>
  );
}

/* ── 커스텀 toast 함수 ── */

const toast = {
  success: (message: string) =>
    sonnerToast.custom(() => (
      <ToastContent
        icon={
          <CircleCheckIcon className="size-[24px] shrink-0 [&>path:first-child]:fill-brand-secondary [&>path:first-child]:stroke-brand-secondary" />
        }
        message={message}
      />
    )),

  error: (message: string) =>
    sonnerToast.custom(() => (
      <ToastContent
        icon={
          <CircleDeleteIcon className="size-[24px] shrink-0 [&>path:first-child]:fill-state-error [&>path:first-child]:stroke-state-error" />
        }
        message={message}
      />
    )),

  matching: (message: string) =>
    sonnerToast.custom(() => (
      <ToastContent icon={<CircleCheckIcon className="size-[24px] shrink-0" />} message={message} />
    )),
};

export { Toaster, toast };
