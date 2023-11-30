import { Button, Input } from "@/components/atoms";
import { FormProvider, useForm } from "react-hook-form";

export default function LoginPage():JSX.Element {
  const methods = useForm()
  const onSubmit = (data: any) => console.log(data);
  return (
    <div className="h-screen overflow-hidden bg-[url('/src/assets/authImage/auth-bg.webp')] grid place-items-center bg-cover bg-center">
      <div className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-30"></div>

      {/* Card */}
      <div className="w-[37%] xl:w-[30%] xl:h-[80%] h-[55%] 2xl:h-[75%] p-8 rounded-[2rem] bg-white z-10 shadow-[0px_2px_7px_5px_#00000040]">
        <p className="font-bold text-dark text-xl xl:text-3xl text-center">
          Welcome back! Glad to see you, Again!
        </p>
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col mt-10 gap-5">
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
                <div className="flex justify-end mt-6 font-semibold text-[#6a707c] text-sm xl:text-base">
                    <span className="cursor-pointer">Forgot Password?</span>
                </div>
                <Button className="py-6 mt-6 text-lg font-semibold">
                  Log In
                </Button>
            </form>
        </FormProvider>
        <div className="flex items-center justify-center text-base mt-5">
          <p className=" font-medium">Don’t have an account?<span className="text-[#0586BE] font-semibold cursor-pointer"> Register Now</span></p>
        </div>
      </div>
    </div>
  )
}
