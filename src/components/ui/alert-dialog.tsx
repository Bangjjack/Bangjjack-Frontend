import { AlertDialog as AlertDialogPrimitive } from "radix-ui";
import { cn } from "@/lib/cn";
import { CircleInfoIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

function AlertDialogPortal({ ...props }: AlertDialogPrimitive.AlertDialogPortalProps) {
  return <AlertDialogPrimitive.Portal {...props} />;
}

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-bg-overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  );
}

type AlertDialogContentProps = React.ComponentProps<typeof AlertDialogPrimitive.Content>;

/**
 * Alert dialogs are reserved for confirmation flows that require an explicit
 * action. Do not add overlay-click dismissal here; use a Dialog-based component
 * instead when non-modal overlay dismissal is part of the intended interaction.
 */
function AlertDialogContent({ className, children, ...props }: AlertDialogContentProps) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-75 -translate-x-1/2 -translate-y-1/2 rounded-[20px] bg-bg-secondary px-7 py-[24px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className,
        )}
        {...props}
      >
        {children}
      </AlertDialogPrimitive.Content>
    </AlertDialogPortal>
  );
}

function AlertDialogIcon({ className }: { className?: string }) {
  return (
    <div className={cn("flex justify-center", className)}>
      <CircleInfoIcon className="size-14" />
    </div>
  );
}

function AlertDialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col items-center gap-400", className)} {...props} />;
}

function AlertDialogTitle({
  className,
  icon,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title> & {
  icon?: boolean;
}) {
  return (
    <AlertDialogPrimitive.Title
      className={cn("text-center text-text-strong", icon ? "typo-title1" : "typo-h4", className)}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      className={cn("typo-caption1 text-center text-text-caption", className)}
      {...props}
    />
  );
}

function AlertDialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mt-500 flex gap-200", className)} {...props} />;
}

function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action asChild>
      <Button size="sm" className={cn("flex-1", className)} {...props} />
    </AlertDialogPrimitive.Action>
  );
}

function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel asChild>
      <Button variant="neutral" size="sm" className={cn("flex-1", className)} {...props} />
    </AlertDialogPrimitive.Cancel>
  );
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogIcon,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
};
