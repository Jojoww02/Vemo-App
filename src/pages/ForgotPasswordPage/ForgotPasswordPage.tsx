import zod, { string } from "zod";
import { Button, Input } from "@/components/atoms";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isObjectEmpty } from "@/lib/utils/common";
import useMobile from "@/hooks/useMobile";
import useMutateAuth from "@/hooks/useMutateAuth";
import { useNavigate, useParams } from "react-router-dom";
import { PROFILE_PAGE } from "@/lib/constants/routes";

const ForgotPasswordSchema = zod
  .object({
    newPassword: zod.string().min(1, "Password is required").min(8, "Password must be more than 8 characters").max(32, "Password must be less than 32 characters"),
    confirmNewPassword: zod.string().min(1, "Password is required").min(8, "New Password must be more than 8 characters").max(32, "New Password must be less than 32 characters"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords do not match",
  });

export type ForgotPasswordInput = zod.TypeOf<typeof ForgotPasswordSchema>;
export default function ForgotPasswordPage(): JSX.Element {
  const methods = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema),
  });
  const navigate = useNavigate()

  const { forgotPasswordUser } = useMutateAuth()

  const { token } = useParams<{ token: string }>();

  const onSubmitHandler: SubmitHandler<ForgotPasswordInput> = async (newPassword: ForgotPasswordInput) => {
    await forgotPasswordUser.mutateAsync( {
      token: token,
      newPassword: newPassword.newPassword
    });
  };
  
  if (forgotPasswordUser.isSuccess) {
    navigate(PROFILE_PAGE)
  }

  const isMobile = useMobile();
  return (
    <>
      {isMobile ? (
        <div className="h-screen overflow-hidden bg-[url('/src/assets/authImage/auth-bg.webp')] grid place-items-center bg-cover bg-center">
          <div className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-30"></div>

          {/* Card */}
          <div className="w-[35%] xl:w-[30%] xl:h-[80%] h-[75%] 2xl:h-[75%] p-8 rounded-[2rem]  bg-white z-10 shadow-[0px_2px_7px_5px_#00000040]">
            <p className="font-bold text-dark text-lg xl:text-3xl text-center">Create new password</p>
            <h3 className="font-medium text-[#8390a1] text-sm xl:text-base mt-5 text-center">Your new password must be unique from those previously used.</h3>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmitHandler)} className="flex flex-col mt-10 gap-5">
                <Input name="newPassword" label="New Password" isFill={methods.watch().newPassword} placeholder="Your New Password" type="password" />
                <Input name="confirmNewPassword" label="ConfirmNew Password" isFill={methods.watch().confirmNewPassword} placeholder="Your New Password" type="password" />
                <Button className="py-6 mt-20 text-lg font-semibold" type="submit" disabled={!isObjectEmpty(methods.formState.errors)}>
                  Reset Password
                </Button>
              </form>
            </FormProvider>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
