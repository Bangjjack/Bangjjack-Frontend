export const parseDepartmentName = (name: string): string => {
  return (name.split("(")[0] ?? name).trim();
};
