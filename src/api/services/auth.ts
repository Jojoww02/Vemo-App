import { baseApi, privateApi } from "@/api";
import { IGenericResponse, ICredentials, IToken, IUser, IForgotPasswordUser } from "@/api/types";
import * as API from "@/lib/constants/routes";

export const loginUserFn = async (credentials: ICredentials): Promise<IToken> => {
  const response = await baseApi.post<IToken>(API.LOGIN_SERVICE, credentials);
  return response.data;
};

export const refreshTokenFn = async (accessToken: string | null): Promise<IToken> => {
  const response = await baseApi.post<IToken>(API.REFRESH_TOKEN_SERVICE(accessToken));
  return response.data;
};

export const logoutUserFn = async (): Promise<IGenericResponse> => {
  const response = await baseApi.get<IGenericResponse>(API.LOGOUT_SERVICE);
  return response.data;
};

export const sendOtpByEmailFn = async (email: string): Promise<IGenericResponse> => {
  const response = await privateApi.post<IGenericResponse>(API.SEND_OTP_SERVICE(email));
  return response.data;
};

export const verifyOtpFn = async (otp: number): Promise<IGenericResponse> => {
  const response = await privateApi.get<IGenericResponse>(API.VERIFY_OTP_SERVICE(otp));
  return response.data;
};

export const forgotPasswordRequestFn = async (email: string): Promise<IGenericResponse> => {
  const response = await privateApi.get<IGenericResponse>(API.FORGOT_PASSWORD_REQUEST_SERVICE(email));
  return response.data;
}

export const forgotPasswordFn = async (forgotPasswordUser: IForgotPasswordUser) : Promise<IToken> => {
  const response = await privateApi.post<IToken>(API.FORGOT_PASSWORD_SERVICE, forgotPasswordUser);
  return response.data
}
