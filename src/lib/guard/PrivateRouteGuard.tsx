import { Navigate, Outlet } from "react-router-dom";
import { isTokenSet } from "@/lib/utils/token";
import { LOGIN_PAGE } from "@/lib/constants/routes";
import { useUserQuery } from "./useUserQuery";
import { FullScreenLoader } from "@/components/templates";

export default function PrivateRouteGuard() {
  const { userQuery } = useUserQuery();

  if (
    (userQuery.isError && (userQuery.error as any)?.response?.status === 401) ||
    !isTokenSet()
  ) {
    return <Navigate to={LOGIN_PAGE} />;
  }

  if (userQuery.isLoading) {
    return <FullScreenLoader />;
  }

  if (userQuery.isSuccess) {
    return <Outlet />;
  }
}
