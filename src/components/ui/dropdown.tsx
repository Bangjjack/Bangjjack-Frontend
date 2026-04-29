import { createContext, useContext, useEffect, useId, useRef, useState } from "react";
import { ChevronDownIcon } from "@/assets/icons";
import { cn } from "@/lib/cn";

type DropdownContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string;
  onSelect: (value: string) => void;
  listboxId: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  activeValue: string | null;
  setActiveValue: (value: string | null) => void;
  itemValues: React.RefObject<string[]>;
  itemElements: React.RefObject<Map<string, HTMLButtonElement>>;
};

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown compound components must be used within <Dropdown>");
  }
  return context;
}

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

function Dropdown({ value, onChange, children, className }: DropdownProps) {
  const [open, setOpenRaw] = useState(false);
  const [activeValue, setActiveValue] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemValues = useRef<string[]>([]);
  const itemElements = useRef<Map<string, HTMLButtonElement>>(new Map());
  const listboxId = useId();

  function setOpen(next: boolean) {
    setOpenRaw(next);
    if (!next) {
      setActiveValue(null);
    }
  }

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleFocusOut(event: FocusEvent) {
      if (containerRef.current && !containerRef.current.contains(event.relatedTarget as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    const containerEl = containerRef.current;
    containerEl?.addEventListener("focusout", handleFocusOut);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      containerEl?.removeEventListener("focusout", handleFocusOut);
    };
  }, [open]);

  return (
    <DropdownContext.Provider
      value={{
        open,
        setOpen,
        value,
        onSelect: onChange,
        listboxId,
        triggerRef,
        activeValue,
        setActiveValue,
        itemValues,
        itemElements,
      }}
    >
      <div ref={containerRef} data-slot="dropdown" className={cn("relative", className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

type DropdownTriggerProps = Omit<
  React.ComponentProps<"button">,
  "role" | "aria-haspopup" | "aria-expanded" | "aria-controls" | "type"
> & {
  placeholder?: string;
};

function DropdownTrigger({
  placeholder = "",
  className,
  children,
  onClick: onClickProp,
  onKeyDown: onKeyDownProp,
  ...props
}: DropdownTriggerProps) {
  const { open, setOpen, value, listboxId, triggerRef, setActiveValue, itemValues, itemElements } =
    useDropdownContext();
  const displayValue = value || placeholder;

  function focusItemByValue(val: string | undefined) {
    if (!val) return;
    setActiveValue(val);
    itemElements.current.get(val)?.focus();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    onKeyDownProp?.(event);
    if (event.defaultPrevented) return;

    const values = itemValues.current;
    if (values.length === 0) return;

    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();
        if (!open) {
          setOpen(true);
          requestAnimationFrame(() => focusItemByValue(values[0]));
        } else {
          focusItemByValue(values[0]);
        }
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        if (!open) {
          setOpen(true);
          requestAnimationFrame(() => focusItemByValue(values[values.length - 1]));
        } else {
          focusItemByValue(values[values.length - 1]);
        }
        break;
      }
      case "Escape": {
        if (open) {
          event.preventDefault();
          setOpen(false);
        }
        break;
      }
    }
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClickProp?.(event);
    if (event.defaultPrevented) return;
    setOpen(!open);
  }

  const defaultTriggerClassName = !children
    ? cn(
        "flex w-full cursor-pointer items-center gap-2.5 rounded-small border-[1.5px] bg-bg-secondary px-300 py-200 text-left outline-none transition-colors",
        open ? "border-border-focus-primary" : "border-border-normal",
        "focus-visible:border-border-focus-primary",
      )
    : "cursor-pointer";

  return (
    <button
      {...props}
      ref={triggerRef}
      data-slot="dropdown-trigger"
      type="button"
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={open ? listboxId : undefined}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      className={cn(defaultTriggerClassName, className)}
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

type DropdownContentProps = Omit<React.ComponentProps<"div">, "id" | "role">;

function DropdownContent({ className, children, ...props }: DropdownContentProps) {
  const { open, listboxId } = useDropdownContext();

  if (!open) return null;

  return (
    <div
      {...props}
      id={listboxId}
      role="listbox"
      data-slot="dropdown-content"
      className={cn(
        "animate-dropdown-panel absolute left-0 right-0 top-[calc(100%+4px)] z-10 flex max-h-72 flex-col gap-100 overflow-y-auto rounded-medium bg-bg-secondary px-100 py-100 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.08)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

type DropdownItemProps = Omit<
  React.ComponentProps<"button">,
  "role" | "aria-selected" | "tabIndex" | "type"
> & {
  value: string;
};

function DropdownItem({
  value,
  className,
  children,
  onClick: onClickProp,
  onKeyDown: onKeyDownProp,
  ...props
}: DropdownItemProps) {
  const {
    value: selectedValue,
    onSelect,
    setOpen,
    triggerRef,
    activeValue,
    setActiveValue,
    itemValues,
    itemElements,
  } = useDropdownContext();
  const isSelected = selectedValue === value;
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;

    const valuesRef = itemValues.current;
    const elementsRef = itemElements.current;

    // Register value and element
    if (!valuesRef.includes(value)) {
      valuesRef.push(value);
    }
    elementsRef.set(value, el);

    return () => {
      const idx = valuesRef.indexOf(value);
      if (idx !== -1) {
        valuesRef.splice(idx, 1);
      }
      elementsRef.delete(value);
    };
  }, [value, itemValues, itemElements]);

  function focusItemByValue(val: string | undefined) {
    if (!val) return;
    setActiveValue(val);
    itemElements.current.get(val)?.focus();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    onKeyDownProp?.(event);
    if (event.defaultPrevented) return;

    const values = itemValues.current;
    const currentIndex = values.indexOf(value);

    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();
        const nextIndex = currentIndex + 1 < values.length ? currentIndex + 1 : 0;
        focusItemByValue(values[nextIndex]);
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        const prevIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : values.length - 1;
        focusItemByValue(values[prevIndex]);
        break;
      }
      case "Home": {
        event.preventDefault();
        focusItemByValue(values[0]);
        break;
      }
      case "End": {
        event.preventDefault();
        focusItemByValue(values[values.length - 1]);
        break;
      }
      case "Escape": {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        break;
      }
      case "Enter":
      case " ": {
        event.preventDefault();
        onSelect(value);
        setOpen(false);
        triggerRef.current?.focus();
        break;
      }
    }
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClickProp?.(event);
    if (event.defaultPrevented) return;
    onSelect(value);
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <button
      {...props}
      ref={buttonRef}
      data-slot="dropdown-item"
      role="option"
      aria-selected={isSelected}
      type="button"
      tabIndex={activeValue === value ? 0 : -1}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      className={cn(
        "w-full rounded-medium px-[10px] py-200 text-left typo-body1 cursor-pointer transition-colors",
        isSelected
          ? "font-bold text-brand-primary hover:bg-brand-primary-light/50"
          : "font-medium text-text-strong hover:bg-neutral-100",
        className,
      )}
    >
      {children}
    </button>
  );
}

export { Dropdown, DropdownTrigger, DropdownContent, DropdownItem };
export type { DropdownProps };
