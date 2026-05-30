function parseDisplayName(username: string | null | undefined): string {
  if (!username) return "";
  const first = username.split("/")[0]?.trim();
  return first || username;
}

export { parseDisplayName };
