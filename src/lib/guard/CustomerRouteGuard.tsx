import { Navigate, Outlet } from "react-router-dom";
import { IUserResponse } from "@/api/types";
import { ADMIN_DASHBOARD_PAGE } from "@/lib/constants/routes";
import { useUserQuery } from "../../hooks/queries/useUserQuery";

export default function CustomerRouteGuard() {
  const { userQuery } = useUserQuery();

  return (userQuery.data as IUserResponse).role === "customer" ? (
    <Outlet />
  ) : (
    <Navigate to={ADMIN_DASHBOARD_PAGE} />
  );
}
