import { privateApi } from "@/api";
import { IGenericResponse, IVehicle, IVehicleResponse, IVehicleStatus } from "@/api/types";
import * as API from "@/lib/constants/routes";

export const registerVehicleFn = async (registerVehicleData: IVehicle): Promise<IGenericResponse> => {
  const response = await privateApi.post<IGenericResponse>(API.REGISTER_VEHICLE_SERVICE, registerVehicleData);
  return response.data;
};

export const getVehiclesByUserIdFn = async (userId: string): Promise<IVehicleResponse[]> => {
  const response = await privateApi.get<IVehicleResponse[]>(API.GET_VEHICLES_BY_USERID_SERVICE(userId));
  return response.data;
}

export const getVehicleByIdFn = async (vehicleId: string | undefined): Promise<IVehicleResponse> => {
  const response = await privateApi.get<IVehicleResponse>(API.GET_VEHICLE_BY_ID_SERVICE(vehicleId));
  return response.data;
}

export const getVehiclesByStatusFn = async (status: IVehicleStatus): Promise<IVehicleResponse[]> => {
  const response = await privateApi.get<Promise<IVehicleResponse[]>>(API.GET_VEHICLES_BY_STATUS_SERVICE(status));
  return response.data;
}

export const approveVehicleFn = async (vehicleId: string) => {
  const response = await privateApi.post(API.APPROVE_VEHICLE_SERVICE(vehicleId));
  return response.data;
}
