import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Consistently formats numbers with commas regardless of server vs client OS locale
 * (prevents React hydration mismatches between en-US server and en-IN/other client locales).
 */
export function formatNumber(num: number | string): string {
  const parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
