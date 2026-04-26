import { createContext, useContext, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@/assets/icons";
import { cn } from "@/lib/cn";

type DropdownContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string;
  onSelect: (value: string) => void;
};

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown compound components must be used within <Dropdown>");
  }
  return context;
}

type DropdownProps = {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
};

function Dropdown({ value, onChange, children, className }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (!open) return;

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <DropdownContext.Provider value={{ open, setOpen, value, onSelect: onChange }}>
      <div ref={containerRef} data-slot="dropdown" className={cn("relative", className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

function DropdownTrigger({
  placeholder = "",
  className,
  children,
  ...props
}: React.ComponentProps<"button"> & {
  placeholder?: string;
}) {
  const { open, setOpen, value } = useDropdownContext();
  const displayValue = value || placeholder;

  return (
    <button
      data-slot="dropdown-trigger"
      type="button"
      aria-expanded={open}
      onClick={() => setOpen(!open)}
      className={cn(
        !children &&
          "flex w-full items-center gap-2.5 rounded-small border-[1.5px] bg-bg-secondary px-300 py-200 text-left outline-none transition-colors cursor-pointer",
        !children &&
          (open ? "border-border-focus-primary" : "border-border-normal"),
        !children && "focus-visible:border-border-focus-primary",
        "cursor-pointer",
        className,
      )}
      {...props}
    >
      {children ?? (
        <>
          <span
            className={
              value
                ? "flex-1 typo-body1 text-text-strong"
                : "flex-1 typo-body1 text-text-placeholder"
            }
          >
            {displayValue}
          </span>
          <ChevronDownIcon
            className={cn(
              "size-600 shrink-0 text-icon-normal transition-transform",
              open && "rotate-180",
            )}
          />
        </>
      )}
    </button>
  );
}

function DropdownContent({ className, children, ...props }: React.ComponentProps<"div">) {
  const { open } = useDropdownContext();

  if (!open) return null;

  return (
    <div
      data-slot="dropdown-content"
      className={cn(
        "animate-dropdown-panel absolute left-0 right-0 top-[calc(100%+4px)] z-10 flex max-h-72 flex-col gap-300 overflow-y-auto rounded-medium bg-bg-secondary py-100 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.08)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function DropdownItem({
  value,
  className,
  children,
  ...props
}: React.ComponentProps<"button"> & {
  value: string;
}) {
  const { value: selectedValue, onSelect, setOpen } = useDropdownContext();
  const isSelected = selectedValue === value;

  return (
    <button
      data-slot="dropdown-item"
      type="button"
      onClick={() => {
        onSelect(value);
        setOpen(false);
      }}
      className={cn(
        "w-full rounded-medium px-300 py-100 text-left typo-body1 cursor-pointer transition-colors",
        isSelected
          ? "font-bold text-brand-primary hover:bg-brand-primary-light/50"
          : "font-medium text-text-strong hover:bg-neutral-100",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export { Dropdown, DropdownTrigger, DropdownContent, DropdownItem };
export type { DropdownProps };
