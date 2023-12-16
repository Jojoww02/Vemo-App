import { baseApi, privateApi } from "@/api";
import * as API from "@/lib/constants/routes";
import { IChangePasswordData, IGenericResponse, IToken, IUpdateUser, IUser, IUserResponse } from "@/api/types";

export const registerUserFn = async (user: IUser): Promise<IToken> => {
  const response = await baseApi.post<IToken>(API.REGISTER_USER_SERVICE, user);
  return response.data;
};

export const getMeFn = async (): Promise<IUserResponse> => {
  const response = await privateApi.get<IUserResponse>(API.GET_CURRENT_USER_SERVICE);
  return response.data;
}

export const verifyPasswordUserFn = async (verify: string): Promise<IGenericResponse> => {
  const response = await privateApi.get<IGenericResponse>(API.VERIFY_PASSWORD_USER_SERVICE(verify));
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

export const updatePhotoProfileFn = async (photo: FormData): Promise<IGenericResponse> => {
  const response = await privateApi.patch<IGenericResponse>(API.UPDATE_PHOTO_PROFILE_SERVICE, photo, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });
  return response.data;
}
