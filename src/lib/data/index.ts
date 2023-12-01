import constants from "@/lib/constants";
import * as APP from "@/lib/constants/routes";
import { FeatureData, VehicleData } from "@/lib/types";

export const vehicleData: VehicleData[] = [
  {
    id: "1",
    name: "Beat Honda 2021",
    licenseNumber: "B 1234 SBO",
    type: "matic",
    condition: 20,
  },
  {
    id: "2",
    name: "Supra X 125 2018",
    licenseNumber: "AG 1234 BGH",
    type: "manual",
    condition: 80,
  },
];

export const featuresData: FeatureData[] = [
  {
    title: constants.features.requestMaintenance.title,
    image: constants.features.requestMaintenance.poster,
    path: APP.REQUEST_MAINTENANCE_VEHICLE_PAGE,
  },
  {
    title: constants.features.registerVehicle.title,
    image: constants.features.registerVehicle.poster,
    path: APP.REGISTER_VEHICLE_PAGE,
  },
];
