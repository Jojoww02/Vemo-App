import useUpdateEmail from "@/hooks/useUpdateEmail";
import useMutateUser from "@/hooks/useMutateUser";
import IconArrow from "../../assets/notification/Icon-arrow.svg";
import {
  PROFILE_PAGE,
  VERIFY_OTP_PAGE,
  VERIFY_PASSWORD_PAGE,
} from "@/lib/constants/routes";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import { IUserResponse } from "@/api/types";
import { Button, Input } from "@/components/atoms";
import useMutateAuth from "@/hooks/useMutateAuth";
import useUpdateProfile from "@/hooks/useUpdateProfile";

export default function UpdateProfilePage() {
  const { data: user } = useQuery<IUserResponse>({ queryKey: ["me"] });
  const { updateUser } = useMutateUser();
  const { sendOtpByEmail } = useMutateAuth();

  const { isUpdateEmail, setEmail, setFalseUpdateEmail } = useUpdateEmail(
    useShallow((state) => ({
      isUpdateEmail: state.isUpdateEmail,
      setEmail: state.setEmail,
      setFalseUpdateEmail: state.setFalseUpdateEmail,
    }))
  );

  const { setDataUserToBeUpdate } = useUpdateProfile();

  const navigate = useNavigate();
  const methods = useForm();

  const onSubmitHandler = async (data: any) => {
    // jika tidak update email
    if (!isUpdateEmail) {
      // cek apakah nama === nama sebelumnya
      if (data.name === (user as IUserResponse).name) {
        alert("Nama tidak boleh sama dengan sebelumnya");
      }
      // jika tidak maka mutate dengan email null
      else {
        await updateUser.mutateAsync({
          userId: (user as IUserResponse).userId,
          name: data.name,
          email: null,
        });
      }
    }
    // jika update email
    else {
      // cek apakah email sama dengan sebelumnya
      if (
        data.email === undefined ||
        data.email === (user as IUserResponse).email
      ) {
        alert("Email tidak boleh sama dengan sebelumnya");
      }
      // cek apakah nama sama dengan sebelumnya, jika iya mutate dengan data nama null
      else if (data.name === (user as IUserResponse).name) {
        setEmail(data.email);
        setDataUserToBeUpdate({
          userId: (user as IUserResponse).userId,
          name: null,
          email: data.email,
        });
        await sendOtpByEmail.mutateAsync(data.email);
      }
      // jika tidak keduanya maka mutate data
      else {
        setEmail(data.email);
        setDataUserToBeUpdate({
          userId: (user as IUserResponse).userId,
          name: data.name,
          email: data.email,
        });
        await sendOtpByEmail.mutateAsync(data.email);
      }
    }
  };

  updateUser.isSuccess && navigate(PROFILE_PAGE);

  if (sendOtpByEmail.isSuccess) {
    setFalseUpdateEmail();
    navigate(VERIFY_OTP_PAGE);
  }

  return (
    <main className="md:w-[480px] md:mx-auto mb-10">
      <div className="flex flex-col items-center justify-center relative">
        <div className="flex ">
          <img
            src={IconArrow}
            alt=""
            className="absolute left-4 w-5 lg:w-7  cursor-pointer"
            onClick={() => navigate(VERIFY_PASSWORD_PAGE)}
          />
        </div>
        <h1 className="font-bold text-xl sm:text-3xl lg:text-4xl mt-10">
          Update Profile
        </h1>
      </div>
      <div className=" px-4 mt-10">
        <FormProvider {...methods}>
          <form
            autoComplete="off"
            onSubmit={methods.handleSubmit(onSubmitHandler)}
            className="flex-col flex gap-5"
          >
            <Input
              defaultValue={(user as IUserResponse).name}
              name="name"
              label="Name"
              isFill={methods.watch().name}
              placeholder="Input your name"
              type="text"
            />
            <Input
              defaultValue={(user as IUserResponse).email}
              name="email"
              label="Email"
              isFill={methods.watch().email}
              placeholder="Enter Your email"
              type="email"
              disabled
              editable
            />
            {isUpdateEmail && (
              <p className="pl-1 -mt-3 text-sm text-yellow-500 italic">
                * Ketika update email akan dimintai kode otp di email yang
                terbaru
              </p>
            )}
            <div className="flex flex-col gap-2 mt-7">
              <Button
                className="py-6 text-lg font-semibold"
                type="submit"
                isLoading={updateUser.isPending || sendOtpByEmail.isPending}
              >
                Send
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}
