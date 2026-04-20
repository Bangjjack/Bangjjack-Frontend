export function formatUnreadCount(count: number) {
  return count > 99 ? "99+" : `${count}`;
}
