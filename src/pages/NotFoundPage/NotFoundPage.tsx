import useMobile from "@/hooks/useMobile";
import { ArrowRight } from "lucide-react";
import NotFound from "/404-not-found-image.svg";
import { useNavigate } from "react-router-dom";
import { INDEX_PAGE } from "@/lib/constants/routes";

export default function NotFoundPage() {
  const navigate = useNavigate()
  const isMobile = useMobile()
  return (
    <>
      {isMobile ? 
        <div className="flex h-screen">
          <div className="w-1/2 flex flex-col px-20 justify-center gap-3">
            <h1 className="font-bold text-5xl text-[#455A64]">OOPS!</h1>
            <h1 className="font-semibold text-5xl text-[#455A64]">Tersesat Di Jalan?</h1>
            <p className="font-regular text-4xl text-[#455A64] mt-5">Sepertinya halaman ini tidak ada</p>
            <button className="w-[70%] h-[8%] xl:w-[50%] xl:h-[10%] flex mt-5 font-medium text-2xl items-center justify-center text-white bg-primary rounded-lg hover:bg-primary/80 duration-300" onClick={() => navigate(INDEX_PAGE)}>
              Ke Beranda<ArrowRight size={45} className="text-white pl-3"/>
            </button>
          </div>
          <div className="w-1/2 flex flex-col justify-center mt-3">
              <img src={NotFound} alt="" className="w-[75%] items-center" />
          </div>
        </div>
      : <div className="px-4 mt-10 ">
          <div className="flex flex-col justify-center items-center gap-5 mb-5">
            <h1 className="text-[#455A64] text-3xl font-bold tracking-wide xs:text-4xl">OOPS!</h1>
            <h1 className="text-[#455A64] text-3xl xs:text-4xl ">Tersesat Di Jalan?</h1>
          </div>
          <div className="flex flex-col items-center  gap-10">
            <img src={NotFound} alt="" className="w-52 sm:w-[30rem]" />
          </div>
          <div className="relative px-5">
            <div></div>
            <div className=" mt-5 sm:pr-0 pr-7  sm:w-full">
              <p className="text-2xl xs:text-3xl sm:text-4xl sm:text-center text-[#455A64]">Sepertinya Halaman Ini Tidak Ada</p>
            </div>
            <div className="  sm:flex sm:justify-center sm:items-center mt-5" onClick={() => navigate(INDEX_PAGE)}>
              <button className="bg-primary sm:py-4 sm:px-4  px-2 py-2 rounded-md text-lg sm:text-xl text-white font-medium flex items-center gap-2 hover:bg-primary/80 duration-300" type="button">
                Ke Beranda<ArrowRight size={27} className="text-white "/>
              </button>
            </div>
          </div>
        </div>}
    </>
  )
}
