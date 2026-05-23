function parseUTC(dateString: string): Date {
  if (/[Zz]|[+-]\d{2}:\d{2}$/.test(dateString)) {
    return new Date(dateString);
  }
  return new Date(dateString + "Z");
}

export function formatRelativeTime(dateString: string): string {
  const now = new Date();
  const date = parseUTC(dateString);

  if (isNaN(date.getTime())) return "-";
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return "방금";
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  if (diffDays < 7) return `${diffDays}일 전`;

  const formatter = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const parts = formatter.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  return `${get("year")}/${get("month")}/${get("day")} ${get("hour")}:${get("minute")}`;
}
