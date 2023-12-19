import zod from "zod";
import useMutateAuth from "@/hooks/useMutateAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertForm, Button, Input } from "@/components/atoms";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { isObjectEmpty } from "@/lib/utils/common";
import { LoginPageMobile } from "@/mobile";
import { FORGOT_PASSWORD_REQUEST_PAGE, INDEX_PAGE } from "@/lib/constants/routes";
import useMobile from "@/hooks/useMobile";
import { Link } from "react-router-dom";

const loginSchema = zod.object({
  email: zod.string().min(1, "Email diperlukan").email("Email tidak ditemukan"),
  password: zod
    .string()
    .min(1, "Password diperlukan")
    .min(8, "Password harus lebih dari 8 karakter")
    .max(32, "Password harus kurang dari 32 karakter")
    .refine((password) => /\d/.test(password), {
      message: "Password harus mengandung setidaknya satu angka",
    }),
});

export type LoginInput = zod.TypeOf<typeof loginSchema>;

export default function LoginPage(): JSX.Element {
  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const { loginUser } = useMutateAuth();

  const onSubmitHandler: SubmitHandler<LoginInput> = async (credentials: LoginInput) => {
    await loginUser.mutateAsync(credentials);
  };

  const isMobileResponsive = useMobile();

  return (
    <>
      {isMobileResponsive ? (
        <main className="h-screen overflow-hidden bg-[url('/src/assets/authImage/auth-bg.webp')] grid place-items-center bg-cover bg-center">
          {/* Overlay Background */}
          <div className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-30"></div>

          {/* Card */}
          <div className="w-[35%] xl:w-[30%] h-[80%] p-8 rounded-[2rem] bg-white z-10 shadow-[0px_2px_7px_5px_#00000040]">
            <p className="font-bold text-dark text-xl xl:text-2xl text-center">Selamat datang, senang bisa melihatmu kembali!</p>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmitHandler)} className="flex flex-col mt-10 gap-5">
                {loginUser.isError && <AlertForm title={(loginUser.error as any).response.data.message} description={(loginUser.error as any).response.data.errors} />}
                <Input name="email" label="Email" isFill={methods.watch().email} placeholder="Enter Your Email" type="email" />
                <Input name="password" label="Password" isFill={methods.watch().password} placeholder="Enter Your Password" type="password" />
                <div className="flex justify-end mt-2 font-semibold text-[#6a707c] text-sm xl:text-base">
                  <Link to={FORGOT_PASSWORD_REQUEST_PAGE}>
                    <span className="cursor-pointer">Lupa Password?</span>
                  </Link>
                </div>
                <Button disabled={!isObjectEmpty(methods.formState.errors)} isLoading={loginUser.isPending} className="py-6 mt-4 text-lg font-semibold">
                  Masuk
                </Button>
              </form>
            </FormProvider>
            <div className="flex items-center text-[13px] justify-center xl:text-base mt-4 xl:mt-5">
              <p className=" font-medium">
                Tidak mempunyai akun?
                <Link to={INDEX_PAGE}>
                  <span className="text-[#0586BE] ml-1 font-semibold cursor-pointer">Daftar</span>
                </Link>
              </p>
            </div>
          </div>
        </main>
      ) : (
        <LoginPageMobile />
      )}
    </>
  );
}
