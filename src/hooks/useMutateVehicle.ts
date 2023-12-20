import { approveVehicleFn, registerVehicleFn, requestMaintenanceFn } from "@/api/services/vehicle";
import { IRequestMaintenance, IVehicle } from "@/api/types";
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
      }
    })
  };
}
