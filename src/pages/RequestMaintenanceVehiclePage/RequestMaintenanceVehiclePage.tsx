import { VehicleCard } from "@/components/molecules";
import { useQuery } from "@tanstack/react-query";
import { IVehicleResponse } from "@/api/types";
import { BadgeAlert } from "lucide-react";
import useMobile from "@/hooks/useMobile";
import { RequestMaintenanceVehicleMobile } from "@/mobile";


export default function RequestMaintenanceVehiclePage(): JSX.Element {
  const { data: vehicles, isSuccess } = useQuery({
    queryKey: ["vehicles"],
  });

  const isMobile = useMobile();
  return (
    <>
      {isMobile ? (
        <div className="flex gap-10 mt-10 overflow-y-hidden">
          {/* Content Left */}
          <div className="relative w-1/2 bg-cover grid rounded-xl  bg-[url('/src/assets/requestPageImage/request-vehicle-image.webp')]">
            <div className="absolute bottom-0 font-bold text-white text-5xl xl:text-6xl px-8 z-10 mb-20">
              Request
              <br />
              Perawatan
            </div>
            <div className="absolute -z-1 bottom-0 left-0 w-full rounded-xl h-[60%] [background:linear-gradient(180deg,rgba(244,180,0,0)_0%,rgb(244,180,0)_100%)]"></div>
          </div>
          {/* Content Left End */}

          {/* Content Right */}
          <div className="w-1/2 mb-28">
            <div className="w-full flex flex-col gap-6">
              <h3 className="font-medium text-[#8391A1] text-lg xl:text-1xl ">List kendaraan :</h3>
              <div className="w-full flex-col grid gap-2 place-items-center justify-center h-[25rem] xl:h-[20rem] overflow-y-auto">
                {vehicles && isSuccess ? (
                  (vehicles as IVehicleResponse[])
                    .filter((vehicle: IVehicleResponse) => vehicle.condition <= 30)
                    .map((filteredVehicle: IVehicleResponse) => (
                      <div key={filteredVehicle.vehicleId}>
                        <VehicleCard vehicleData={filteredVehicle} />
                      </div>
                    ))
                ) : (
                  <div className="w-full flex flex-col items-center text-center gap-4">
                    <BadgeAlert className="text-dark" size={50} />
                    <h1 className="text-dark sm:text-xl mb-10">Opps! Anda belum mendaftarkan kendaraan Anda, daftar dulu yuk!</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <RequestMaintenanceVehicleMobile />
      )}
    </>
  );
}
