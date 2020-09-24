export function getOneYearLater() {
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
  return oneYearFromNow;
}
