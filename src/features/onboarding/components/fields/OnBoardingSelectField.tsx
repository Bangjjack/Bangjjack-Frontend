import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@/assets/icons";
import { cn } from "@/lib/cn";

type OnBoardingSelectFieldProps = {
  label: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder: string;
  suffix?: string;
  value: string;
};

function OnBoardingSelectField({
  label,
  onChange,
  options,
  placeholder,
  suffix,
  value,
}: OnBoardingSelectFieldProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const displayValue = value || placeholder;

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
    <div ref={containerRef} className="flex w-full flex-col gap-2.75 px-400">
      <h2 className="typo-title1 text-text-strong">{label}</h2>
      <div className="flex items-start gap-2.5">
        <div className="relative flex-1">
          <button
            type="button"
            aria-label={`${label}: ${displayValue}`}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-small border-[1.5px] bg-bg-secondary px-300 py-200 text-left outline-none transition-colors cursor-pointer",
              open ? "border-border-focus-primary" : "border-border-normal",
              "focus-visible:border-border-focus-primary",
            )}
          >
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
          </button>

          {open ? (
            <div className="animate-dropdown-panel absolute left-0 right-0 top-[calc(100%+8px)] z-10 flex max-h-72 flex-col gap-300 overflow-y-auto rounded-medium bg-bg-secondary py-100 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.08)]">
              {options.map((option) => {
                const isSelected = value === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      onChange(option);
                      setOpen(false);
                    }}
                    className={cn(
                      "w-full rounded-medium px-300 py-100 text-left typo-body1 cursor-pointer transition-colors",
                      isSelected
                        ? "font-bold text-brand-primary hover:bg-brand-primary-light/50"
                        : "font-medium text-text-strong hover:bg-neutral-100",
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
        {suffix ? (
          <span className="shrink-0 pt-200 typo-body1 text-text-strong">{suffix}</span>
        ) : null}
      </div>
    </div>
  );
}

export { OnBoardingSelectField };
