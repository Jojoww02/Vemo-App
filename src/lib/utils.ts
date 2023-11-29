import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { VehicleCondition, VehicleType } from "./types";
import constants from "./constants";

/**
 * Generates dynamic CSS class names.
 * @param {...ClassValue} inputs - Array of class values or expressions.
 * @returns {string} - Concatenated CSS class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Get vehicle image URL by type ("matic" or "manual").
 * @param {VehicleType} type Vehicle type ("matic" or "manual").
 * @returns {string} Image URL.
 */
export function getVehicleImageByType(type: VehicleType): string {
  return type === "matic"
    ? constants.vehicleCard.icon.matic
    : constants.vehicleCard.icon.manual;
}

/**
 * Get description condition of vehicle condition on a numeric condition value.
 * @param {number} condition - Numeric condition value.
 * @returns {string} - description representing the condition vehicles.
 */
export function getVehicleCondition(condition: number): VehicleCondition {
  if (condition <= 30) {
    return constants.vehicleCard.indicator.bad;
  } else if (condition <= 60) {
    return constants.vehicleCard.indicator.good;
  } else {
    return constants.vehicleCard.indicator.veryGood;
  }
}

/**
 * Converts a string to CamelCase.
 * @param input - The input string to be converted.
 * @returns The string in CamelCase.
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
