import { Navigate, Outlet } from "react-router-dom";
import { IUserResponse } from "@/api/types";
import { DASHBOARD_PAGE } from "@/lib/constants/routes";
import { useUserQuery } from "./useUserQuery";

export default function AdminRouteGuard() {
  const { userQuery } = useUserQuery();

  return (userQuery.data as IUserResponse).role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to={DASHBOARD_PAGE} />
  );
}
