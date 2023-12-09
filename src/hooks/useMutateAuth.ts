import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordFn, forgotPasswordRequestFn, loginUserFn, registerUserFn, sendOtpByEmailFn, verifyOtpFn } from "@/api/services/auth";
import { ICredentials, IForgotPasswordUser, IUser } from "@/api/types";
import { setToken } from "@/lib/utils/token";

export default function useMutateAuth() {
  const navigate = useNavigate();
  return {
    registerUser: useMutation({
      mutationFn: async (newUser: IUser) => await registerUserFn(newUser),
      onSuccess: (data) => {
        setToken(data.accessToken);
        navigate("/dashboard");
      },
    }),
    loginUser: useMutation({
      mutationFn: async (credentials: ICredentials) => await loginUserFn(credentials),
      onSuccess: (data) => {
        setToken(data.accessToken);
        navigate("/dashboard");
      },
    }),
    sendOtpByEmail: useMutation({
      mutationFn: async (email: string) => await sendOtpByEmailFn(email),
    }),
    verifyOtp: useMutation({
      mutationFn: async (otp: number) => await verifyOtpFn(otp),
    }),
    forgotPasswordRequest: useMutation({
      mutationFn: async (email: string) => await forgotPasswordRequestFn(email),
    }),
    forgotPasswordUser: useMutation({
      mutationFn: async (newPassword: IForgotPasswordUser) => await forgotPasswordFn(newPassword),
    }),
  };
}
