function parseDisplayName(username: string): string {
  const first = username.split("/")[0]?.trim();
  return first || username;
}

export { parseDisplayName };
