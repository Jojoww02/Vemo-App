import React from "react";
import IconArrow from "../../assets/notification/Icon-arrow.svg";
import MailIcon from "../../assets/notification/Icon-mail copy.svg";
import { useNavigate } from "react-router-dom";
import { NOTIFICATION_PAGE } from "@/lib/constants/routes";

export default function NotificationDetailPage() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen">
      <div className="flex flex-col ">
        <img src={IconArrow} alt="" className="w-[2rem] cursor-pointer" onClick={() => navigate(NOTIFICATION_PAGE)} />
        <h1 className="mt-10 font-semibold text-4xl">Request Perawatan Motor Kamu Berhasil!</h1>
        <button className="flex items-center justify-center font-regular rounded-lg bg-primary text-white text-1xl w-[4rem] h-[2rem] mt-5 cursor-default">Inbox</button>
      </div>
      <div className="flex flex-row  mt-14 items-center">
        <img src={MailIcon} alt="" className="w-[3rem]" />
        <p className="px-5 font-extralight text-lg">Mail • 22 Sep </p>
      </div>
      <div className="flex flex-col mt-10  w-[70%] ">
        <h2 className="font-regular text-2xl">Hai, terimakasih sudah merequest kendaraan kamu, nantinya kendaraan yang kamu request akan di accept. Terimakasih sudah memilih VEMO!</h2>
      </div>
    </div>
  );
}
