import { Navigate, Outlet } from "react-router-dom";
import { DASHBOARD_PAGE } from "../constants/routes";
import { useUserQuery } from "../../hooks/queries/useUserQuery";
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

  if (userQuery.isError && (userQuery.error as any).code === "ERR_NETWORK") {
    return (
      <div className="min-h-screen w-full grid place-items-center">
        <div className="flex flex-col items-center justify-center gap-6">
          <img src="/network-error.svg" width={120} alt="" />
          <div className="text-center text-xs">
            <span className="text-sm">
              Mohon maaf <br /> Vemo sedang bermasalah
            </span>
            <p className="text-slate-500 pt-2">
              Silahkan kembali beberapa saat nanti
            </p>
          </div>
        </div>
      </div>
    );
  }
}
