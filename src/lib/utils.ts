import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { VehicleCondition, VehicleType } from "./types";
import { MANUAL_IMG, MATIC_IMG } from "./constants";

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
  return type === "matic" ? MATIC_IMG : MANUAL_IMG;
}

/**
 * Get description condition of vehicle condition on a numeric condition value.
 * @param {number} condition - Numeric condition value.
 * @returns {string} - description representing the condition vehicles.
 */
export function getVehicleCondition(condition: number): VehicleCondition {
  if (condition <= 30) {
    return {
      color: "bg-red-500 ring-red-300/40",
      description: "Kondisi kurang baik",
    };
  } else if (condition <= 60) {
    return {
      color: "bg-yellow-500 ring-yellow-300/40",
      description: "Kondisi baik",
    };
  } else {
    return {
      color: "bg-green-500 ring-green-300/40",
      description: "Kondisi sangat baik",
    };
  }
}
