import zod from "zod"
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@/components/atoms";
import { isObjectEmpty } from "@/lib/utils/common";

const ForgotPasswordSchema = zod.object({
    newEmail: zod
      .string()
      .min(1, "Email diperlukan")
      .email("Email tidak ditemukan"),
    newPassword: zod
      .string()
      .min(1, "Password diperlukan")
      .min(8, "Password baru harus lebih dari 8 karakter")
      .max(32, "Password baru harus kurang dari 32 karakter"),
  });
  
  export type ForgotPasswordInput = zod.TypeOf<typeof ForgotPasswordSchema>;
export default function ForgotPasswordPageMobile():JSX.Element {
  const methods = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema),
  })
  const onSubmit = (data: any) => console.log(data)
  return (
    <div className="pt-8 px-9 sm:px-20 sm:pt-10 relative">
      <h1 className="text-3xl leading-10 font-bold mb-2 sm:text-4xl">Buat password baru</h1>
      <p className="pt-3 text-paragraph pb-4 sm:text-lg sm:w-3/4 sm:pb-6">Password baru anda harus unik dari yang sebelumnya.</p>
      <div className="flex flex-col my-5">
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="flex-col w-full flex gap-5">
                <Input 
                    name="newEmail"
                    label="Email Baru"
                    isFill={methods.watch().newEmail}
                    placeholder="Masukkan Email Baru Anda"
                    type="email"
                />
                <Input 
                    name="newPassword"
                    label="Password Baru"
                    isFill={methods.watch().newPassword}
                    placeholder="Masukkan Password Baru Anda"
                    type="password"
                />
                <Button 
                    className="flex mt-7 items-center justify-center py-6 text-lg font-semibold"
                    type="submit"
                    disabled={!isObjectEmpty(methods.formState.errors)}
                >
                    Reset Password
                </Button>
            </form>
        </FormProvider>
      </div>
    </div>
  )
}