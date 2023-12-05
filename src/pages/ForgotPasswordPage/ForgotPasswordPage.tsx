import zod from "zod";
import { Button, Input } from "@/components/atoms";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isObjectEmpty } from "@/lib/utils/common";
import useMobileResponsive from "@/hooks/useMobileResponsive";
import { ForgotPasswordPageMobile } from "@/mobile";

const ForgotPasswordSchema = zod.object({
    newEmail: zod
      .string()
      .min(1, "New Email address is required")
      .email("Email Address is invalid"),
    newPassword: zod
      .string()
      .min(1, "Password is required")
      .min(8, "New Password must be more than 8 characters")
      .max(32, "New Password must be less than 32 characters"),
  });
  
  export type ForgotPasswordInput = zod.TypeOf<typeof ForgotPasswordSchema>;
export default function ForgotPasswordPage():JSX.Element {
  const methods = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema),
  })
  const onSubmit = (data: any) => console.log(data)
  const isMobileResponive = useMobileResponsive()
  return (
    <>
      {isMobileResponive ? 
            <div className="h-screen overflow-hidden bg-[url('/src/assets/authImage/auth-bg.webp')] grid place-items-center bg-cover bg-center">
          <div className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-30"></div>

          {/* Card */}
          <div className="w-[35%] xl:w-[30%] xl:h-[80%] h-[75%] 2xl:h-[75%] p-8 rounded-[2rem]  bg-white z-10 shadow-[0px_2px_7px_5px_#00000040]">
            <p className="font-bold text-dark text-lg xl:text-3xl text-center">Create new password</p>
            <h3 className="font-medium text-[#8390a1] text-sm xl:text-base mt-5 text-center">Your new password must be unique from those previously used.</h3>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col mt-10 gap-5">
                    <Input
                        name="newEmail"
                        label="New Email"
                        isFill={methods.watch().newEmail}
                        placeholder="Your New Email"
                        type="email"
                    />
                    <Input 
                        name="newPassword"
                        label="New Password"
                        isFill={methods.watch().newPassword}
                        placeholder="Your New Password"
                        type="password"
                    />
                    <Button 
                        className="py-6 mt-20 text-lg font-semibold"
                        type="submit"
                        disabled={!isObjectEmpty(methods.formState.errors)}
                    >
                        Reset Password
                    </Button>
                </form>
            </FormProvider>
          </div>
        </div>
      : <ForgotPasswordPageMobile /> }
    </>
  )
}
