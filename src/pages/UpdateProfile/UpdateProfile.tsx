import IconArrow from "../../assets/notification/Icon-arrow.svg";
import { CONFIMASI_PASSWORD_PAGE } from "@/lib/constants/routes";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Input } from "@/components/atoms";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile() {
    const navigate = useNavigate()
  const methods = useForm();

  const onSubmit = (data: any) => console.log(data);
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center ">
        <div className="flex ">
          <img src={IconArrow} alt="" className="w-[2rem] absolute items-center left-10 cursor-pointer" onClick={() => navigate(CONFIMASI_PASSWORD_PAGE)} />
        </div>
        <h1 className="font-bold text-4xl">Update Profile</h1>
      </div>
      <div className="px-40 mt-10">
        <FormProvider {...methods}>
          <form autoComplete="off" onSubmit={methods.handleSubmit(onSubmit)} className="flex-col flex gap-5">
            {/* {registerUser.isError && (
                <Alert variant="destructive" className="flex items-center">
                  <div className="mr-4">
                    <AlertTriangle />
                  </div>
                  <div>
                    <AlertTitle>{(registerUser.error as any).response.data.message}</AlertTitle>
                    <AlertDescription>{(registerUser.error as any).response.data.errors}</AlertDescription>
                  </div>
                </Alert>
              )} */}
            <Input label="Name" isFill={methods.watch().name} placeholder="Input your name" type="text" />
            <Input label="Password" isFill={methods.watch().password} placeholder="Enter Your Password" type="password" />
            <div className="flex flex-col gap-2 mt-7">
              <Button className="py-6 text-lg font-semibold" type="submit">
                Send
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
