import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import { IUserResponse } from "@/api/types";
import { ADMIN_DASHBOARD_PAGE } from "@/lib/constants/routes";

export default function CustomerRouteGuard() {
  const { data: user } = useQuery({
    queryKey: ["me"],
  });
  
  return (user as IUserResponse).role === "customer" ? (
    <Outlet />
  ) : (
    <Navigate to={ADMIN_DASHBOARD_PAGE} />
  );
}
