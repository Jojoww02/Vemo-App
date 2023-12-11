import IconArrow from "../../assets/notification/Icon-arrow.svg";
import MailIcon from "../../assets/notification/Icon-mail copy.svg";
import { useNavigate } from "react-router-dom";
import { NOTIFICATION_PAGE } from "@/lib/constants/routes";

export default function NotificationDetailPage():JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="md:w-[640px] md:mx-auto mb-10 rounded">
      <div className="flex flex-col ">
        <img src={IconArrow} alt="" className="lg:w-[1rem] w-4 cursor-pointer" onClick={() => navigate(NOTIFICATION_PAGE)} />
        <h1 className="lg:mt-10 mt-4  font-semibold lg:text-2xl">Request Perawatan Motor Kamu Berhasil!</h1>
        <button type="button" className="flex items-center justify-center font-regular rounded-lg bg-primary text-white text-1xl w-[4rem] h-[2rem] mt-5 cursor-default">Inbox</button>
      </div>
      <div className="flex flex-row  mt-14 items-center">
        <img src={MailIcon} alt="" className="lg:w-[1.5rem] w-6" />
        <p className="px-5 font-extralight text-base lg:text-lg">Mail • 22 Sep </p>
      </div>
      <div className=" rounded-xl p-4 py-5 pb-6 mt-5 relative rounded-l-lg bg-[#E8ECF4]">
        <h2 className="font-regular text-base lg:text-lg">Hai, terimakasih sudah merequest kendaraan kamu, nantinya kendaraan yang kamu request akan di accept. Terimakasih sudah memilih VEMO!</h2>
      </div>
    </div>
  );
}
