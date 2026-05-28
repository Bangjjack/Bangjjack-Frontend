export * from "@/features/chat/utils/chatComposerMessages";

export function formatUnreadCount(count: number) {
  if (count <= 0) {
    return null;
  }

  return count > 99 ? "99+" : `${count}`;
}

export function formatMessageTime(createdAt: string) {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return createdAt;
  }

  return new Intl.DateTimeFormat("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function getDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getStartOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getDayDifferenceFromToday(date: Date) {
  const today = getStartOfDay(new Date());
  const targetDate = getStartOfDay(date);
  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  return Math.round((today.getTime() - targetDate.getTime()) / millisecondsPerDay);
}

export function formatMessageDateLabel(createdAt: string) {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return {
      dateKey: createdAt,
      dateLabel: createdAt,
    };
  }

  const dayDifference = getDayDifferenceFromToday(date);

  return {
    dateKey: getDateKey(date),
    dateLabel:
      dayDifference === 0
        ? "오늘"
        : dayDifference === 1
          ? "어제"
          : new Intl.DateTimeFormat("ko-KR", {
              day: "numeric",
              month: "long",
              weekday: "long",
              year: "numeric",
            }).format(date),
  };
}
