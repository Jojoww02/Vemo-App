import React from "react";
import IconArrow from "../../assets/notification/Icon-arrow.svg";
import { useNavigate } from "react-router-dom";
import { PROFILE_PAGE } from "@/lib/constants/routes";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Input } from "@/components/atoms";

export default function ConfirmasiPasswordPage() {
  const navigate = useNavigate();

  const methods = useForm();

  const onSubmit = (data: any) => console.log(data);
  return (
    <div className="w-full h-screen">
      <div className="flex flex-col items-center justify-center px-10">
        <div className="flex ">
          <img src={IconArrow} alt="" className="w-[2rem] absolute left-10 cursor-pointer items-center" onClick={() => navigate(PROFILE_PAGE)} />
        </div>
        <h1 className="font-bold text-4xl">Enter Your Password For Next Steps</h1>
      </div>
      <div className="px-60 mt-10">
        <FormProvider {...methods}>
          <form autoComplete="off" onSubmit={methods.handleSubmit(onSubmit)} className="flex-col ">
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
