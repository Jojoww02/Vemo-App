import { privateApi } from "@/api";
import { IGenericResponse, IConditionParts, IRequestMaintenance, IVehicle, IVehicleResponse, IVehicleStatus, IPartResponse, ICountVehiclesResponse, IMaintenanceVehicleResponse, IMaintenanceByStatus, IMaintenancePrice, IMaintenanceVehicle } from "@/api/types";
import * as API from "@/lib/constants/routes";

export const registerVehicleFn = async (registerVehicleData: IVehicle): Promise<IGenericResponse> => {
  const response = await privateApi.post<IGenericResponse>(API.REGISTER_VEHICLE_SERVICE, registerVehicleData);
  return response.data;
};

export const getVehiclesByUserIdFn = async (userId: string): Promise<IVehicleResponse[]> => {
  const response = await privateApi.get<IVehicleResponse[]>(API.GET_VEHICLES_BY_USERID_SERVICE(userId));
  return response.data;
};

export const getVehicleByIdFn = async (vehicleId: string | undefined): Promise<IVehicleResponse> => {
  const response = await privateApi.get<IVehicleResponse>(API.GET_VEHICLE_BY_ID_SERVICE(vehicleId));
  return response.data;
};

export const getVehiclesByStatusFn = async (status: IVehicleStatus): Promise<IVehicleResponse[]> => {
  const response = await privateApi.get<Promise<IVehicleResponse[]>>(API.GET_VEHICLES_BY_STATUS_SERVICE(status));
  return response.data;
};

export const getVehiclePartsConditionFn = async (vehicleId: string | undefined): Promise<IConditionParts[]> => {
  const response = await privateApi.get<IConditionParts[]>(API.VEHICLE_PARTS_PAGE(vehicleId));
  return response.data;
};

export const approveVehicleFn = async (vehicleId: string) => {
  const response = await privateApi.post(API.APPROVE_VEHICLE_SERVICE(vehicleId));
  return response.data;
};

export const requestMaintenanceFn = async (dataToRequest: IRequestMaintenance) => {
  const response = await privateApi.post(API.REQUEST_MAINTENANCE_SERVICE, dataToRequest);
  return response.data;
};

export const getPartByVehicleIdFn = async (vehicleId: string | undefined): Promise<IPartResponse[]> => {
  const response = await privateApi.get<IPartResponse[]>(API.GET_PARTS_BY_VEHICLEID_SERVICE(vehicleId));
  return response.data;
};

export const getCountVehiclesFn = async (): Promise<ICountVehiclesResponse> => {
  const response = await privateApi.get<ICountVehiclesResponse>(API.ADMIN_COUNT_VEHICLES_SERVICE);
  return response.data;
};

export const getMaintenancesVehiclesByVehicleIdFn = async (vehicleId: string | undefined): Promise<IMaintenanceVehicleResponse> => {
  const response = await privateApi.get<IMaintenanceVehicleResponse>(API.GET_MAINTENANCE_VEHICLE_BY_VEHICLEID_SERVICE(vehicleId));
  return response.data;
};

export const getVehiclesByMaintenancesStatusFn = async (maintenanceStatus: string): Promise<IVehicleResponse[]> => {
  const response = await privateApi.get<IVehicleResponse[]>(API.GET_VEHICLES_BY_MAINTENANCE_STATUS_SERVICE(maintenanceStatus));
  return response.data;
};

export const patchMaintenanceByStatusFn = async (vehicleByStatus: IMaintenanceByStatus): Promise<IGenericResponse> => {
  const response = await privateApi.patch<IGenericResponse>(API.PATCH_MAINTENANCES_VEHICLE_BY_STATUS_SERVICE, vehicleByStatus)
  return response.data
};

export const patchMaintenaceByPriceFn = async (price: IMaintenancePrice ): Promise<IGenericResponse> => {
  const response = await privateApi.patch<IGenericResponse>(API.PATCH_MAINTENANCES_PART_PRICE_SERVICE, price)
  return response.data
};

export const getMaintenancesByUserIdFn = async (userId: string | undefined): Promise<IMaintenanceVehicle[]> => {
  const response = await privateApi.get<IMaintenanceVehicle[]>(API.GET_MAINTENANCE_BY_VEHICLEID_SERVICE(userId));
  return response.data;
};

export const getMaintenancesDetailByMaintenanceIdFn = async (maintenanceId: string | undefined): Promise<IMaintenanceVehicleResponse> => {
  const response = await privateApi.get<IMaintenanceVehicleResponse>(API.GET_MAINTENANCE_BY_VEHICLEID_DETAILS_SERVICE(maintenanceId));
  return response.data;
};