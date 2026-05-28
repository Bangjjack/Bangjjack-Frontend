export const getAgeFromBirthYear = (birthYear: number): number => {
  return new Date().getFullYear() - birthYear;
};
