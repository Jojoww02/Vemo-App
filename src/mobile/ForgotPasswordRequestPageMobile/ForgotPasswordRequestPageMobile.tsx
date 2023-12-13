import zod from "zod"
import { Link } from "react-router-dom";
import { LOGIN_PAGE } from "@/lib/constants/routes";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@/components/atoms";
import { isObjectEmpty } from "@/lib/utils/common";

const ForgotPasswordRequestSchema = zod.object({
  email: zod
    .string()
    .min(1, "Email diperlukan")
    .email("Email tidak ditemukan"),
});

export type ForgotPasswordRequestInput = zod.TypeOf<typeof ForgotPasswordRequestSchema>;
export default function ForgotPasswordRequestPageMobile():JSX.Element {
  const methods = useForm<ForgotPasswordRequestInput>({
    resolver: zodResolver(ForgotPasswordRequestSchema),
  })
  const onSubmit = (data: any) => console.log(data)
  return (
    <div className="pt-8 px-6 h-screen">
      <h1 className="font-bold text-3xl sm:text-4xl">Lupa Password?</h1>
      <p className="pt-3 sm:text-lg sm:w-3/4">Jangan khawatir! masukkan alamat email yang tertaut dengan akun anda.</p>
      <div className="mt-10 flex flex-col">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="flex-col w-full flex gap-5">
            <Input
              name="email"
              label="Email"
              isFill={methods.watch().email}
              placeholder="Enter Your Email"
              type="email"
            />
            <Button 
              className="flex mt-7 items-center justify-center py-6 text-lg font-semibold"
              type="submit"
              disabled={!isObjectEmpty(methods.formState.errors)}
            >
              Kirim Kode
            </Button>
          </form>
        </FormProvider>
      </div>
      <div className="flex justify-center text-center mt-10 font-medium  gap-1 tracking-wide sm:text-lg">
        <p className="">Ingat password?</p>
        <div className="mb-10">
          <Link to={LOGIN_PAGE} className="text-[#0587BE]">
            <p>Masuk</p>
          </Link>
        </div>
      </div>      
    </div>
  )
}
