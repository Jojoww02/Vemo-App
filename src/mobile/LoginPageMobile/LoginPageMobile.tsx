import { Link } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import zod from "zod";
import useMutateAuth from "@/hooks/useMutateAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertForm, Button, Input } from "@/components/atoms";
import { isObjectEmpty } from "@/lib/utils/common";
import {
  FORGOT_PASSWORD_REQUEST_PAGE,
  REGISTER_USER_PAGE,
} from "@/lib/constants/routes";

const loginSchema = zod.object({
  email: zod
    .string()
    .min(1, "Email tidak boleh kosong")
    .email("Format email salah"),
  password: zod
    .string()
    .min(1, "Password tidak boleh kosong")
    .min(8, "Password harus lebih dari 8 karakter")
    .max(32, "Password harus kurang dari 32 karakter"),
});

export type LoginInput = zod.TypeOf<typeof loginSchema>;

export default function LoginPageMobile(): JSX.Element {
  const { loginUser } = useMutateAuth();

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmitHandler: SubmitHandler<LoginInput> = async (
    credentials: LoginInput
  ) => {
    await loginUser.mutateAsync(credentials);
  };

  return (
    <div className="sm:w-[640px] sm:mx-auto h-screen pt-8 px-6 sm:px-20 sm:mt-10">
      <h1 className="text-3xl leading-10 font-bold mb-10 xs:pl-4">
        Selamat datang, senang melihatmu kembali!
      </h1>
      <div className="my-5 w-full xs:w-[90%] sm:pt-8 m-auto gap-4">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmitHandler)}
            className="flex-col w-full flex gap-5"
          >
            {loginUser.isError && (
              <AlertForm
                title={(loginUser.error as any).response.data.message}
                description={(loginUser.error as any).response.data.errors}
              />
            )}
            <Input
              name="email"
              label="Email"
              isFill={methods.watch().email}
              placeholder="Enter Your Email"
              type="email"
            />
            <Input
              name="password"
              label="Password"
              isFill={methods.watch().password}
              placeholder="Enter Your Password"
              type="password"
            />
            <div className="text-[#6a707c] text-end font-medium mt-3">
              <Link to={FORGOT_PASSWORD_REQUEST_PAGE}>
                <p>Lupa Password?</p>
              </Link>
            </div>
            <Button
              className="flex mt-7 items-center justify-center py-6 text-lg font-semibold"
              type="submit"
              disabled={!isObjectEmpty(methods.formState.errors)}
              isLoading={loginUser.isPending}
            >
              Masuk
            </Button>
          </form>
        </FormProvider>
      </div>
      <div className="flex justify-center gap-1 mt-10 font-medium">
        <p className="">Tidak mempunyai akun?</p>
        <div className="text-[#0587BE]">
          <Link to={REGISTER_USER_PAGE}>
            <p>Daftar</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
