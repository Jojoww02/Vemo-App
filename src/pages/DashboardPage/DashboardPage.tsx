import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/atoms/tooltip";
import { IconDots, IconInfoCircle } from "@tabler/icons-react";
import img1 from "../../assets/dashboard/matic.svg";
import request from "../../assets/dashboard/requestVeh.png";
import register from "../../assets/dashboard/registerVeh.png";
import gradient from "../../assets/dashboard/linear-gradient.svg";
export default function DashboardPage() {
  const carData = [
    { id: 1, name: "Beat Honda 2021", plate: "B 1234 SBO", status: "Good " },
    { id: 1, name: "Beat Honda 2021", plate: "B 1234 SBO", status: "Good " },
  ];
  return (
    <>
      <div className="bg-[#898989] pt-2 pb-10 rounded-xl px-10 relative shadow-[0px_0px_7px_#00000040]">
        <h1 className="text-white text-lg font-medium py-2">List Kendaraan:</h1>
        <div className="flex justify-between gap-6">
          {carData.map((car) => (
            <div
              key={car.id}
              className="bg-white w-2/3 rounded-xl flex gap-6 px-4 py-2 shadow-[0px_3px_7px_5px_#00000040]"
            >
              <img src={img1} alt="" className="w-26" />
              <div className="mt-4 w-full">
                <h1 className="font-semibold text-2xl tracking-wide mb-1">
                  {car.name}
                </h1>
                <h3 className="font-semibold text-2xl pb-3 text-[#898989]">
                  {car.plate}
                </h3>
                <div className="relative w-full flex justify-between items-center gap-2 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#49E102] w-5 h-5 rounded-full ring-2 ring-green-200"></div>
                    <h4 className="text-base">{car.status}</h4>
                  </div>
                  <div className="mr-7">
                    <button
                      type="button"
                      className="bg-[#F4B400] text-base flex rounded text-white px-2 items-center gap-2"
                    >
                      Detail
                      <IconInfoCircle size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 cursor-pointer">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger><IconDots className="text-[#D9D9D9]" size={50} /></TooltipTrigger>
              <TooltipContent>
                <p>Expand Vehicle list</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="flex items-center justify-between w-full mt-5">
        <div className="relative w-full">
          <img
            src={request}
            alt=""
            className="rounded-3xl shadow-[4px_4px_7px_#00000040]"
          />
          <img src={gradient} alt="" className="absolute bottom-0" />
          <h1 className="font-bold text-4xl absolute px-1 w-[80%] bottom-10 left-10 text-white">
            Request Perawatan
          </h1>
        </div>

        <div className="relative w-full ml-10">
          <img
            src={register}
            alt=""
            className="rounded-3xl shadow-[4px_4px_7px_#00000040]"
          />
          <img src={gradient} alt="" className="absolute bottom-0" />
          <h1 className="font-bold text-4xl absolute px-1 w-[80%] bottom-10 left-10 text-white">
            Daftarkan Kendaraan Anda
          </h1>
        </div>
      </div>
    </>
  );
}
