import { privateApi } from "@/api";
import * as API from "@/lib/constants/routes";
import { IUserResponse } from "@/api/types";

export const getMeFn = async (): Promise<IUserResponse> => {
  const response = await privateApi.get<IUserResponse>(
    API.GET_CURRENT_USER_SERVICE
  );
  return response.data;
};
