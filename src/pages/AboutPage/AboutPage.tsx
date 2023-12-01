import Background from "../../assets/aboutUs/bg1.webp";
import Background2 from "../../assets/aboutUs/bg2.webp";
import Background3 from "../../assets/aboutUs/bg3.webp";
import Logo from "../../assets/aboutUs/about-us.svg";
import ProfileEka from "../../assets/aboutUs/Eka.svg";
import ProfileMaulvi from "../../assets/aboutUs/Maul.svg";
import ProfileJo from "../../assets/aboutUs/Jo.svg";
import LogoVemo from "../../assets/aboutUs/vemo-logo.svg";
import { IconBrandFacebook, IconBrandGithubFilled, IconBrandInstagram, IconBrandWhatsapp } from "@tabler/icons-react";

export default function AboutPage() {
  return (
    <div className="w-full ">
      <div className="flex pt-20">
        {/* left content */}
        <div className="flex w-1/2 px-20 ">
          <h1 className="font-semibold text-3xl">Making the company a place that can help and keep users happy, one app at a time.</h1>
        </div>
        {/* right content */}
        <div className="flex w-1/2 px-20">
          <p className="font-base text-lg">We think that we can help users in making it easier through this web app. Our mission is to provide full-featured software, everything runs smoothly for every user.</p>
        </div>
      </div>
      <div className="flex items-center justify-center pt-20">
        <img src={Logo} alt="" className="w-[50%] mb-2" />
      </div>
      <div className="mt-24 flex px-20">
        <div className="flex w-[30%]">
          <h1 className="font-semibold text-3xl">What Is VEMO?</h1>
        </div>
        <div className="flex flex-col w-2/3 px-10">
          <p className="font-base text-lg">VEMO is an app website that provides repairing your two-wheeled vehicle, you can find out the condition of your engine and motorcycle performance.</p>
          <a className="font-base text-lg mt-10">VEMO adalah sebuah website app yang menyediakan memperbaiki kendaraan beroda dua anda, anda bisa mengetahui kondisi mesin dan peforma motor anda.</a>
          <div className="flex flex-row space-x-14">
            <img src={Background} alt="" className="w-[45%] mt-10" />
            <img src={Background2} alt="" className="w-[45%] mt-10" />
          </div>
        </div>
      </div>
      <div className="mt-20 flex flex-col items-center justify-center">
        <h1 className="font-semibold text-3xl">What Makes VEMO Different?</h1>
      </div>
      <div className="flex mt-14 px-24 space-x-5">
        <div className="flex flex-col w-1/2 gap-7">
          <p className="font-base text-lg ">A smooth and friendly user experience that has been built to ensure seamless user adoption.</p>
          <p className="font-base text-lg">
            Providing a new experience in application development in a very different way before, namely developing applications for users who want to maintain their vehicles through online applications so that there is no need to look for
            a repair shop that can be far away.
          </p>
        </div>
        <div className="flex w-1/2 items-center">
          <img src={Background3} alt="" className="" />
        </div>
      </div>
      <div className="mt-20 flex flex-col items-center justify-center">
        <h1 className="font-semibold text-3xl">Meet The VEMO Team</h1>
      </div>
      <div className="flex mt-14 ">
        <div className="w-1/2  flex flex-row pl-10 xl:px-20">
          <img src={ProfileEka} alt="" className="w-[37%] xl:w-[40%]" />
          <div className="flex flex-col justify-center gap-5 pl-5">
            <h1 className="font-bold text-3xl items-center">Executive Team</h1>
            <p className="items-center font-regular text-xl">Mohammad Eka Satrya P</p>
          </div>
        </div>
        <div className="w-1/2 flex flex-row justify-end pr-10 xl:px-20">
          <div className="flex flex-col justify-center gap-5 pr-5">
            <h1 className="font-bold text-3xl items-center">Vice Exe Team</h1>
            <p className="font-regular text-xl items-center">Maulvi Ilmullah F AA</p>
          </div>
          <img src={ProfileMaulvi} alt="" className="w-[37%] xl:w-[40%] justify-end" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-5">
        <img src={ProfileJo} alt="" className="w-[17%] mt-14" />
        <h1 className="font-bold text-3xl">Manager Team</h1>
        <p className="font-regular text-xl mb-10">Jonatan Hermanto PS</p>
      </div>
      <div className="flex flex-col w-full bg-[#1E232C]">
        <div className="flex items-center justify-center mt-4">
          <img src={LogoVemo} alt="" className="w-[4%]" />
        </div>
        <div className="w-full relative flex grid-cols-3 justify-between">
          <div className="flex flex-col mt-3 gap-3 text-white px-20">
            <h1 className="font-semibold text-xl xl:text-2xl">Layanan</h1>
            <a className="font-regular text-lg xl:text-xl cursor-pointer hover:text-primary" >
              Index
            </a>
            <a className="font-regular text-lg xl:text-xl cursor-pointer hover:text-primary" >
              Daftar Kendaraan
            </a>
            <a className="font-regular text-lg xl:text-xl cursor-pointer hover:text-primary" >
              Request Perawatan
            </a>
          </div>
          <div className="flex flex-col mt-3 gap-3 text-white mr-20">
            <h1 className="font-semibold text-xl xl:text-2xl">Ect</h1>
            <a className="font-regular text-lg xl:text-xl cursor-pointer hover:text-primary">Hubungi Kami</a>
          </div>
          <div className="w-[50%] flex-col flex mt-3 gap-3 px-32 text-white">
            <h1 className="font-regular text-xl xl:text-2xl">Social Media Kami:</h1>
            <div className="w-[100%] h-[1%] border-lg bg-white" />
            <div className="flex space-x-5">
              <IconBrandFacebook  style={{ fontSize: "140%", cursor: "pointer" }} className="hover:text-primary" />
              <IconBrandInstagram style={{ fontSize: "140%", cursor: "pointer" }} className="hover:text-primary" />
              <IconBrandGithubFilled style={{ fontSize: "140%", cursor: "pointer" }} className="hover:text-primary" />
              <IconBrandWhatsapp  style={{ fontSize: "140%", cursor: "pointer" }} className="hover:text-primary" />
            </div>
          </div>
        </div>
        <div className=" flex flex-col py-5 items-center justify-center bg-[#0F141C]">
          <p className="font-regular text-xl text-white">Copyright 2023 VEMO</p>
        </div>
      </div>
    </div>
  );
}
