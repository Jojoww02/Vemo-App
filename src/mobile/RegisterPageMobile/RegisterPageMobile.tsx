import zod from "zod"
import useMutateAuth from "@/hooks/mutations/useMutateAuth";
import { AlertForm, Button, Input } from "@/components/atoms";
import { LOGIN_PAGE } from "@/lib/constants/routes";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { isObjectEmpty } from "@/lib/utils/common";

const registerSchema = zod
  .object({
    name: zod
      .string()
      .min(1, "Nama diperlukan")
      .min(3, "Nama harus lebih dari 3 karakter")
      .max(50, "Password harus kurang dari 50 karakter"),
    email: zod
      .string()
      .min(1, "Email diperlukan")
      .email("Email tidak ditemukan"),
    password: zod
      .string()
      .min(1, "Password diperlukan")
      .min(8, "Password harus lebih dari 8 karakter")
      .max(32, "Password harus kurang dari 32 karakter"),
    confirmPassword: zod.string().min(1, "Konfirmasi Password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords tidak sama",
  });

export type RegisterInput = zod.TypeOf<typeof registerSchema>;
export default function RegisterPageMobile():JSX.Element {
  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const { registerUser } = useMutateAuth();

  const onSubmitHandler: SubmitHandler<RegisterInput> = async ({
    name,
    email,
    password,
  }: RegisterInput) => {
    await registerUser.mutateAsync({ name, email, password, role: "customer" });
  };  
  return (
    <div className="p-5">
      <div className="sm:relative ">
        <h1 className="text-3xl leading-10 font-bold w-full mt-5 mb-10 xs:text-3xl xs:w-[90%] xs:mx-auto sm:text-4xl ">
          Hallo! Buat akun untuk mulai
        </h1>
        <div className="my-5 w-full xs:w-[90%] sm:pt-8 m-auto gap-4">
            <FormProvider {...methods}>
                <form
                    autoComplete="off"
                    onSubmit={methods.handleSubmit(onSubmitHandler)}
                    className="flex-col w-full flex gap-5"
                >
                    {registerUser.isError && (
                      <AlertForm 
                      title={(registerUser.error as any).response.data.message}
                      description={(registerUser.error as any).response.data.errors} />
                    )}
                    <Input
                        name="name"
                        label="Nama"
                        isFill={methods.watch().name}
                        placeholder="Masukkan Nama Anda"
                        type="text"
                    />
                    <Input
                        name="email"
                        label="Email"
                        isFill={methods.watch().email}
                        placeholder="Masukkan email"
                        type="email"
                    />
                    <Input
                        name="password"
                        label="Password"
                        isFill={methods.watch().password}
                        placeholder="Masukkan password"
                        type="password"
                    />
                    <Input
                        name="confirmPassword"
                        label="Konfirmasi Password"
                        isFill={methods.watch().confirmPassword}
                        placeholder="Konfirmasi Password Anda"
                        type="password"
                    />
                    <Button 
                        className="flex mt-7 items-center justify-center py-6 text-lg font-semibold"
                        type="submit"
                        disabled={!isObjectEmpty(methods.formState.errors)}
                        isLoading={registerUser.isPending}
                    >
                        Daftar
                    </Button>
                </form>
            </FormProvider>
        </div>
        <div className="flex mt-10 justify-center font-medium tracking-wide gap-1 sm:text-xl">
          <p className="">Sudah mempunyai akun?</p>
          <Link to={LOGIN_PAGE}>
            <p className="text-[#0587BE]">Masuk</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
