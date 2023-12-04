import { VehicleType } from "@/lib/types";

type ICustomer = "customer";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: ICustomer;
}

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
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
