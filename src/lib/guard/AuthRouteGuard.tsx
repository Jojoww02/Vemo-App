import { Navigate, Outlet } from "react-router-dom";
import { DASHBOARD_PAGE } from "../constants/routes";
import { useUserQuery } from "./useUserQuery";
import { FullScreenLoader } from "@/components/templates";

export default function AuthRouteGuard() {
  const { userQuery } = useUserQuery();

  if (userQuery.isError && (userQuery.error as any)?.response?.status === 401) {
    return <Outlet />;
  }

  if (userQuery.isLoading) {
    return <FullScreenLoader />;
  }

  if (userQuery.isSuccess) {
    return <Navigate to={DASHBOARD_PAGE} />;
  }
}
