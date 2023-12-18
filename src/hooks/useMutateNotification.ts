import { useMutation } from "@tanstack/react-query";
import { deleteNotificationsFn, readNotificationFn } from "@/api/services/notification";
import { INotificationDelete } from "@/api/types";

export default function useMutateNotification() {
  return {
    readNotification: useMutation({
      mutationFn: async (notificationId: string) => {
        await readNotificationFn(notificationId);
      },
    }),
    deleteNotifications: useMutation({
      mutationFn: async (dataToDelete: INotificationDelete) => {
        await deleteNotificationsFn(dataToDelete);
      }
    })
  };
}
