import { privateApi } from "@/api";
import { IGenericResponse, IVehicle, IVehicleResponse } from "@/api/types";
import * as API from "@/lib/constants/routes";

export const registerVehicleFn = async (registerVehicleData: IVehicle): Promise<IGenericResponse> => {
  const response = await privateApi.post<IGenericResponse>(API.REGISTER_VEHICLE_SERVICE, registerVehicleData);
  return response.data;
};

export const getVehiclesByUserIdFn = async (userId: string): Promise<IVehicleResponse> => {
  const response = await privateApi.get<IVehicleResponse>(API.GET_VEHICLES_BY_USERID_SERVICE(userId));
  return response.data;
}
