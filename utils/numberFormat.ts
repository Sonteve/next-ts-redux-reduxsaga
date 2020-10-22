export function numberFormat(inputNumber: number) {
  return Math.floor(inputNumber)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
