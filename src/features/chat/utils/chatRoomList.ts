import { ROOMMATE_PREFERENCE_LABEL } from "@/constants";
import type { RoommatePreference } from "@/constants";
import type { ChatRoomImportancePreference, ChatRoomListItem } from "@/features/chat/types";

function parseChatRoomDate(dateString: string) {
  if (/[Zz]|[+-]\d{2}:\d{2}$/.test(dateString)) {
    return new Date(dateString);
  }

  return new Date(`${dateString}Z`);
}

export function formatChatRoomMessage(message: string | null) {
  return message ?? "아직 메시지가 없습니다.";
}

export function formatChatRoomTime(lastMessageAt: string | null) {
  if (!lastMessageAt) return "";

  const date = parseChatRoomDate(lastMessageAt);
  if (Number.isNaN(date.getTime())) return "";

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 1000 / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "방금";
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  if (diffDays < 7) return `${diffDays}일 전`;

  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function isRoommatePreference(value: string): value is RoommatePreference {
  return value in ROOMMATE_PREFERENCE_LABEL;
}

function formatImportanceTag(value?: RoommatePreference | string | null) {
  if (!value) return undefined;

  return isRoommatePreference(value) ? ROOMMATE_PREFERENCE_LABEL[value] : value;
}

function mapRoommatePreferenceTags(preference?: ChatRoomImportancePreference | null) {
  return [
    formatImportanceTag(preference?.firstPriority),
    formatImportanceTag(preference?.secondPriority),
    formatImportanceTag(preference?.thirdPriority),
  ].filter((tag): tag is string => Boolean(tag));
}

function getFirstThreeTags(tags?: string[] | null) {
  return tags?.filter(Boolean).slice(0, 3) ?? [];
}

export function getChatRoomImportanceTags(chatRoom: ChatRoomListItem) {
  const directTagSources = [
    chatRoom.partnerImportanceTags,
    chatRoom.importanceTags,
    chatRoom.priorityFactors,
  ];
  const directTags =
    directTagSources.map(getFirstThreeTags).find((tags) => tags.length > 0) ?? [];

  if (directTags.length > 0) {
    return directTags;
  }

  return mapRoommatePreferenceTags(
    chatRoom.partnerRoommatePreference ?? chatRoom.roommatePreference,
  ).slice(0, 3);
}
