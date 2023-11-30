import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Generates dynamic CSS class names.
 * @param {...ClassValue} inputs - Array of class values or expressions.
 * @returns {string} - Concatenated CSS class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
