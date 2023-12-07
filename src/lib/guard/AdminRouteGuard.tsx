import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import { IUserResponse } from "@/api/types";
import { DASHBOARD_PAGE } from "@/lib/constants/routes";

export default function AdminRouteGuard() {
  const { data: user } = useQuery({
    queryKey: ["me"],
  });

  return (user as IUserResponse).role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to={DASHBOARD_PAGE} />
  );
}
