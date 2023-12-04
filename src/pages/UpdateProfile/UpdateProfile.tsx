import IconArrow from "../../assets/notification/Icon-arrow.svg";
import { CONFIMASI_PASSWORD_PAGE } from "@/lib/constants/routes";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Input } from "@/components/atoms";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "@/api/types";

export default function UpdateProfile() {
  const { data: user } = useQuery({ queryKey: ["me"] });

  const navigate = useNavigate();
  const methods = useForm();

  const onSubmit = (data: any) => console.log(data);
  return (
    <div className="md:w-[640px] md:mx-auto mb-10">
      <div className="flex flex-col items-center justify-center ">
        <div className="flex ">
          <img src={IconArrow} alt="" className="lg:w-[2rem] absolute lg:items-center lg:left-10 w-4 sm:w-6 left-5  cursor-pointer" onClick={() => navigate(CONFIMASI_PASSWORD_PAGE)} />
        </div>
        <h1 className="font-bold text-xl sm:text-3xl lg:text-4xl mt-10">Update Profile</h1>
      </div>
      <div className=" px-4 mt-10">
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
            <Input defaultValue={(user as IUser).name} name="name" label="Name" isFill={methods.watch().name} placeholder="Input your name" type="text" />
            <Input defaultValue={(user as IUser).email} name="email" label="Email" isFill={methods.watch().email} placeholder="Enter Your email" type="email" />
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
