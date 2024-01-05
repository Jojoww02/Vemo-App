import { Navigate, Outlet } from "react-router-dom";
import { isTokenSet } from "@/lib/utils/token";
import { LOGIN_PAGE } from "@/lib/constants/routes";
import { useUserQuery } from "../../hooks/queries/useUserQuery";
import { ErrorConnection, FullScreenLoader } from "@/components/templates";

export default function PrivateRouteGuard() {
  const { userQuery } = useUserQuery({
    refetchInterval: 40 * 1000,
  });

  if (!isTokenSet()) return <Navigate to={LOGIN_PAGE} />;

  if (userQuery.isError) {
    const error = userQuery.error as any;
    if (error?.response?.status === 401) {
      return <Navigate to={LOGIN_PAGE} />;
    } else if (error?.code === "ERR_NETWORK") {
      return <ErrorConnection />;
    }
  }

  if (userQuery.isLoading) {
    return <FullScreenLoader />;
  }

  if (userQuery.isSuccess) {
    return <Outlet />;
  }
}
