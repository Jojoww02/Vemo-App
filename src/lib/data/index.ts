import constants from "@/lib/constants";
import { FeatureData  } from "@/lib/types";
import { REGISTER_VEHICLE_PAGE, REQUEST_MAINTENANCE_VEHICLE_PAGE } from "../constants/routes";



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

export const componentsData = [
  {
    name: "Mesin",
    condition: 90,
  },
  {
    name: "Aki",
    condition: 70,
  },
  {
    name: "Busi",
    condition: 100,
  },
  {
    name: "Rem",
    condition: 30,
  },
  {
    name: "Oli",
    condition: 20,
  },
  {
    name: "Rantai",
    condition: 45,
  },
  {
    name: "Per",
    condition: 35,
  },
];

