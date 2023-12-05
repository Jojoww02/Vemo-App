import zod from "zod"
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@/components/atoms";
import { isObjectEmpty } from "@/lib/utils/common";

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
export default function ForgotPasswordPageMobile():JSX.Element {
  const methods = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema),
  })
  const onSubmit = (data: any) => console.log(data)
  return (
    <div className="pt-8 px-9 sm:px-20 sm:pt-10 relative">
      <h1 className="text-3xl leading-10 font-bold mb-2 sm:text-4xl">Create new password</h1>
      <p className="pt-3 text-paragraph pb-4 sm:text-lg sm:w-3/4 sm:pb-6">Your new password must be unique from those previously used.</p>
      <div className="flex flex-col my-5">
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="flex-col w-full flex gap-5">
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