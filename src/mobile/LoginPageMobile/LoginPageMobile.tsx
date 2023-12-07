import zod from "zod"
import useMutateAuth from "@/hooks/useMutateAuth";
import { FORGOT_PASSWORD_REQUEST_PAGE, REGISTER_USER_PAGE } from "@/lib/constants/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@/components/atoms";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { isObjectEmpty } from "@/lib/utils/common";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const loginSchema = zod.object({
    email: zod
      .string()
      .min(1, "Email address is required")
      .email("Email Address is invalid"),
    password: zod
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
  });
  
export type LoginInput = zod.TypeOf<typeof loginSchema>;
export default function LoginPageMobile():JSX.Element {
  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const { loginUser } = useMutateAuth();

  const onSubmitHandler: SubmitHandler<LoginInput> = async (
    credentials: LoginInput
  ) => {
    await loginUser.mutateAsync(credentials);
  };
  return (
    <div className="sm:w-[640px] sm:mx-auto h-screen pt-8 px-6 sm:px-20 sm:mt-10">
      <h1 className="text-4xl leading-10 font-bold mb-10 pl-4">Welcome back! Glad to see you, Again!</h1>
      <div className="my-5 w-full xs:w-[90%] sm:pt-8 m-auto gap-4">
        <FormProvider {...methods}>
            <form 
                onSubmit={methods.handleSubmit(onSubmitHandler)}
                className="flex-col w-full flex gap-5"
            >
                {loginUser.isError && (
                    <Alert variant="destructive" className="flex items-center">
                        <div className="mr-4">
                            <AlertTriangle />
                        </div>
                        <div>
                        <AlertTitle>
                            {(loginUser.error as any).response.data.message}
                        </AlertTitle>
                        <AlertDescription>
                            {(loginUser.error as any).response.data.errors}
                        </AlertDescription>
                        </div>
                    </Alert>
                )}
                <Input
                    name="email"
                    label="Email"
                    isFill={methods.watch().email}
                    placeholder="Enter Your Email"
                    type="email"
                />
                <Input
                    name="password"
                    label="Password"
                    isFill={methods.watch().password}
                    placeholder="Enter Your Password"
                    type="password"
                />
                <div className="text-[#6a707c] text-end font-semibold mt-3">
                    <Link to={FORGOT_PASSWORD_REQUEST_PAGE}>
                        <p>Forgot Password?</p>
                    </Link>
                </div>
                <Button 
                    className="flex mt-7 items-center justify-center py-6 text-lg font-semibold"
                    type="submit"
                    disabled={!isObjectEmpty(methods.formState.errors)}
                    isLoading={loginUser.isPending}
                >
                    Log In
                </Button>
            </form>
        </FormProvider>
      </div>
      <div className="flex justify-center gap-1 mt-10 font-medium">
        <p className="">Don’t have an account?</p>
        <div className="text-[#0587BE]">
          <Link to={REGISTER_USER_PAGE}>
            <p>Register</p>
          </Link>
        </div>
      </div>      
    </div>
  )
}
