import constants from "@/lib/constants";
import { FeatureData } from "@/lib/types";
import {
  REGISTER_VEHICLE_PAGE,
  REQUEST_MAINTENANCE_VEHICLE_PAGE,
} from "../constants/routes";

export const featuresData: FeatureData[] = [
  {
    title: constants.features.registerVehicle.title,
    image: constants.features.registerVehicle.poster,
    path: REGISTER_VEHICLE_PAGE,
  },
  {
    title: constants.features.requestMaintenance.title,
    image: constants.features.requestMaintenance.poster,
    path: REQUEST_MAINTENANCE_VEHICLE_PAGE,
  },
];
