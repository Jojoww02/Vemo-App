import React from "react";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { AlertForm, Button, Input } from "@/components/atoms";
import { useMutation } from "@tanstack/react-query";
import { verifyPasswordUserFn } from "@/api/services/users";
import { Link, useNavigate } from "react-router-dom";
import { PROFILE_PAGE, UPDATE_PROFILE_PAGE } from "@/lib/constants/routes";
import useUpdateProfile from "@/hooks/store/useUpdateProfile";
import useUpdateEmail from "@/hooks/store/useUpdateEmail";

const verifyPasswordSchema = zod.object({
  password: zod
    .string()
    .min(1, "Password diperlukan")
    .min(8, "Password harus lebih dari 8 karakter")
    .max(32, "Password harus kurang dari 32 karakter")
    .refine((password) => /\d/.test(password), {
      message: "Password harus mengandung setidaknya satu angka",
    }),
});

export type VerifyPasswordInput = zod.TypeOf<typeof verifyPasswordSchema>;

export default function VerifyPasswordPage() {
  const navigate = useNavigate();

  const { setIsCanUpdateProfile } = useUpdateProfile();
  const { setFalseUpdateEmail } = useUpdateEmail();

  const methods = useForm<VerifyPasswordInput>({
    resolver: zodResolver(verifyPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: async (password: string) => await verifyPasswordUserFn(password),
  });

  const onSubmitHandler: SubmitHandler<VerifyPasswordInput> = ({ password }: VerifyPasswordInput) => {
    mutation.mutate(password);
  };

  React.useEffect(() => {
    if (mutation.isSuccess) {
      setIsCanUpdateProfile(true);
      setFalseUpdateEmail();
      navigate(UPDATE_PROFILE_PAGE);
    }
  }, [mutation.isSuccess]);

  return (
    <div className="md:w-[480px] md:mx-auto mb-10 relative">
      <Link to={PROFILE_PAGE}>
        <img src={"/Icon-arrow.svg"} alt="" className="left-4 w-5 lg:w-7 absolute" />
      </Link>
      <div className="flex flex-col items-center justify-center px-4 lg:pt-6">
        <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl pt-6">Masukkan password anda untuk perbarui profile</h1>
      </div>
      <div className=" px-4 mt-10">
        <FormProvider {...methods}>
          <form autoComplete="off" onSubmit={methods.handleSubmit(onSubmitHandler)} className="flex flex-col gap-5 w-full">
            {mutation.isError && <AlertForm title={(mutation.error as any).response.data.message} description={(mutation.error as any).response.data.errors} />}
            <Input name="password" label="Password" isFill={methods.watch().password} placeholder="Masukkan Password Anda" type="password" />
            <div className="flex flex-col gap-2 mt-14">
              <Button className="py-6 text-lg font-semibold" type="submit" isLoading={mutation.isPending}>
                Kirim
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
