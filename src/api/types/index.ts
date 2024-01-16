import { VehicleType } from "@/lib/types";

type ICustomer = "customer";
export type IVehicleStatus = "pending" | "approved" | "requested";
export type IUserRole = "admin" | "customer";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: ICustomer;
}

export interface IUserResponse {
  userId: string;
  name: string;
  email: string;
  role: IUserRole;
  photo: string;
}

export interface IToken {
  accessToken: string;
}

export interface IGenericResponse {
  message: string;
  error: string[] | null;
}

export interface ICredentials {
  email: string;
  password: string;
}

export interface IVehicle {
  vehicleName: string;
  ownerName: string;
  purchasingDate: string;
  licensePlate: string;
  vehicleType: VehicleType;
  lastMaintenance: number;
  userId: string;
}

export interface IUpdateUser {
  userId: string;
  name: string | null;
  email: string | null;
}

export interface IVehicleResponse {
  vehicleId: string;
  vehicleName: string;
  ownerName: string;
  purchasingDate: string;
  licensePlate: string;
  vehicleType: VehicleType;
  condition: number;
  status: IVehicleStatus;
  userId: string;
  maintenanceStatus: string;
}

export interface IChangePasswordData {
  userId: string;
  oldPassword: string;
  newPassword: string;
}

export interface IForgotPasswordUser {
  token: string | undefined;
  newPassword: string;
}

export interface IConditionParts {
  vehicleId: string;
  conditionPartId: string;
  partId: string;
  listPartId: string;
  partName: string;
  condition: number;
  userId: string;
  price: string;
}

export interface INotificationResponse {
  id: string;
  userId: string;
  title: string;
  description: string;
  read: boolean;
  category: string;
  createdAt: string;
}

export interface INotificationDelete {
  userId: string;
  listNotificationId: string[];
}

export interface IRequestMaintenance {
  contact: string;
  description: string;
  vehicleId: string | undefined;
  listPartId: string[];
}

export interface IPartResponse {
  name: string;
  ageInMonth: number;
  maintenancePrice: number;
  maintenanceServicePrice: number;
  vehicleType: string | null;
  createdAt: string;
  updatedAt: string | null;
  id: string;
}

export interface ICountVehiclesResponse {
  vehicles: number;
  matic: number;
  manual: number;
  pending: number;
  requested: number;
}

export interface IMaintenanceVehicle {
  ticket: string;
  contact: string;
  description: string;
  status: string;
  vehicleId: string;
  createdAt: string;
  updateAt: string | null;
  id: string;
}

export interface IMaintenanceParts {
  maintenanceFinalPrice: number;
  maintenanceServiceFinalPrice: number;
  maintenanceVehicleId: string;
  partId: string;
  createdAt: string;
  updatedAt: string | null;
  id: string;
}

export interface IMaintenanceVehicleResponse {
  maintenanceVehicle: IMaintenanceVehicle;
  maintenanceParts: IMaintenanceParts[];
}

export interface IMaintenanceByStatus {
  vehicleId: string | undefined;
  status: string;
}

export interface IMaintenancePrice {
  maintenancePartId: string | undefined;
  newPrice: number;
}

export interface IMaintenamceVehicleDone {
  maintenanceVehicleId: string | undefined;
  maintenancePartIds: string[];
}

export interface IMaintenanceVehicleCancel {
  maintenanceVehicleId: string;
  status: string;
  description: string;
}
