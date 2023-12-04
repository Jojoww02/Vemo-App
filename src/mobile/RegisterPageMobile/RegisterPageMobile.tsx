import zod from "zod"
import useMutateAuth from "@/hooks/useMutateAuth";
import { Button, Input } from "@/components/atoms";
import { LOGIN_PAGE } from "@/lib/constants/routes";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { isObjectEmpty } from "@/lib/utils/common";

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
          Hello! Create an account to get started
        </h1>
        <div className="my-5 w-full xs:w-[90%] sm:pt-8 m-auto gap-4">
            <FormProvider {...methods}>
                <form
                    autoComplete="off"
                    onSubmit={methods.handleSubmit(onSubmitHandler)}
                    className="flex-col w-full flex gap-5"
                >
                    {registerUser.isError && (
                        <Alert variant="destructive" className="flex items-center">
                        <div className="mr-4">
                            <AlertTriangle />
                        </div>
                        <div>
                            <AlertTitle>
                            {(registerUser.error as any).response.data.message}
                            </AlertTitle>
                            <AlertDescription>
                            {(registerUser.error as any).response.data.errors}
                            </AlertDescription>
                        </div>
                        </Alert>
                    )}
                    <Input
                        name="name"
                        label="Name"
                        isFill={methods.watch().name}
                        placeholder="Input your name"
                        type="text"
                    />
                    <Input
                        name="email"
                        label="Email"
                        isFill={methods.watch().email}
                        placeholder="Input your email"
                        type="email"
                    />
                    <Input
                        name="password"
                        label="Password"
                        isFill={methods.watch().password}
                        placeholder="Input your password"
                        type="password"
                    />
                    <Input
                        name="confirmPassword"
                        label="Confirm Password"
                        isFill={methods.watch().confirmPassword}
                        placeholder="Confirm your password"
                        type="password"
                    />
                    <Button 
                        className="flex mt-7 items-center justify-center py-6 text-lg font-semibold"
                        type="submit"
                        disabled={!isObjectEmpty(methods.formState.errors)}
                        isLoading={registerUser.isPending}
                    >
                        Register
                    </Button>
                </form>
            </FormProvider>
        </div>
        <div className="flex mt-10 justify-center font-medium tracking-wide gap-1 sm:text-xl">
          <p className="">Already have an account?</p>
          <Link to={LOGIN_PAGE}>
            <p className="text-[#0587BE]">Login</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
