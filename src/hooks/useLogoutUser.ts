import { removeToken } from "@/lib/utils/token";
import useMutateAuth from "./useMutateAuth";

export default function useLogoutUser() {
  const { logoutUser } = useMutateAuth();

  async function handleLogoutUser() {
    await logoutUser.mutateAsync();
    removeToken();
    window.location.reload();
  }

  return {
    handleLogoutUser,
    isLogoutLoading: logoutUser.isPending,
  };
}
