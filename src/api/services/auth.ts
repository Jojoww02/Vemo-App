import { baseApi } from "@/api";
import { ICredentials, IToken, IUser } from "@/api/types";
import { ACCESS_TOKEN_KEY } from "@/lib/constants";
import * as API from "@/lib/constants/routes";

export const registerUserFn = async (user: IUser): Promise<IToken> => {
  const response = await baseApi.post<IToken>(API.REGISTER_SERVICE, user);
  return response.data;
};

export const loginUserFn = async (
  credentials: ICredentials
): Promise<IToken> => {
  const response = await baseApi.post<IToken>(API.LOGIN_SERVICE, credentials);
  return response.data;
};

export const refreshTokenFn = async (): Promise<IToken> => {
  const response = await baseApi.get<IToken>(API.REFRESH_TOKEN_SERVICE);
  localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken);
  return response.data;
};
