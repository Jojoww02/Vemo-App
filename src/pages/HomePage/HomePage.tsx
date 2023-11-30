import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { Button, Input } from "@/components/atoms";
import { isObjectEmpty } from "@/lib/utils/common";
import { Link } from "react-router-dom";
import useMutateAuth from "@/hooks/useMutateAuth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

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

export default function HomePage(): JSX.Element {
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
    <div className="flex h-screen overflow-y-hidden">
      {/* Content Left Start */}
      <div className="w-2/5 flex flex-col justify-evenly px-10">
        <div>
          <h1 className="text-6xl font-bold">Welcome!</h1>
          <div className="flex items-center text-3xl xl:text-4xl ml-2 mt-1">
            <p className="font-medium">to</p>
            <span className="flex items-center ml-5">
              <img
                src="/src/assets/iconVemo.svg"
                alt=""
                className="w-[60px] xl:w-[80px]"
              />
              <p className="text-[#F4B400] font-semibold italic ml-3 tracking-wide">
                VEMO
              </p>
            </span>
          </div>
        </div>
        <div className="2xl:text-xl text-md text-[#8391A1] font-medium flex flex-col gap-6 overflow-y-auto">
          <p>
            VEMO is an app website that provides repairing your two-wheeled
            vehicle, you can find out the condition of your engine and
            motorcycle performance.
          </p>
          <p>
            VEMO adalah sebuah website app yang menyediakan memperbaiki
            kendaraan beroda dua anda, anda bisa mengetahui kondisi mesin dan
            peforma motor anda.
          </p>
        </div>
        <div className="flex items-center">
          <span className="flex items-center">
            <img
              src="/src/assets/iconVemo.svg"
              alt=""
              className="w-[30px] xl:w-[40px]"
            />
            <p className="text-[#F4B400] font-semibold italic ml-2 tracking-wide xl:text-lg">
              VEMO
            </p>
          </span>
          <p className="mx-2 font-medium text-lg">|</p>
          <p className="font-medium text-xs xl:text-base">
            The best place for your vehicle
          </p>
        </div>
      </div>
      {/* Content Left End */}

      {/* Content Right Start */}
      <div className="relative w-3/5 bg-cover grid place-items-center bg-[url('/src/assets/homeLanding/landing-image.webp')]">
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>

        {/* Card */}
        <div className="w-3/5 xl:w-1/2 p-8 rounded-[2rem] bg-white z-10 shadow-[0px_2px_7px_5px_#00000040]">
          <p className="font-bold text-2xl mb-6 text-center">
            Create an Account
          </p>
          <FormProvider {...methods}>
            <form
              autoComplete="off"
              onSubmit={methods.handleSubmit(onSubmitHandler)}
              className="flex-col flex gap-4"
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
                label="Name"
                isFill={methods.watch().name}
                placeholder="Input your name"
                type="text"
              />
              <Input
                label="Email"
                isFill={methods.watch().email}
                placeholder="Input your email"
                type="email"
              />
              <Input
                label="Password"
                isFill={methods.watch().password}
                placeholder="Input your password"
                type="password"
              />
              <Input
                label="Confirm Password"
                isFill={methods.watch().confirmPassword}
                placeholder="Confirm your password"
                type="password"
              />
              <div className="flex flex-col gap-2 cursor-pointer">
                <Button
                  className="py-6 text-lg font-semibold"
                  type="submit"
                  disabled={!isObjectEmpty(methods.formState.errors)}
                  isLoading={registerUser.isPending}
                >
                  Sign Up
                </Button>
                <Button
                  className="py-6 text-lg font-semibold bg-dark hover:bg-dark/80"
                  asChild
                >
                  <Link className="w-full text-center" to="/login">Log In</Link>
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
