export const MEMBER_ROLE = {
  LEADER: "LEADER",
  MEMBER: "MEMBER",
} as const;

export type MemberRole = (typeof MEMBER_ROLE)[keyof typeof MEMBER_ROLE];
