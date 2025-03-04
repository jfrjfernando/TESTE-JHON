export function padToThreeDigits(number: number): string {
  return number.toString().padStart(3, "0");
}

export function toURLFriendlyString(value: string) {
  return encodeURIComponent(value.replace("#", "_"));
}

export function getURLFriendlyString(value: string) {
  return value.replace("_", "#");
}
