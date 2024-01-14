import {
  approveVehicleFn,
  getPartByVehicleIdFn,
  patchMaintenaceByPriceFn,
  patchMaintenanceByStatusFn,
  registerVehicleFn,
  requestMaintenanceFn,
} from "@/api/services/vehicle";
import {
  IMaintenanceByStatus,
  IMaintenancePrice,
  IRequestMaintenance,
  IVehicle,
} from "@/api/types";
import { useMutation } from "@tanstack/react-query";

export default function useMutateVehicle() {
  return {
    registerVehicle: useMutation({
      mutationFn: async (vehicleData: IVehicle) => {
        await registerVehicleFn(vehicleData);
      },
    }),
    approveVehicle: useMutation({
      mutationFn: async (vehicleId: string) => {
        await approveVehicleFn(vehicleId);
      },
    }),
    requestMaintenance: useMutation({
      mutationFn: async (dataToRequest: IRequestMaintenance) => {
        await requestMaintenanceFn(dataToRequest);
      },
    }),
    getPartByVehicleId: useMutation({
      mutationFn: async (vehicleId: string | undefined) => {
        await getPartByVehicleIdFn(vehicleId);
      },
    }),
    vehicleByStatus: useMutation({
      mutationFn: async (statusvehicle: IMaintenanceByStatus) => {
        await patchMaintenanceByStatusFn(statusvehicle);
      },
    }),
    partPrice: useMutation({
      mutationFn: async (price: IMaintenancePrice) => {
        await patchMaintenaceByPriceFn(price);
      },
    }),
  };
}
