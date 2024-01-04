import React from "react";
import useUpdateEmail from "@/hooks/useUpdateEmail";
import useMutateUser from "@/hooks/useMutateUser";
import IconArrow from "../../assets/notification/Icon-arrow.svg";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import { IUserResponse } from "@/api/types";
import { Button, Input } from "@/components/atoms";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateRandomString } from "@/lib/utils/common";
import { PROFILE_PAGE, VERIFY_OTP_PAGE } from "@/lib/constants/routes";
import useMutateAuth from "@/hooks/useMutateAuth";
import useUpdateProfile from "@/hooks/useUpdateProfile";

export default function UpdateProfilePage() {
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);

  const { data: user } = useQuery<IUserResponse>({ queryKey: ["me"] });
  const { updateUser, updatePhotoProfile } = useMutateUser();
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

  const handlePhotoUpdate = async () => {
    const formData = new FormData();
    formData.append(
      "image",
      selectedImage!,
      `${generateRandomString(8)}.${selectedImage!.name
        .split(".")
        .pop()
        ?.toLowerCase()}`
    );
    await updatePhotoProfile.mutateAsync(formData);
  };

  const handleNonEmailUpdate = async (data: any) => {
    // cek apakah nama === nama sebelumnya
    if (data.name === (user as IUserResponse).name) {
      navigate(PROFILE_PAGE);
    }
    // jika tidak maka mutate dengan email null
    else {
      await updateUser.mutateAsync({
        userId: (user as IUserResponse).userId,
        name: data.name,
        email: null,
      });
    }
  };

  const handleEmailUpdate = async (data: any) => {
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
  };

  const onSubmitHandler = async (data: any) => {
    // jika update foto
    if (selectedImage) {
      await handlePhotoUpdate();
    }

    // jika tidak update email
    if (!isUpdateEmail) {
      await handleNonEmailUpdate(data);
    }
    // jika update email, maka send otp
    else {
      await handleEmailUpdate(data);
    }
  };

  updateUser.isSuccess && navigate(PROFILE_PAGE);

  if (sendOtpByEmail.isSuccess) {
    setFalseUpdateEmail();
    navigate(VERIFY_OTP_PAGE);
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="md:w-[480px] md:mx-auto mb-10">
      <div className="flex flex-col items-center justify-center relative">
        <div className="flex">
          <img
            src={IconArrow}
            alt=""
            className="absolute left-4 w-5 lg:w-7 cursor-pointer"
            onClick={() => navigate(PROFILE_PAGE)}
          />
        </div>
        <h1 className="font-bold text-xl sm:text-3xl lg:text-4xl mt-10">
          Update Profile
        </h1>
      </div>
      <div className="px-4 mt-10">
        <FormProvider {...methods}>
          <form
            autoComplete="off"
            onSubmit={methods.handleSubmit(onSubmitHandler)}
            className="flex-col flex gap-5"
          >
            <span className="flex gap-5 items-center mb-6">
              <Avatar className="w-16 h-16">
                <AvatarImage
                  src={
                    previewImage ? previewImage : `/PhotoProfile/${user?.photo}`
                  }
                />
                <AvatarFallback>
                  <img src="/user-profile-icon.svg" alt="" />
                </AvatarFallback>
              </Avatar>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className=""
              />
            </span>

            <Input
              defaultValue={(user as IUserResponse).name}
              name="name"
              label="Nama"
              isFill={methods.watch().name}
              placeholder="Masukkan nama Anda"
              type="text"
            />
            <Input
              defaultValue={(user as IUserResponse).email}
              name="email"
              label="Email"
              isFill={methods.watch().email}
              placeholder="Masukkan Email Anda"
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
                isLoading={
                  updateUser.isPending ||
                  sendOtpByEmail.isPending ||
                  updatePhotoProfile.isPending
                }
              >
                Kirim
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}
