// src/utils/formatHours.ts

/**
 * Formats a float string for display:
 * 3.0 → "3"
 * 3.5 → "3.5"
 * "" → ""
 */
export function formatHoursDisplay(value: string): string {
  if (value === "" || value === null || value === undefined) return "";
  const num = parseFloat(value);
  if (isNaN(num)) return value;
  // If it's a whole number, drop the decimal
  return num % 1 === 0 ? String(num) : String(num);
}

/**
 * Returns true if value is a valid hour input
 * Allows: 0, 1, 2.5, 3.0, etc.
 */
export function isValidHour(value: string): boolean {
  if (value === "") return true;
  return /^\d+(\.\d{0,1})?$/.test(value) && parseFloat(value) >= 0;
}

/**
 * Computes contact hours from all hour fields
 * Formula: L + T + P + S + I
 */
export function computeContactHours(
  L: string, T: string, P: string, S: string, I: string
): string {
  const sum = [L, T, P, S, I]
    .map((v) => (v === "" ? 0 : parseFloat(v) || 0))
    .reduce((a, b) => a + b, 0);
  return sum % 1 === 0 ? String(sum) : String(sum);
}