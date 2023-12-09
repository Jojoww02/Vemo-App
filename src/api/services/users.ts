import { privateApi } from "@/api";
import * as API from "@/lib/constants/routes";
import { IChangePasswordData, IGenericResponse, IUpdateUser, IUserResponse } from "@/api/types";

export const getMeFn = async (): Promise<IUserResponse> => {
  const response = await privateApi.get<IUserResponse>(API.GET_CURRENT_USER_SERVICE);
  return response.data;
}

export const verifyPasswordUserFn = async (password: string): Promise<IGenericResponse> => {
  const response = await privateApi.get<IGenericResponse>(API.VERIFY_PASSWORD_USER_SERVICE(password));
  return response.data;
}

export const updateUserFn = async (dataUserToBeUpdated: IUpdateUser): Promise<IGenericResponse> => {
  const response = await privateApi.put<IGenericResponse>(API.UPDATE_USER_SERVICE, dataUserToBeUpdated);
  return response.data;
}

export const changePasswordFn = async (changePasswordData: IChangePasswordData): Promise<IGenericResponse> => {
  const response = await privateApi.patch<IGenericResponse>(API.CHANGE_PASSWORD_SERVICE, changePasswordData);
  return response.data;
};
