import vemo from "../../assets/aboutUs/vemoMobile.svg";
import mesin from "../../assets/aboutUs/mesinMobile.svg";
import man from "../../assets/aboutUs/manMobile.svg";
import laptop from "../../assets/aboutUs/imgEmpatmMobile.png";
import man1 from "../../assets/aboutUs/man1Mobile.png";
import man2 from "../../assets/aboutUs/man2Mobile.png";
import man3 from "../../assets/aboutUs/man3Mobile.png";
import logo from "../../assets/aboutUs/logoMobile.svg";

import { IconBrandFacebook, IconBrandGithubFilled, IconBrandInstagram, IconBrandWhatsapp } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { REGISTER_VEHICLE_PAGE, REQUEST_MAINTENANCE_VEHICLE_PAGE } from "@/lib/constants/routes";

export default function AboutPageMobile() {
  return (
    <div className="overflow-x-hidden">
      <div className="text-center text-white bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-800 px-6 py-6 leading-8 flex flex-col gap-4">
        <h3 className="font-semibold xs:text-xl sm:text-2xl">Making the company a place that can help and keep users happy, one app at a time.</h3>
        <p className="text-xs xs:text-base font-thin sm:text-xl">We think that we can help users in making it easier through this web app. Our mission is to provide full-featured software, everything runs smoothly for every user.</p>
      </div>
      <div className=" py-4 xs:py-5 flex  justify-center">
        <img src={vemo} alt="" className="xs:w-96" />
      </div>
      <div className="px-6  ">
        <h1 className="font-bold py-4 xs:text-2xl">What is VEMO?</h1>
        <div className="font-normal text-sm flex flex-col  leading-5  gap-5">
          <p className="xs:text-base sm:text-xl">VEMO is an app website that provides repairing your two-wheeled vehicle, you can find out the condition of your engine and motorcycle performance.</p>
          <p className="xs:text-base sm:text-xl">VEMO adalah sebuah website app yang menyediakan memperbaiki kendaraan beroda dua anda, anda bisa mengetahui kondisi mesin dan peforma motor anda.</p>
        </div>
        <div className="flex justify-between py-4 xs:justify-evenly ">
          <img src={mesin} alt="" className="sm:w-60" />
          <img src={man} alt="" className="sm:w-60" />
        </div>
        <h1 className="font-bold py-4 xs:text-2xl">What Makes VEMO Different?</h1>
        <div className="font-normal text-sm flex flex-col  leading-5  gap-5">
          <p className="xs:text-base sm:text-xl">A smooth and friendly user experience that has been built to ensure seamless user adoption.</p>
          <p className="xs:text-base sm:text-xl">
            Providing a new experience in application development in a very different way before, namely developing applications for users who want to maintain their vehicles through online applications so that there is no need to look for
            a repair shop that can be far away.
          </p>
        </div>
        <div className="flex justify-center px-4 py-4">
          <img src={laptop} alt="" className="" />
        </div>
        <h1 className="font-bold py-3 md:py-6 text-center text-xl xs:text-3xl md:text-4xl">Meet The VEMO Team</h1>
        <div className="flex flex-col gap-10 mb-10">
          <div className="flex items-center gap-4">
            <img src={man1} alt="" className="rounded-full w-20 xs:w-24" />
            <div className="flex flex-col">
              <h1 className="font-bold xs:text-xl sm:text-3xl md:text-4xl">Executive Team</h1>
              <p className="xs:text-base sm:text-xl md:text-2xl">Mohammad Eka Satrya P</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img src={man2} alt="" className="rounded-full w-20 xs:w-24" />
            <div className="flex flex-col">
              <h1 className="font-bold xs:text-xl sm:text-3xl md:text-4xl">Vice Exe Team</h1>
              <p className="xs:text-base sm:text-xl md:text-2xl">Maulvi Ilmullah F AA</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img src={man3} alt="" className="rounded-full w-20 xs:w-24" />
            <div className="flex flex-col">
              <h1 className="font-bold xs:text-xl sm:text-3xl md:text-4xl">Manager Team</h1>
              <p className="xs:text-base sm:text-xl md:text-2xl">Jonatan Hermanto PS</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#1E232C] px-4 -z-10 text-white text-[11px] font-thin w-full pb-5">
        <div className="flex justify-center py-4">
          <img src={logo} alt="" className="sm:w-12" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="">
            <h1 className="xs:text-lg sm:text-xl">Layanan</h1>
            <ul className="leading-8 text-[10px] xs:leading-9 sm:leading-10 xs:text-xs sm:text-base">
              <li>Index</li>
              <Link to={REGISTER_VEHICLE_PAGE}>
                <li>Daftar Kendaraan</li>
              </Link>
              <Link to={REQUEST_MAINTENANCE_VEHICLE_PAGE}>
                <li>Request Perawatan</li>
              </Link>
            </ul>
          </div>
          <div>
            <h1 className="xs:text-lg pb-[0.7rem] sm:text-xl">Etc</h1>
            <ul className="xs:text-xs sm:text-base">
              <li>Hubungin Kami</li>
            </ul>
          </div>
          <div className="">
            <h1 className="border-b-[1.5px] text-[10px] pb-2 xs:text-sm sm:text-xl w-52">Social Media Kami :</h1>
            <div className="flex gap-2 sm:gap-4 py-2 ">
              <IconBrandFacebook style={{ height: "20px" }} />
              <IconBrandGithubFilled style={{ height: "20px" }} />
              <IconBrandInstagram style={{ height: "20px" }} />
              <IconBrandWhatsapp style={{ height: "20px" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#0F141C] py-2 xs:py-4 sm:py-6">
        <h1 className="text-white font-light text-center text-sm  xs:text-lg sm:text-xl"> Copyright 2023 VEMO</h1>
      </div>
    </div>
  );
}
