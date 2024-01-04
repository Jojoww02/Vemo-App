import zod from "zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import IconArrow from "../../assets/notification/Icon-arrow.svg";
import { AlertForm, Button, Input } from "@/components/atoms";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { IUserResponse } from "@/api/types";
import { PROFILE_PAGE } from "@/lib/constants/routes";
import useMutateUser from "@/hooks/useMutateUser";

const changePaswwordSchema = zod
  .object({
    previousPassword: zod
      .string()
      .min(1, "Password diperlukan")
      .min(8, "Password harus lebih dari 8 karakter")
      .max(32, "Password harus kurang dari 32 karakter")
      .refine((password) => /\d/.test(password), {
        message: "Password harus mengandung setidaknya satu angka",
      }),
    newPassword: zod
      .string()
      .min(1, "Password diperlukan")
      .min(8, "Password harus lebih dari 8 karakter")
      .max(32, "Password harus kurang dari 32 karakter")
      .refine((password) => /\d/.test(password), {
        message: "Password harus mengandung setidaknya satu angka",
      }),
    confirmNewPassword: zod
      .string()
      .min(1, "Password diperlukan")
      .min(8, "Password harus lebih dari 8 karakter")
      .max(32, "Password harus kurang dari 32 karakter")
      .refine((password) => /\d/.test(password), {
        message: "Password harus mengandung setidaknya satu angka",
      }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords do not match",
  });

export type ChangePasswordInput = zod.TypeOf<typeof changePaswwordSchema>;

export default function ChangePasswordPage() {
  const methods = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePaswwordSchema),
  });
  const navigate = useNavigate();
  const { changePassword } = useMutateUser();
  const { data: user } = useQuery({ queryKey: ["me"] });

  const onSubmitHandler: SubmitHandler<ChangePasswordInput> = async (data: ChangePasswordInput) => {
    await changePassword.mutateAsync({
      userId: (user as IUserResponse).userId,
      oldPassword: data.previousPassword,
      newPassword: data.newPassword,
    });
  };

  if (changePassword.isSuccess) {
    navigate(PROFILE_PAGE);
  }

  return (
    <FormProvider {...methods}>
      <div className="md:w-[480px] md:mx-auto mb-10">
        <Link to="/profile">
          <img src={IconArrow} alt="" className="scale-100 cursor-pointer w-4 sm:w-6 sm:h-12 " />
        </Link>
        <div>
          <h1 className="font-bold text-xl lg:text-3xl py-4 leading-[3rem] sm:text-2xl md:text-3xl">Ubah Password Anda</h1>
        </div>
        <div className="my-5 xs:w-full m-auto">
          <form onSubmit={methods.handleSubmit(onSubmitHandler)} className="flex flex-col gap-5">
            {changePassword.isError && <AlertForm title={(changePassword.error as any).response.data.message} description={(changePassword.error as any).response.data.errors} />}
            <div className="border-b-slate-400 border-b-[1.5px] pb-4">
              <Input name="previousPassword" label="Kata Sandi Sebelumnya" isFill={methods.watch().previousPassword} placeholder="Kata Sandi Sebelumnya" type="password" />
            </div>

            <Input name="newPassword" label="Password Baru" isFill={methods.watch().newPassword} placeholder="Masukkan Password Baru Anda" type="password" />

            <Input name="confirmNewPassword" label="Konfirmasi Kata Sandi Baru" isFill={methods.watch().confirmNewPassword} placeholder="Konfirmasi Kata Sandi Baru Anda" type="password" />
            <div className="mt-12 sm:text-">
              <Button className="py-6 w-full text-lg font-semibold" type="submit" isLoading={changePassword.isPending}>
                Kirim
              </Button>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
}
