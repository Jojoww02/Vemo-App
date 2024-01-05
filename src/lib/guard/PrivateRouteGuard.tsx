import { Navigate, Outlet } from "react-router-dom";
import { isTokenSet } from "@/lib/utils/token";
import { LOGIN_PAGE } from "@/lib/constants/routes";
import { useUserQuery } from "../../hooks/queries/useUserQuery";
import { FullScreenLoader } from "@/components/templates";

export default function PrivateRouteGuard() {
  const { userQuery } = useUserQuery({
    refetchInterval: 40 * 1000,
  });

  if (
    (userQuery.isError && (userQuery.error as any)?.response?.status === 401) ||
    !isTokenSet()
  ) {
    return <Navigate to={LOGIN_PAGE} />;
  }

  if (userQuery.isLoading) {
    return <FullScreenLoader />;
  }

  if (userQuery.isSuccess) {
    return <Outlet />;
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
