import { Navigate, Outlet } from "react-router-dom";
import { PROFILE_PAGE } from "../constants/routes";
import useUpdateEmail from "@/hooks/useUpdateEmail";

export default function SendOtpGuard() {
  const { email } = useUpdateEmail();
  return email ? <Outlet /> : <Navigate to={PROFILE_PAGE} />;
}
