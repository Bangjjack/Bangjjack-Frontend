import { SelectField } from "@/components/ui";

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
    <SelectField
      className="px-400"
      label={label}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      suffix={suffix}
      value={value}
    />
  );
}

export { OnBoardingSelectField };
