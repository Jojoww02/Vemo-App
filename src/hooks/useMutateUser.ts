import { useMutation } from "@tanstack/react-query";
import { updateUserFn } from "@/api/services/users";
import { IUpdateUser } from "@/api/types";

export default function useMutateUser() {
  return {
    updateUser: useMutation({
      mutationFn: async ({ userId, name, email }: IUpdateUser) => {
        await updateUserFn({ userId, name, email });
      },
    }),
  };
}
