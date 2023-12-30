import zod from "zod";
import { Button, Input } from "@/components/atoms";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { isObjectEmpty } from "@/lib/utils/common";
import useMobile from "@/hooks/useMobile";
import { ForgotPasswordRequestPageMobile } from "@/mobile";
import useMutateAuth from "@/hooks/useMutateAuth";

const ForgotPasswordRequestSchema = zod.object({
  email: zod.string().min(1, "Email diperlukan").email("Email tidak ditemukan"),
});

export type ForgotPasswordRequestInput = zod.TypeOf<typeof ForgotPasswordRequestSchema>;
export default function ForgotPasswordRequestPage(): JSX.Element {
  const methods = useForm<ForgotPasswordRequestInput>({
    resolver: zodResolver(ForgotPasswordRequestSchema),
  });

  const { forgotPasswordRequest } = useMutateAuth();

  const onSubmitHandler: SubmitHandler<ForgotPasswordRequestInput> = async ({ email }) => {
    await forgotPasswordRequest.mutateAsync(email);
  };

  const isMobileResponive = useMobile();
  return (
    <>
      {isMobileResponive ? (
        <div className="h-screen overflow-hidden bg-[url('/src/assets/authImage/auth-bg.webp')] grid place-items-center bg-cover bg-center">
          <div className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-30"></div>

          {/* Card */}
          <div className="w-[35%] xl:w-[30%] h-[80%] 2xl:h-[85%] p-8 rounded-[2rem] bg-white z-10 shadow-[0px_2px_7px_5px_#00000040]">
            <p className="font-bold text-dark text-lg xl:text-3xl text-center">Lupa Password?</p>
            <p className="mt-3 font-medium text-[#8391A1] text-md text-center">Jangan khawatir! masukkan alamat email yang tertaut dengan akun anda.</p>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmitHandler)} className="flex flex-col mt-10 gap-32 xl:gap-40">
                <Input name="email" label="Email" isFill={methods.watch().email} placeholder="Masukkan Email Anda" type="email" />
                <Button className="py-6 text-lg font-semibold" disabled={!isObjectEmpty(methods.formState.errors)} type="submit">
                  Kirim Kode
                </Button>
              </form>
            </FormProvider>
            <p className=" font-medium text-center mt-6">
              Ingat Password?
              <Link to={"/login"}>
                <span className="text-[#0586BE] ml-1 font-semibold cursor-pointer">Masuk</span>
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <ForgotPasswordRequestPageMobile />
      )}
    </>
  );
}
