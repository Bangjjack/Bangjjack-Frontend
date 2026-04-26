import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "@/components/ui";

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
  return (
    <div className="flex w-full flex-col gap-2.75 px-400">
      <h2 className="typo-title1 text-text-strong">{label}</h2>
      <div className="flex items-start gap-2.5">
        <Dropdown value={value} onChange={onChange} className="flex-1">
          <DropdownTrigger placeholder={placeholder} />
          <DropdownContent>
            {options.map((option) => (
              <DropdownItem key={option} value={option}>
                {option}
              </DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>
        {suffix ? (
          <span className="shrink-0 pt-200 typo-body1 text-text-strong">{suffix}</span>
        ) : null}
      </div>
    </div>
  );
}

export { OnBoardingSelectField };
