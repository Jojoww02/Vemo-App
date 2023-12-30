import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { AlertForm, Button, Input } from "@/components/atoms";
import { isObjectEmpty } from "@/lib/utils/common";
import { Link } from "react-router-dom";
import useMutateAuth from "@/hooks/useMutateAuth";
import useMobileResponsive from "@/hooks/useMobile";
import { HomePageMobile } from "@/mobile";

const registerSchema = zod
  .object({
    name: zod.string().min(1, "Nama diperlukan").min(3, "Nama harus lebih dari 3 karakter").max(50, "Password harus kurang dari 50 karakter"),
    email: zod.string().min(1, "Email diperlukan").email("Email tidak ditemukan"),
    password: zod
      .string()
      .min(1, "Password diperlukan")
      .min(8, "Password harus lebih dari 8 karakter")
      .max(32, "Password harus kurang dari 32 karakter")
      .refine((password) => /\d/.test(password), {
        message: "Password harus mengandung setidaknya satu angka",
      }),
    confirmPassword: zod.string().min(1, "Konfirmasi password anda"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password tidak sama",
  });

export type RegisterInput = zod.TypeOf<typeof registerSchema>;

export default function HomePage(): JSX.Element {
  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const { registerUser } = useMutateAuth();

  const onSubmitHandler: SubmitHandler<RegisterInput> = async ({ name, email, password }: RegisterInput) => {
    await registerUser.mutateAsync({ name, email, password, role: "customer" });
  };

  const isResponsive = useMobileResponsive();
  return (
    <>
      {isResponsive ? (
        <div className="flex h-screen overflow-y-hidden">
          {/* Content Left Start */}
          <div className="w-2/5 flex flex-col justify-evenly px-10">
            <div>
              <h1 className="text-5xl font-bold">Selamat Datang!</h1>
              <div className="flex items-center text-3xl xl:text-4xl ml-2 mt-1">
                <p className="font-medium">di</p>
                <span className="flex items-center ml-5">
                  <img
                    src="/iconVemo.svg"
                    alt=""
                    className="w-[60px] xl:w-[80px]"
                  />
                  <p className="text-[#F4B400] font-semibold italic ml-3 tracking-wide">
                    VEMO
                  </p>
                </span>
              </div>
            </div>
            <div className="2xl:text-xl text-xl text-[#8391A1] font-medium flex flex-col gap-6 overflow-y-auto">
              <p>VEMO adalah sebuah website app yang menyediakan perbaikan atau service kendaraan beroda dua anda secara berkala, anda bisa mengetahui kondisi mesin serta peforma motor anda disini.</p>
            </div>
            <div className="flex items-center">
              <span className="flex items-center">
                <img
                  src="/iconVemo.svg"
                  alt=""
                  className="w-[30px] xl:w-[40px]"
                />
                <p className="text-[#F4B400] font-semibold italic ml-2 tracking-wide xl:text-lg">
                  VEMO
                </p>
              </span>
              <p className="mx-2 font-medium text-lg">|</p>
              <p className="font-medium text-xs xl:text-base">Tempat Terbaik Untuk Kendaraan Anda</p>
            </div>
          </div>
          {/* Content Left End */}

          {/* Content Right Start */}
          <div className="relative w-3/5 bg-cover grid place-items-center bg-[url('/src/assets/homeLanding/landing-image.webp')]">
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>

            {/* Card */}
            <div className="w-3/5 xl:w-1/2 p-8 rounded-[2rem] bg-white z-10 shadow-[0px_2px_7px_5px_#00000040]">
              <p className="font-bold text-2xl mb-6 text-center">Buat Sebuah Akun</p>
              <FormProvider {...methods}>
                <form autoComplete="off" onSubmit={methods.handleSubmit(onSubmitHandler)} className="flex-col flex gap-4">
                  {registerUser.isError && <AlertForm title={(registerUser.error as any).response.data.message} description={(registerUser.error as any).response.data.errors} />}
                  <Input name="name" label="Nama" isFill={methods.watch().name} placeholder="Masukkan Nama anda" type="text" />
                  <Input name="email" label="Email" isFill={methods.watch().email} placeholder="Masukkan Email anda" type="email" />
                  <Input name="password" label="Password" isFill={methods.watch().password} placeholder="Masukkan Password anda" type="password" />
                  <Input name="confirmPassword" label="Konfirmasi Password" isFill={methods.watch().confirmPassword} placeholder="Masukkan Password Anda" type="password" />
                  <div className="flex flex-col gap-2 cursor-pointer">
                    <Button className="py-6 text-lg font-semibold" type="submit" disabled={!isObjectEmpty(methods.formState.errors)} isLoading={registerUser.isPending}>
                      Daftar
                    </Button>
                    <Button className="py-6 text-lg font-semibold bg-dark hover:bg-dark/80" asChild>
                      <Link className="w-full text-center" to="/login">
                        Masuk
                      </Link>
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      ) : (
        <HomePageMobile />
      )}
    </>
  );
}
