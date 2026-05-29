import { ChevronDownIcon } from "@/assets/icons";
import { cn } from "@/lib/cn";
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "@/components/ui/dropdown";

type SelectFieldProps = {
  ariaLabel?: string;
  className?: string;
  fieldClassName?: string;
  label?: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder: string;
  suffix?: string;
  suffixClassName?: string;
  triggerClassName?: string;
  value: string;
};

function SelectField({
  ariaLabel,
  className,
  fieldClassName,
  label,
  onChange,
  options,
  placeholder,
  suffix,
  suffixClassName,
  triggerClassName,
  value,
}: SelectFieldProps) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-2.75", className ?? "w-full")}>
      {label ? <h2 className="typo-title1 text-text-strong">{label}</h2> : null}

      <div className={cn("flex min-w-0 items-start gap-2.5", fieldClassName)}>
        <Dropdown className="min-w-0 flex-1" onChange={onChange} value={value}>
          <DropdownTrigger
            aria-label={ariaLabel ?? label}
            className={cn(
              "flex min-w-0 w-full items-center gap-2.5 overflow-hidden",
              triggerClassName,
            )}
            placeholder={placeholder}
          >
            {triggerClassName ? (
              <>
                <span
                  className={cn(
                    "min-w-0 flex-1 truncate text-left",
                    value ? "text-text-strong" : "text-text-placeholder",
                  )}
                >
                  {value || placeholder}
                </span>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="size-600 shrink-0 text-icon-normal [&_path]:stroke-current"
                />
              </>
            ) : undefined}
          </DropdownTrigger>

          <DropdownContent>
            {options.map((option) => (
              <DropdownItem key={option} className="truncate" title={option} value={option}>
                {option}
              </DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>

        {suffix ? (
          <span className={cn("shrink-0 pt-200 typo-body1 text-text-strong", suffixClassName)}>
            {suffix}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export { SelectField };
export type { SelectFieldProps };
