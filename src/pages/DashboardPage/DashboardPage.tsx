import { IconDots, IconInfoCircle } from "@tabler/icons-react";
import img1 from "../../assets/dashboard/matic.svg";
import request from "../../assets/dashboard/requestVeh.png";
import register from "../../assets/dashboard/registerVeh.png";
import gradient from "../../assets/dashboard/gradient.png";
import { Link } from "react-router-dom";
export default function DashboardPage() {
  const carData = [
    { id: 1, name: "Beat Honda 2021", status: "Good" },
    { id: 1, name: "Beat Honda 2021", status: "Good" },
  ];

  return (
    <>
      <div className="bg-[#898989] pt-2 pb-6 rounded-xl px-10 relative ">
        <h1 className="text-white font-normal py-2">List Kendaraan:</h1>
        <div className="flex justify-between gap-6">
          {carData.map((car) => (
            <div key={car.id} className="bg-white w-2/3 rounded-xl flex gap-6 px-4 py-2">
              <img src={img1} alt="" className="w-20" />
              <div className="mt-2 w-full">
                <h1 className="font-bold text-xl pb-6 tracking-wide">{car.name}</h1>
                <div className="relative w-full flex justify-between items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#49E102] w-4 h-4 rounded-full "></div>
                    <h4>{car.status}</h4>
                  </div>
                  <div className="ml-10">
                    <button type="button" className="bg-[#F4B400] text-base flex rounded text-white px-2 items-center gap-2">
                      Detail
                      <IconInfoCircle size={10} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-3">
          <IconDots className="text-[#D9D9D9]" size={50} />
        </div>
      </div>
      <div className="flex items-center justify-between w-full  mt-5">
        <div className="relative w-96" >
          <img src={request} alt="" className="rounded-3xl " />
          {/* <img src={gradient} alt="" className="absolute bottom-0" /> */}
        </div>

        <div className="relative w-96">
          <img src={register} alt="" className="rounded-3xl" />
          {/* <img src={gradient} alt="" className="absolute bottom-0" /> */}
        </div>
      </div>
    </>
  );
}
