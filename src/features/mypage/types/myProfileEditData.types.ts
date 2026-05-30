import type { UserChecklistData } from "@/features/user/types";

type MyProfileChecklistFieldMeta = {
  id: keyof UserChecklistData;
  label: string;
  valueLabel: Record<string, string>;
};

export type { MyProfileChecklistFieldMeta };
