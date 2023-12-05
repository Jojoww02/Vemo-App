import ImageVehicle from "../../assets/requestPageImage/request-vehicle-mobile-image.png";
import gradient from "../../assets/requestPageImage/gradient-img.svg";
import { vehicleData } from "@/lib/data";
import { VehicleCard } from "@/components/molecules";

export default function RequestVehiclePagemobile() {
  return (
    <>
      <div className="sm:bg-black sm:bg-opacity-30 md:rounded-[7%] sm:rounded-b-[5%]">
        <div className="relative w-full mt-3 flex flex-col justify-center ">
          <img src={ImageVehicle} alt="" className="w-full sm:h-80 sm:-z-10 sm:rounded-[5%]" />
          <h1 className="absolute bottom-4 left-5 text-2xl xs:text-3xl text-white font-bold z-10 w-1/2  sm:text-6xl sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:text-center sm:flex sm:items-center ">
            Request Perawatan
          </h1>
          <img src={gradient} alt="" className="absolute w-full -bottom-[1px] sm:hidden" />
        </div>
      </div>
      <div className="w-full mt-5 px-4">
        <span className="font-medium  text-[#898989] text-sm md:text-2xl">List Kendaraan:</span>
        <div className="w-full px-2 mt-10 flex flex-col gap-5 justify-center ">
          {vehicleData.map((vehicle) => (
            <VehicleCard vehicleData={vehicle} key={vehicle.id} />
          ))}
        </div>
      </div>
    </>
  );
}
