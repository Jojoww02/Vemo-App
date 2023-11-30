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
    image: "/poster-request-vehicle.png",
    title: "Request Perawatan",
  },
  {
    image: "/poster-register-vehicle.png",
    title: "Daftarkan Kendaraan Anda",
  },
];
