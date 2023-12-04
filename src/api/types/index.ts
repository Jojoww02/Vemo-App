type Customer = "customer";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: Customer;
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

export interface GenericResponse {
  message: string;
  error: string[] | null;
}

export interface ICredentials {
  email: string;
  password: string;
}
