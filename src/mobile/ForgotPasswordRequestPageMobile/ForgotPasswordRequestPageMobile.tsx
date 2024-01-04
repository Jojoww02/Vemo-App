import zod from "zod";
import { useNavigate } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertForm, Button, Input } from "@/components/atoms";
import { isObjectEmpty } from "@/lib/utils/common";
import useMutateAuth from "@/hooks/useMutateAuth";
import IconArrow from "../../assets/notification/Icon-arrow.svg";
import { LOGIN_PAGE } from "@/lib/constants/routes";

const ForgotPasswordRequestSchema = zod.object({
  email: zod.string().min(1, "Email diperlukan").email("Email tidak ditemukan"),
});

export type ForgotPasswordRequestInput = zod.TypeOf<typeof ForgotPasswordRequestSchema>;

export default function ForgotPasswordRequestPageMobile(): JSX.Element {
  const navigate = useNavigate();
  const methods = useForm<ForgotPasswordRequestInput>({
    resolver: zodResolver(ForgotPasswordRequestSchema),
  });

  const { forgotPasswordRequest } = useMutateAuth();

  const onSubmitHandler: SubmitHandler<ForgotPasswordRequestInput> = async ({ email }) => {
    await forgotPasswordRequest.mutateAsync(email);
  };

  forgotPasswordRequest.isSuccess && navigate(LOGIN_PAGE);

  return (
    <div className="pt-8 px-6 h-screen">
      <div onClick={() => navigate(-1)}>
        <img src={IconArrow} alt="" className="py-5 w-5 lg:w-7 " />
      </div>
      <h1 className="font-bold text-3xl sm:text-4xl">Lupa Password?</h1>
      <p className="pt-3 sm:text-lg sm:w-3/4">Jangan khawatir! masukkan alamat email yang tertaut dengan akun anda.</p>
      <div className="mt-10 flex flex-col">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmitHandler)} className="flex-col w-full flex gap-5">
            {forgotPasswordRequest.isError && <AlertForm title={(forgotPasswordRequest.error as any).response.data.message} description={(forgotPasswordRequest.error as any).response.data.errors} />}
            <Input name="email" label="Email" isFill={methods.watch().email} placeholder="Masukkan Email Anda" type="email" />
            <Button className="flex mt-7 items-center justify-center py-6 text-lg font-semibold" type="submit" disabled={!isObjectEmpty(methods.formState.errors)} isLoading={forgotPasswordRequest.isPending}>
              Kirim Kode
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
