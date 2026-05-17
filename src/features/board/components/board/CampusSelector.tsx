import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "@/components/ui";
import { ChevronDownIcon } from "@/assets/icons";
const CAMPUSES = ["글로벌 캠퍼스", "메디컬 캠퍼스"] as const;

interface CampusSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

function CampusSelector({ value, onChange }: CampusSelectorProps) {
  return (
    <Dropdown value={value} onChange={onChange}>
      <DropdownTrigger className="flex w-fit items-center gap-[10px] rounded-none border-0 bg-transparent px-0 py-[10px]">
        <ChevronDownIcon className="size-600 shrink-0 text-text-strong" aria-hidden="true" />
        <span className="typo-title1 text-text-strong">{value}</span>
      </DropdownTrigger>
      <DropdownContent className="w-fit min-w-48">
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
