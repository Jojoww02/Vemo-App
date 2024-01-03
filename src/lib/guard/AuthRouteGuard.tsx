import { useQuery } from "@tanstack/react-query";
import { IUserResponse } from "@/api/types";
import { getMeFn } from "@/api/services/users";
import { Navigate, Outlet } from "react-router-dom";
import { DASHBOARD_PAGE } from "../constants/routes";
import { BarLoader } from "react-spinners";

export default function AuthRouteGuard() {
  const query = useQuery({
    queryKey: ["me"],
    queryFn: async (): Promise<IUserResponse> => await getMeFn(),
  });

  if (query.isError && (query.error as any)?.response?.status === 401) {
    return <Outlet />;
  }

  if (query.isLoading) {
    return (
      <div className="min-h-screen w-full grid place-items-center">
        <BarLoader color="#F4B400" />
      </div>
    );
  }

  if (query.isSuccess) {
    return <Navigate to={DASHBOARD_PAGE} />;
  }
}
