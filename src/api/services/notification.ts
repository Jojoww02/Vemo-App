import { privateApi } from "@/api";
import * as API from "@/lib/constants/routes";
import { IGenericResponse, INotificationDelete, INotificationResponse } from "../types";

export const getNotificationsFn = async (): Promise<INotificationResponse[]> => {
  const response = await privateApi.get<INotificationResponse[]>(API.GET_NOTIFICATIONS_SERVICE);
  return response.data;
};

export const getCountUnreadNotificationFn = async (): Promise<number> => {
  const response = await privateApi.get<number>(API.GET_COUNT_UNREAD_NOTIFICATIONS_SERVICE);
  return response.data;
};

export const readNotificationFn = async (listNotificationId: string[]): Promise<IGenericResponse> => {
  const response = await privateApi.post<IGenericResponse>(API.READ_NOTIFICATION_SERVICE, { listNotificationId });
  return response.data;
};

export const deleteNotificationsFn = async (dataToDelete: INotificationDelete) => {
  const response = await privateApi.delete(API.DELETE_NOTIFICATIONS_SERVICE, { data: dataToDelete });
  return response.data;
};

export const getNotificationsDetailsFn = async (notificationId: string | undefined): Promise<INotificationResponse> => {
  const response = await privateApi.get<INotificationResponse>(API.GET_NOTIFICATIONS_DETAILS_SERVICE(notificationId));
  return response.data;
};
