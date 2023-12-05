import { registerVehicleFn } from "@/api/services/vehicle";
import { IVehicle } from "@/api/types";
import { useMutation } from "@tanstack/react-query";

export default function useMutateVehicle() {
  return {
    registerVehicle: useMutation({
      mutationFn: async (VehicleData: IVehicle) => {
        await registerVehicleFn(VehicleData);
      },
    }),
  };
}
