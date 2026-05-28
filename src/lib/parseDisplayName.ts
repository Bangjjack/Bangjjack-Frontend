function parseDisplayName(username: string): string {
  return username.split("/")[0] ?? username;
}

export { parseDisplayName };
