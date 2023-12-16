import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import IconArrow from "../../assets/notification/Icon-arrow.svg";
import { PROFILE_PAGE } from "@/lib/constants/routes";
import { Button } from "@/components/atoms";
import useMutateAuth from "@/hooks/useMutateAuth";
import useMutateUser from "@/hooks/useMutateUser";
import useUpdateEmail from "@/hooks/useUpdateEmail";
import useUpdateProfile from "@/hooks/useUpdateProfile";

export default function VerifyOtpPage(): JSX.Element {
  const navigate = useNavigate();

  const { verifyOtp } = useMutateAuth();
  const { updateUser } = useMutateUser();

  const { dataUserToBeUpdate } = useUpdateProfile();
  const { setEmail } = useUpdateEmail();

  const [otp, setOTP] = React.useState(["", "", "", ""]);
  const [msgFailedAttempt, setMsgFailedAttempt] = React.useState("");
  const [isSendCodeDisabled, setIsSendCodeDisabled] = React.useState(false);

  const handleSubmit = async () => {
    await verifyOtp.mutateAsync(parseInt(otp.join(""), 10));
  };

  React.useEffect(() => {
    if (verifyOtp.isSuccess) {
      updateUser.mutate(dataUserToBeUpdate);
    }
  }, [verifyOtp.isSuccess]);

  React.useEffect(() => {
    if (updateUser.isSuccess) {
      navigate(PROFILE_PAGE);
      setEmail("");
    }
  }, [updateUser.isSuccess]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(
          `otp-input-${index + 1}`
        ) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      const prevInput = document.getElementById(
        `otp-input-${index - 1}`
      ) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const countDownTimer = (endDate: moment.Moment) => {
    setIsSendCodeDisabled(true);
    const countDownDate = endDate.toDate().getTime();

    const x = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      const addTwoSecond = distance + 2000;

      const minute = Math.floor(
        (addTwoSecond % (1000 * 60 * 60)) / (1000 * 60)
      );
      const second = Math.floor((addTwoSecond % (1000 * 60)) / 1000);

      if (second >= 10) {
        setMsgFailedAttempt(`0${minute}:${second}`);
      } else {
        setMsgFailedAttempt(`0${minute}:0${second}`);
      }

      if (addTwoSecond < 0) {
        clearInterval(x);
        setMsgFailedAttempt("");
        setIsSendCodeDisabled(false);
      }
    }, 1000);
  };

  React.useEffect(() => {
    countDownTimer(moment(new Date()).add(1, "minute"));
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col px-4 lg:items-center lg:justify-center md:pl-10">
        <img
          src={IconArrow}
          alt=""
          className="lg:w-[2rem] w-4 sm:w-6 absolute lg:items-center lg:left-10 cursor-pointer"
          onClick={() => navigate(PROFILE_PAGE)}
        />
        <h1 className="font-semibold lg:text-5xl text-xl sm:text-2xl  mt-10 md:text-3xl">
          Verifikasi OTP
        </h1>
        <p className="lg:font-base text-sm sm:text-lg lg:text-lg lg:text-[#8391A1] lg:mt-2 md:text-xl">
          Masukkan kode OTP yang baru saja kami berikan di email anda.
        </p>
      </div>
      <div className="flex justify-center items-center lg:pt-14">
        <div>
          <div className="flex items-center justify-center lg:space-x-10 space-x-5 mt-12">
            {otp.map((digit, index) => (
              <div key={index}>
                <label htmlFor={`otp-input-${index}`} className="sr-only">
                  {`Digit ${index + 1}`}
                </label>
                <input
                  type="text"
                  id={`otp-input-${index}`}
                  value={digit}
                  className="w-14 h-14 text-xl text-center border-2 border-gray-300 rounded-md focus:ring focus:ring-blue-400 lg:w-20 lg:h-20 lg:transiti lg:border-gray-300 lg:focus:ring lg:focus:ring-orange-400"
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-center items-center mt-14 gap-10">
            <p className="lg:text-base text-sm sm:text-lg font-medium">
              Tidak mendapatkan kode?
              <button
                type="button"
                onClick={() =>
                  countDownTimer(moment(new Date()).add(1, "minute"))
                }
                className="text-[#2495C6] cursor-pointer ml-1 disabled:text-slate-400 disabled:cursor-default"
                disabled={isSendCodeDisabled}
              >
                Kirim Kode
              </button>
            </p>
            <p>{msgFailedAttempt}</p>
            <Button
              title="verify"
              type="submit"
              onClick={handleSubmit}
              isLoading={verifyOtp.isPending || updateUser.isPending}
              disabled={otp.join("").length != 4}
            >
              Perbaharui Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
