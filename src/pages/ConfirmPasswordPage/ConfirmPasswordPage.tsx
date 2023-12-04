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
    <div className="md:w-[640px] md:mx-auto mb-10">
      <div className="flex flex-col items-center justify-center px-4 ">
        <div className="flex ">
          <img src={IconArrow} alt="" className="lg:w-[2rem] absolute lg:left-10 cursor-pointer w-4 sm:w-6 left-5" onClick={() => navigate(PROFILE_PAGE)} />
        </div>
        <h1 className="font-bold text-xl sm:text-2xl lg:text-4xl pt-10">Enter Your Password For Next Steps</h1>
      </div>
      <div className=" px-4 mt-10">
        <FormProvider {...methods}>
          <form autoComplete="off" onSubmit={methods.handleSubmit(onSubmit)} className="flex-col w-full ">
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
            <Input name="Password" label="password" isFill={methods.watch().password} placeholder="Enter Your Password" type="password" />
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
