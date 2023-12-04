import { logoutUserFn } from "@/api/services/auth";
import { removeToken } from "@/lib/utils/token";
import { useQuery } from "@tanstack/react-query";

export default function useLogoutUser() {
  const logoutUser = useQuery({
    queryKey: ["logout"],
    queryFn: async () => await logoutUserFn(),
    enabled: false,
  });

  async function handleLogoutUser() {
    await logoutUser.refetch();
    removeToken();
    window.location.reload();
  }

  return { handleLogoutUser };
}
