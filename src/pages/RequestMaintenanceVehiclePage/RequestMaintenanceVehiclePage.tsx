import { VehicleCard } from "@/components/molecules";
import useMobile from "@/hooks/useMobile";
import { vehicleData } from "@/lib/data";
import { RequestVehiclePagemobile } from "@/mobile";

export default function RequestMaintenanceVehiclePage(): JSX.Element {
  const isMobile = useMobile()
  return (
    <>
    { isMobile ?
      <div className="flex gap-10 mt-10">
        {/* Content Left */}
        <div className="relative w-1/2 bg-cover rounded-xl grid  bg-[url('/src/assets/requestPageImage/request-vehicle-image.webp')]">
          <div className="absolute bottom-0 font-bold text-white text-4xl xl:text-5xl px-8 z-10 mb-14">
            Request
            <br />
            Perawatan
          </div>
          <div className="absolute rounded-xl -z-1 bottom-0 left-0 w-full h-[60%] [background:linear-gradient(180deg,rgba(244,180,0,0)_0%,rgb(244,180,0)_100%)]"></div>
        </div>
        {/* Content Left End */}

        {/* Content Right */}
        <div className="w-1/2 px-10">
          <span className="font-medium text-[#898989] text-lg xl:text-1xl">List Kendaraan:</span>
          <div className="w-full px-2 flex xl:mt-12 mb-20 xl:mb-24 flex-col gap-5 place-items-center justify-center h-[25rem] xl:h-[20rem] overflow-y-auto">
            {vehicleData.map((vehicle) => (
              <VehicleCard vehicleData={vehicle} key={vehicle.id} />
            ))}
          </div>
        </div>
      </div>
      : <RequestVehiclePagemobile />}
    </>
  );
}
