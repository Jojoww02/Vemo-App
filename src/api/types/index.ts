import { VehicleType } from "@/lib/types";

type ICustomer = "customer";
export type IVehicleStatus = "pending" | "approved";
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

export interface IParts {
  vehicleId: string;
  conditionPartId: string;
  partId: string;
  partName: string;
  condition: number;
  userId: string;
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
