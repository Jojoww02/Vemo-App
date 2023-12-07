import { VehicleCard } from "@/components/molecules";
import ImageVehicle from "../../assets/requestPageImage/request-vehicle-mobile-image.png";
import gradient from "../../assets/requestPageImage/gradient-img.svg";
import { useQuery } from "@tanstack/react-query";
import { IVehicleResponse } from "@/api/types";
import { BadgeAlert, Filter } from "lucide-react";
import { VehicleCondition } from "@/components/atoms";

export default function RequestMaintenanceVehiclePage(): JSX.Element {
  const { data: vehicles, isSuccess } = useQuery({
    queryKey: ["vehicles"],
  });
  return (
    <>
      <div className="sm:bg-black sm:bg-opacity-30 md:rounded-[7%] sm:rounded-b-[5%] sm:w-[480px] lg:w-[680px] mx-auto">
        <div className="relative w-full mt-3 flex flex-col justify-center ">
          <img src={ImageVehicle} alt="" className="w-full sm:h-80 sm:-z-10 sm:rounded-[5%]" />
          <h1 className="absolute bottom-4 left-5 text-2xl xs:text-3xl text-white font-bold z-10 w-1/2  sm:text-4xl sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:text-center sm:flex sm:items-center ">
            Request Perawatan
          </h1>
          <img src={gradient} alt="" className="absolute w-full -bottom-[1px] sm:hidden" />
        </div>
      </div>
      <div className="w-full mt-5 sm:w-[480px] mx-auto lg:w-[680px]">
        <span className="font-medium  text-[#898989] text-sm md:text-2xl">List Kendaraan:</span>
        <div className="w-full  mt-10 flex flex-col gap-5 justify-center ">
          {vehicles && isSuccess ? (
            (vehicles as IVehicleResponse[])
              .filter((vehicle: IVehicleResponse) => vehicle.condition <= 30)
              .map((filteredVehicle: IVehicleResponse) => (
                <div key={filteredVehicle.id}>
                  <VehicleCard vehicleData={filteredVehicle} />
                </div>
              ))
          ) : (
            <div className="w-full flex flex-col items-center text-center gap-4">
              <BadgeAlert className="text-white" size={50} />
              <h1 className="text-white sm:text-xl">Opps! Anda belum mendaftarkan kendaraan Anda, daftar dulu yuk!</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
