import { useQuery } from "@tanstack/react-query";
import { getVehiclesByStatusFn } from "@/api/services/vehicle";
import { IVehicleResponse } from "@/api/types";

export function useVehiclesPending() {
  return {
    vehiclesPendingQuery: useQuery({
      queryKey: ["vehicles", "pending"],
      queryFn: async (): Promise<IVehicleResponse[]> =>
        await getVehiclesByStatusFn("pending"),
    }),
  };
}
