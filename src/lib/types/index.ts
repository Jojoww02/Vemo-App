export type VehicleType = "manual" | "matic";

export interface VehicleData {
  id: string;
  name: string;
  licenseNumber: string;
  type: VehicleType;
  condition: number;
}

export interface VehicleCondition {
  image: string;
  altImage: string;
  description: string;
}

export interface FeatureData {
  image: string;
  title: string;
}

export interface AnyObject {
  [key: string]: any;
}
