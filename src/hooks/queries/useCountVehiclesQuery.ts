import { getCountVehiclesFn } from "@/api/services/vehicle";
import { ICountVehiclesResponse } from "@/api/types";
import { useQuery } from "@tanstack/react-query";

export function useCountVehiclesQuery() {
  return {
    countVehiclesQuery: useQuery({
      queryKey: ["countVehiclesResponse"],
      queryFn: async (): Promise<ICountVehiclesResponse> =>
        await getCountVehiclesFn(),
    }),
  };
}
