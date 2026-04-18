import { cn } from "@/lib/cn";
import { WriteIcon } from "@/assets/icons";

type RoundButtonProps = Omit<React.ComponentProps<"button">, "children"> & {
  label?: string;
};

function RoundButton({ className, label = "룸메이트 모집하기", ...props }: RoundButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "fixed bottom-26.75 left-1/2 z-50 -translate-x-1/2 flex cursor-pointer items-center gap-2.5 rounded-full bg-button-primary px-400 py-200 shadow-[0px_3px_12px_0px_rgba(0,0,0,0.24)] hover:brightness-95 active:bg-button-primary-pressed",
        className,
      )}
      {...props}
    >
      <WriteIcon className="size-500 shrink-0 text-icon-on-primary" aria-hidden="true" />
      <span className="typo-button2 text-icon-on-primary">{label}</span>
    </button>
  );
}

export { RoundButton };
export type { RoundButtonProps };
