import { useMutation } from "@tanstack/react-query";
import { deleteNotificationsFn, getNotificationsDetailsFn, readNotificationFn } from "@/api/services/notification";
import { INotificationDelete } from "@/api/types";

export default function useMutateNotification() {
  return {
    readNotification: useMutation({
      mutationFn: async (listNotificationId: string[]) => {
        await readNotificationFn(listNotificationId);
      },
    }),
    deleteNotifications: useMutation({
      mutationFn: async (dataToDelete: INotificationDelete) => {
        await deleteNotificationsFn(dataToDelete);
      },
    }),
    notificationDetails: useMutation({
      mutationFn: async (notification: string) => {
        await getNotificationsDetailsFn(notification);
      },
    }),
  };
}
