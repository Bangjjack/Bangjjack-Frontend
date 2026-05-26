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
