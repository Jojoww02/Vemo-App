import { VehicleCondition, VehicleType } from "@/lib/types";
import constants from "@/lib/constants";

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
