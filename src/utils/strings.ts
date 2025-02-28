export function padToThreeDigits(number: number): string {
  return number.toString().padStart(3, "0");
}
