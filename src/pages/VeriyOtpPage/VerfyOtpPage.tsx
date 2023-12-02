import React, { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import IconArrow from "../../assets/notification/Icon-arrow.svg";
import { DASHBOARD_PAGE, PROFILE_PAGE } from "@/lib/constants/routes";
import { Button } from "@/components/atoms";

export default function VerifyOtpPage(): JSX.Element {
  const navigate = useNavigate();

  const [otp, setOTP] = useState(["", "", "", ""]);
  const [msgFailedAttempt, setMsgFailedAttempt] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSendCodeDisabled, setIsSendCodeDisabled] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  //   const handleSubmit = async () => {
  //     if (otp.join("").length === 4) {
  //       try {
  //         const response = await axios.post("https://localhost:7286/verify-otp", {
  //           email: "makanlapak02@gmail.com",
  //           otp: otp.join(""),
  //         });

  //         console.log(response.status);
  //       } catch (error) {
  //         console.log(error.response?.data);
  //       }
  //     }
  //   };

  const handleBackspace = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      const prevInput = document.getElementById(`otp-input-${index - 1}`) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  useEffect(() => {
    if (otp.join("").length === 4) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [otp]);

  const countDownTimer = (endDate: moment.Moment) => {
    setIsSendCodeDisabled(true);
    const countDownDate = endDate.toDate().getTime();

    const x = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      const addTwoSecond = distance + 2000;

      const minute = Math.floor((addTwoSecond % (1000 * 60 * 60)) / (1000 * 60));
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

  useEffect(() => {
    countDownTimer(moment(new Date()).add(1, "minute"));
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col pt-24 items-center justify-center">
        <div className="flex ">
          <img src={IconArrow} alt="" className="w-[2rem] absolute items-center left-10 cursor-pointer" onClick={() => navigate(PROFILE_PAGE)} />
        </div>
        <h1 className="font-semibold text-5xl">OTP Verification</h1>
        <p className="font-base text-lg text-[#8391A1] mt-2">Enter the verification code we just sent on your email address.</p>
      </div>
      <div className="flex justify-center items-center pt-14">
        <div>
          <div className="flex justify-center space-x-10 items-center">
            {otp.map((digit, index) => (
              <div key={index}>
                <label htmlFor={`otp-input-${index}`} className="sr-only">
                  {`Digit ${index + 1}`}
                </label>
                <input
                  type="text"
                  id={`otp-input-${index}`}
                  value={digit}
                  className="w-20 h-20 text-xl transition text-center border-2 border-gray-300 rounded-md focus:ring focus:ring-orange-400"
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-center items-center mt-14 gap-10">
            <p className="text-base font-medium">
              Dont have any receive code?
              <button type="button" onClick={() => countDownTimer(moment(new Date()).add(1, "minute"))} className="text-[#2495C6] cursor-pointer ml-1 disabled:text-slate-400 disabled:cursor-default" disabled={isSendCodeDisabled}>
                Send Code
              </button>
            </p>
            <p>{msgFailedAttempt}</p>
            <Button title="verify" type="submit" onClick={() => console.log(otp.join(""))}>
              Send Code
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
