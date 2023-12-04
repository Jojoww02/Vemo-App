import { baseApi } from "@/api";
import { IGenericResponse, ICredentials, IToken, IUser } from "@/api/types";
import * as API from "@/lib/constants/routes";

export const registerUserFn = async (user: IUser): Promise<IToken> => {
  const response = await baseApi.post<IToken>(API.REGISTER_SERVICE, user);
  return response.data;
};

export const loginUserFn = async (credentials: ICredentials): Promise<IToken> => {
  const response = await baseApi.post<IToken>(API.LOGIN_SERVICE, credentials);
  return response.data;
};

export const refreshTokenFn = async (): Promise<IToken> => {
  const response = await baseApi.get<IToken>(API.REFRESH_TOKEN_SERVICE);
  return response.data;
};

export const logoutUserFn = async (): Promise<IGenericResponse> => {
  const response = await baseApi.get<IGenericResponse>(API.LOGOUT_SERVICE);
  return response.data;
};
