import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@/components/atoms";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useMutateAuth from "@/hooks/useMutateAuth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { isObjectEmpty } from "@/lib/utils/common";

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

export default function LoginPage(): JSX.Element {
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
    <div className="h-screen overflow-hidden bg-[url('/src/assets/authImage/auth-bg.webp')] grid place-items-center bg-cover bg-center">
      <div className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-30"></div>

      {/* Card */}
      <div className="w-[37%] xl:w-[30%] xl:h-[80%] h-[75%] 2xl:h-[75%] p-8 rounded-[2rem] bg-white z-10 shadow-[0px_2px_7px_5px_#00000040]">
        <p className="font-bold text-dark text-xl xl:text-3xl text-center">
          Welcome back! Glad to see you, Again!
        </p>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmitHandler)}
            className="flex flex-col mt-10 gap-5"
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
              label="Email"
              isFill={methods.watch().email}
              placeholder="Enter Your Email"
            />
            <Input
              label="Password"
              isFill={methods.watch().password}
              placeholder="Enter Your Password"
              type="password"
            />
            <div className="flex justify-end mt-2 font-semibold text-[#6a707c] text-sm xl:text-base">
              <Link to={"/forgot-password/request"}>
                <span className="cursor-pointer">Forgot Password?</span>
              </Link>
            </div>
            <Button
              disabled={!isObjectEmpty(methods.formState.errors)}
              isLoading={loginUser.isPending}
              className="py-6 mt-4 text-lg font-semibold"
            >
              Log In
            </Button>
          </form>
        </FormProvider>
        <div className="flex items-center text-xs justify-center xl:text-base mt-4 xl:mt-5">
          <p className=" font-medium">
            Don’t have an account?
            <Link to={"/home"}>
              <span className="text-[#0586BE] ml-1 font-semibold cursor-pointer">
                {" "}
                Register Now
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
