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
  vehicleType: VehicleType;
  licenseNumber: string;
  userId: string;
}

export interface IUpdateUser {
  userId: string;
  name: string | null;
  email: string | null;
}

export interface IVehicleResponse {
  id: string;
  name: string;
  ownerName: string;
  licenseNumber: string;
  type: VehicleType;
  condition: number;
  purchasingDate: string;
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
