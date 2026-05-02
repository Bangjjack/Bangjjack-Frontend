export function formatUnreadCount(count: number) {
  if (count <= 0) {
    return null;
  }

  return count > 99 ? "99+" : `${count}`;
}
