import constants from "@/lib/constants";
import { FeatureData, VehicleData } from "@/lib/types";
import { REGISTER_VEHICLE_PAGE, REQUEST_MAINTENANCE_VEHICLE_PAGE } from "../constants/routes";

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
    path: (REQUEST_MAINTENANCE_VEHICLE_PAGE),
  },
  {
    title: constants.features.registerVehicle.title,
    image: constants.features.registerVehicle.poster,
    path: (REGISTER_VEHICLE_PAGE),
  },
];

export const notificationData = [
  {
    id: 1,
    title: "Request Perawatan Motor Kamu Berhasil!",
    description: "Kamu akan dapat pesan dari mekanik kami.",
    status: 0,
    date: new Date(2023, 1, 12),
  },
  {
    id: 2,
    title: "Request Perawatan Motor Kamu Berhasil!",
    description: "Kamu akan dapat pesan dari mekanik kami.",
    status: 1,
    date: Date.now(),
  },
  {
    id: 3,
    title: "Request Perawatan Motor Kamu Berhasil!",
    description: "Kamu akan dapat pesan dari mekanik kami.",
    status: 0,
    date: Date.now(),
  },
  {
    id: 4,
    title: "Request Perawatan Motor Kamu Berhasil!",
    description: "Kamu akan dapat pesan dari mekanik kami.",
    status: 1,
    date: Date.now(),
  },
  {
    id: 5,
    title: "Request Perawatan Motor Kamu Berhasil!",
    description: "Kamu akan dapat pesan dari mekanik kami.",
    status: 0,
    date: Date.now(),
  },
  {
    id: 6,
    title: "Request Perawatan Motor Kamu Berhasil!",
    description: "Kamu akan dapat pesan dari mekanik kami.",
    status: 1,
    date: Date.now(),
  },
];

