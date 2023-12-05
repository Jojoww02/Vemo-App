import useUpdateProfile from "@/hooks/useUpdateProfile";
import { Navigate, Outlet } from "react-router-dom";
import { VERIFY_PASSWORD_PAGE } from "../constants/routes";

export default function UpdateProfileGuard() {
  const { isCanUpdateProfile } = useUpdateProfile();
  return isCanUpdateProfile ? (
    <Outlet />
  ) : (
    <Navigate to={VERIFY_PASSWORD_PAGE} />
  );
}
