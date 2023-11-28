export type VehicleType = "manual" | "matic";

export interface VehicleData {
  id: string;
  name: string;
  licenseNumber: string;
  type: VehicleType;
  condition: number;
}

export interface VehicleCondition {
  color: string;
  description: string;
}
