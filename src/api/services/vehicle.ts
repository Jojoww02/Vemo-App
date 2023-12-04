import { privateApi } from "@/api";
import { IGenericResponse, IVehicle } from "@/api/types";
import * as API from "@/lib/constants/routes";

export const registerVehicleFn = async (registerVehicleData: IVehicle): Promise<IGenericResponse> => {
  const response = await privateApi.post<IGenericResponse>(API.REGISTER_VEHICLE_SERVICE, registerVehicleData);
  return response.data;
};
