import type { MemberRole } from "@/constants";
import type { Dormitory, RoomSize } from "@/types";

export type RoommateGroupMember = {
  profileImage: string;
  role: MemberRole;
  userId: number;
  username: string;
};

export type MyRoommateGroup = {
  currentMemberCount: number;
  dormitory: Dormitory;
  groupId: number;
  members: RoommateGroupMember[];
  postId: number;
  postTitle: string;
  roomSize: RoomSize;
  totalCapacity: number;
};
