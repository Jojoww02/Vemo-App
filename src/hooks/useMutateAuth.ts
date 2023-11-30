import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUserFn, registerUserFn } from "@/api/services/auth";
import { ICredentials, IUser } from "@/api/types";
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
  };
}
