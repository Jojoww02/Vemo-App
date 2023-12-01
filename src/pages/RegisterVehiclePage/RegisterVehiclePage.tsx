import zod from "zod";
import { Button, Input } from "@/components/atoms";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useMutateAuth from "@/hooks/useMutateAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { isObjectEmpty } from "@/lib/utils/common";
import { AlertTriangle } from "lucide-react";
import { log } from "console";

const registerSchema = zod
  .object({
    name: zod
      .string()
      .min(1, "Name is required")
      .min(3, "Name must be more than 3 characters")
      .max(50, "Password must be less than 50 characters"),
    email: zod
      .string()
      .min(1, "Email address is required")
      .email("Email Address is invalid"),
    password: zod
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    confirmPassword: zod.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterInput = zod.TypeOf<typeof registerSchema>;

export default function RegisterVehiclePage(): JSX.Element {
  const methods = useForm();

  const onSubmit = (data: any) => console.log(data);

  return (
    <div className="flex justify-evenly gap-10 mt-10">
      {/* Content Left */}
      <div className="relative w-1/2 bg-cover grid rounded-xl bg-[url('/src/assets/requestPageImage/register-vehicle-image.webp')]">
        <div className="absolute bottom-0 font-bold text-white text-xl xl:text-5xl px-8 z-10 mb-14">
          Daftarkan
          <br />
          Kendaraan Anda
        </div>
        <div className="absolute -z-1 bottom-0 left-0 w-full h-[60%] rounded-xl [background:linear-gradient(180deg,rgba(244,180,0,0)_0%,rgb(244,180,0)_100%)]"></div>
      </div>
      {/* Content Left End */}

      {/* Content Right */}
      <div className="w-1/2 mb-12 justify-center flex">
        <div className="w-[80%] mt-7">
          <FormProvider {...methods}>
            <form
              autoComplete="off"
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex-col flex gap-6"
            >
              {/* {registerUser.isError && (
                <Alert variant="destructive" className="flex items-center">
                  <div className="mr-4">
                    <AlertTriangle />
                  </div>
                  <div>
                    <AlertTitle>{(registerUser.error as any).response.data.message}</AlertTitle>
                    <AlertDescription>{(registerUser.error as any).response.data.errors}</AlertDescription>
                  </div>
                </Alert>
              )} */}
              <Input
                label="Nama Lengkap"
                isFill={methods.watch().namaLengkap}
                placeholder="Input your name"
                type="text"
              />
              <Input
                label="Nama Kendaraan"
                isFill={methods.watch().namaKendaraan}
                placeholder="Input your email"
                type="text"
              />
              <Input
                label="Jenis Kendaraan"
                isFill={methods.watch().jenisKendaraan}
                placeholder="Input your password"
                type="text"
              />
              <Input
                label="Plat Nomor"
                isFill={methods.watch().platNomor}
                placeholder="Confirm your password"
                type="text"
              />
              <div className="flex flex-col gap-2 mt-7">
                <Button className="py-6 text-lg font-semibold" type="submit">
                  Send
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
