import { AnyObject } from "@/lib/types";

/**
 * Converts a string to camelCase.
 * @param input - The input string to be converted.
 * @returns The string in camelCase.
 */
export function toCamelCase(input: string): string {
  // Split words by spaces or capital letters
  const words: string[] = input.split(/[\s]+|(?=[A-Z])/);

  // Convert each word to CamelCase
  const camelCaseWords: string[] = words.map((word, index) => {
    return index === 0
      ? word.toLowerCase()
      : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return camelCaseWords.join("");
}

/**
 * Checks if the provided object is empty.
 * @param {Object} object - The object to be checked.
 * @returns {boolean} - True if the object is empty, false otherwise.
 */
export function isObjectEmpty(object: AnyObject): boolean {
  return Object.keys(object).length === 0;
}

/**
 * Generates a random string of a specified length.
 * @param {number} length - The length of the random string.
 * @returns {string} The generated random string.
 */
export const generateRandomString = (length: number): string =>
  Array.from(
    { length },
    () =>
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[
        Math.floor(Math.random() * 62)
      ]
  ).join("");
