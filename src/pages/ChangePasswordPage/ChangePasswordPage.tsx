import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import IconArrow from "../../assets/notification/Icon-arrow.svg";
import { Button, Input } from "@/components/atoms";
import { Link } from "react-router-dom";

export default function ChangePasswordPage() {
  const methods = useForm();

  const onSubmit = (data: any) => console.log(data);
  return (
    <FormProvider {...methods}>
      <div className="md:w-[640px] md:mx-auto mb-10">
        <Link to="/profile">
          <img src={IconArrow} alt="" className=" lgmt-20 scale-100 cursor-pointer w-4 sm:w-6 sm:h-12 " />
        </Link>
        <div>
          <h1 className="font-bold text-xl lg:text-3xl py-4 leading-[3rem] sm:text-2xl md:text-3xl">Change Your Password</h1>
        </div>
        <div className="my-5 xs:w-[90%] sm:pt-8 m-auto">
          <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="border-b-slate-400 border-b-[1.5px]  pb-4">
              <Input name="previousPassword" label="Previous Password" isFill={methods.watch().previousPassword} placeholder="Input your password" type="password" />
            </div>

            <Input name="newPassword" label="NewPassword" isFill={methods.watch().newPassword} placeholder="Input your password" type="password" />

            <Input name="confirmNewPassword" label="Confirm New Password" isFill={methods.watch().confirmNewPassword} placeholder="Input your password" type="password" />
            <div className="mt-12 sm:text-">
              <Button className="py-6 w-full text-lg font-semibold" type="submit">
                Send
              </Button>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
}
