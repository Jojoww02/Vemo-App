import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import { IUserResponse } from "@/api/types";
import { getMeFn } from "@/api/services/users";
import { isTokenSet } from "@/lib/utils/token";
import { LOGIN_PAGE } from "@/lib/constants/routes";
import { BarLoader } from "react-spinners";

export default function PrivateRouteGuard() {
  const query = useQuery({
    queryKey: ["me"],
    queryFn: async (): Promise<IUserResponse> => await getMeFn(),
  });

  if (
    (query.isError && (query.error as any)?.response?.status === 401) ||
    !isTokenSet()
  ) {
    return <Navigate to={LOGIN_PAGE} />;
  }

  if (query.isLoading) {
    return (
      <div className="min-h-screen w-full grid place-items-center">
        <BarLoader color="#F4B400" />
      </div>
    );
  }

  if (query.isSuccess) {
    return <Outlet />;
  }
}
