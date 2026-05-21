import { Dialog as DialogPrimitive } from "radix-ui";

import { cn } from "@/lib/cn";

const BottomSheet = DialogPrimitive.Root;
const BottomSheetTrigger = DialogPrimitive.Trigger;
const BottomSheetClose = DialogPrimitive.Close;

function BottomSheetPortal(props: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal {...props} />;
}

function BottomSheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-bg-overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  );
}

function BottomSheetContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <BottomSheetPortal>
      <BottomSheetOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 mx-auto flex w-full max-w-(--width-app-shell) flex-col gap-7.5 rounded-t-[20px] bg-white px-500 pb-500 pt-500",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
          className,
        )}
        {...props}
      >
        <div aria-hidden="true" className="mx-auto h-1 w-7.5 rounded-full bg-neutral-300" />
        {children}
      </DialogPrimitive.Content>
    </BottomSheetPortal>
  );
}

type BottomSheetProps = React.ComponentProps<typeof DialogPrimitive.Root>;

export { BottomSheet, BottomSheetTrigger, BottomSheetClose, BottomSheetContent };
export type { BottomSheetProps };
