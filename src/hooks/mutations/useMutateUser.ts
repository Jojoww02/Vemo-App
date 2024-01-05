import { useMutation } from "@tanstack/react-query";
import {
  changePasswordFn,
  updatePhotoProfileFn,
  updateUserFn,
} from "@/api/services/users";
import { IChangePasswordData, IUpdateUser } from "@/api/types";

export default function useMutateUser() {
  return {
    updateUser: useMutation({
      mutationFn: async ({ userId, name, email }: IUpdateUser) => {
        await updateUserFn({ userId, name, email });
      },
    }),
    changePassword: useMutation({
      mutationFn: async (changePasswordData: IChangePasswordData) =>
        await changePasswordFn(changePasswordData),
    }),
    updatePhotoProfile: useMutation({
      mutationFn: async (photo: FormData) => await updatePhotoProfileFn(photo),
    }),
  };
}
