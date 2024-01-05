import Background2 from "../../../assets/aboutUs/bg2.webp";
import Background3 from "../../../assets/aboutUs/bg3.webp";
import Logo from "../../../assets/aboutUs/about-us.svg";
import ProfileEka from "../../../assets/aboutUs/Eka.svg";
import ProfileMaulvi from "../../../assets/aboutUs/Maul.svg";
import ProfileJo from "../../../assets/aboutUs/Jo.svg";
import LogoVemo from "../../../assets/aboutUs/vemo-logo.svg";
import { IconBrandFacebook, IconBrandGithubFilled, IconBrandInstagram, IconBrandWhatsapp } from "@tabler/icons-react";
import useMobile from "@/hooks/useMobile";
import AboutPageMobile from "@/mobile/AboutPageMobile";
import { Link } from "react-router-dom";
import { DASHBOARD_PAGE, REGISTER_VEHICLE_PAGE, REQUEST_MAINTENANCE_VEHICLE_PAGE } from "@/lib/constants/routes";

export default function AboutPage() {
  const isMobile = useMobile();
  return (
    <>
      {isMobile ? (
        <div className="px-4">
          <div className="text-center text-white bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-800 px-6 py-6 leading-8 flex flex-col gap-4 overflow-x-auto">
            <h3 className="font-semibold xs:text-xl sm:text-2xl">Menjadikan perusahaan sebagai tempat yang dapat membantu dan membuat user senang, satu aplikasi dalam satu waktu.</h3>
            <p className="text-xs xs:text-base font-thin sm:text-xl">
              Kami rasa, kami dapat membantu user dalam mempermudahnya melalui aplikasi web ini. Misi kami adalah menyediakan perangkat lunak berfitur lengkap, semuanya berjalan lancar untuk setiap user.
            </p>
          </div>
          <div className=" py-4 xs:py-5 flex  justify-center">
            <img src={Logo} alt="" className="xs:w-96" />
          </div>
          <div className="px-6  ">
            <h1 className="font-bold py-4 xs:text-2xl">Apa Itu VEMO?</h1>
            <div className="font-normal text-sm flex flex-col  leading-5  gap-5">
              <p className="xs:text-base sm:text-xl">VEMO adalah sebuah website app yang menyediakan memperbaiki kendaraan beroda dua anda, anda bisa mengetahui kondisi mesin dan peforma motor anda.</p>
            </div>
            <div className="flex justify-between py-4 xs:justify-evenly ">
              <img src={"/bg1.webp"} alt="" className="w-40 md:w-60" />
              <img src={Background2} alt="" className="w-40 md:w-60" />
            </div>
            <h1 className="font-bold py-4 xs:text-2xl">Apa Yang Membuat VEMO Berbeda?</h1>
            <div className="font-normal text-sm flex flex-col  leading-5  gap-5">
              <p className="xs:text-base sm:text-xl">Pengalaman user yang lancar dan ramah yang dibangun untuk memastikan penyesuaian user yang lancar.</p>
              <p className="xs:text-base sm:text-xl">
                Memberikan pengalaman baru dalam pengembangan aplikasi dengan cara yang sangat berbeda sebelumnya yaitu mengembangkan aplikasi bagi user yang ingin merawat kendaraannya melalui aplikasi online sehingga tidak perlu lagi
                mencari-cari bengkel yang jaraknya mungkin jauh.
              </p>
            </div>
            <div className="flex justify-center px-4 py-4">
              <img src={Background3} alt="" className="w-72 md:w-96" />
            </div>
            <h1 className="font-bold py-6 text-center text-xl xs:text-3xl">Bertemu Dengan VEMO Team</h1>
            <div className="flex flex-col gap-10 mb-10">
              <div className="flex items-center gap-4">
                <img src={ProfileEka} alt="" className="rounded-full w-32" />
                <div className="flex flex-col">
                  <h1 className="font-bold xs:text-xl sm:text-4xl">Executive Team</h1>
                  <p className="xs:text-base sm:text-3xl">Mohammad Eka Satrya P</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img src={ProfileMaulvi} alt="" className="rounded-full w-32" />
                <div className="flex flex-col">
                  <h1 className="font-bold xs:text-xl sm:text-4xl">Vice Exe Team</h1>
                  <p className="xs:text-base sm:text-3xl">Maulvi Ilmullah F AA</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img src={ProfileJo} alt="" className="rounded-full w-32" />
                <div className="flex flex-col">
                  <h1 className="font-bold xs:text-xl sm:text-4xl">Manager Team</h1>
                  <p className="xs:text-base sm:text-3xl">Jonatan Hermanto PS</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#1E232C] px-4 -z-10 text-white text-[11px] font-thin w-full pb-5">
            <div className="flex justify-center py-4">
              <img src={LogoVemo} alt="" className="sm:w-12" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="">
                <h1 className="xs:text-lg sm:text-xl">Layanan</h1>
                <ul className="leading-8 text-[10px] xs:leading-9 sm:leading-10 xs:text-xs sm:text-base ">
                  <Link to={DASHBOARD_PAGE}>
                    <li className="hover:text-primary cursor-pointer">Index</li>
                  </Link>
                  <Link to={REGISTER_VEHICLE_PAGE}>
                    <li className="hover:text-primary">Daftar Kendaraan</li>
                  </Link>
                  <Link to={REQUEST_MAINTENANCE_VEHICLE_PAGE}>
                    <li className="hover:text-primary">Request Perawatan</li>
                  </Link>
                </ul>
              </div>
              <div>
                <h1 className="xs:text-lg pb-[0.7rem] sm:text-xl">Lainnya</h1>
                <ul className="xs:text-xs w-25 sm:text-base">
                  <li className="hover:text-primary cursor-pointer">Hubungi Kami</li>
                </ul>
              </div>
              <div className="">
                <h1 className="border-b-[1.5px] text-[10px] pb-2 xs:text-sm sm:text-xl w-52">Social Media Kami :</h1>
                <div className="flex gap-2 sm:gap-4 py-2 ">
                  <IconBrandFacebook style={{ height: "20px" }} className="hover:text-primary cursor-pointer" />
                  <IconBrandGithubFilled style={{ height: "20px" }} className="hover:text-primary cursor-pointer" />
                  <IconBrandInstagram style={{ height: "20px" }} className="hover:text-primary cursor-pointer" />
                  <IconBrandWhatsapp style={{ height: "20px" }} className="hover:text-primary cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#0F141C] py-2 xs:py-4 sm:py-6">
            <h1 className="text-white font-light text-center text-sm  xs:text-lg sm:text-xl"> Copyright 2023 VEMO</h1>
          </div>
        </div>
      ) : (
        <AboutPageMobile />
      )}
    </>
  );
}
