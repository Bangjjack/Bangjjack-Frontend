export function formatPeopleCount(value: string) {
  return value === "-" ? value : `${value}인`;
}
