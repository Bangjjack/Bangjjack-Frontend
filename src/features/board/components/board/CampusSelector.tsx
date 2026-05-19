import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "@/components/ui";
import { ChevronDownIcon } from "@/assets/icons";
const CAMPUSES = ["글로벌 캠퍼스", "메디컬 캠퍼스"] as const;
const ALL_CAMPUS_LABEL = "전체";

interface CampusSelectorProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

function CampusSelector({ value, onChange }: CampusSelectorProps) {
  const displayValue = value ?? ALL_CAMPUS_LABEL;

  return (
    <Dropdown value={displayValue} onChange={(v) => onChange(v === ALL_CAMPUS_LABEL ? null : v)}>
      <DropdownTrigger className="flex w-fit items-center gap-[10px] rounded-none border-0 bg-transparent px-0 py-[10px]">
        <ChevronDownIcon className="size-600 shrink-0 text-text-strong" aria-hidden="true" />
        <span className="typo-title1 text-text-strong">{displayValue}</span>
      </DropdownTrigger>
      <DropdownContent className="w-fit min-w-48">
        <DropdownItem value={ALL_CAMPUS_LABEL}>{ALL_CAMPUS_LABEL}</DropdownItem>
        {CAMPUSES.map((campus) => (
          <DropdownItem key={campus} value={campus}>
            {campus}
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
}

export { CampusSelector, CAMPUSES };
