import { Navigate, Outlet } from "react-router-dom";
import { DASHBOARD_PAGE } from "../constants/routes";
import { useUserQuery } from "../../hooks/queries/useUserQuery";
import { ErrorConnection, FullScreenLoader } from "@/components/templates";

export default function AuthRouteGuard() {
  const { userQuery } = useUserQuery();

  if (userQuery.isError) {
    const error = userQuery.error as any;
    if (error?.response?.status === 401) {
      return <Outlet />;
    } else if (error?.code === "ERR_NETWORK") {
      return <ErrorConnection />;
    }
  }

  if (userQuery.isLoading) {
    return <FullScreenLoader />;
  }

  if (userQuery.isSuccess) {
    return <Navigate to={DASHBOARD_PAGE} />;
  }
}
