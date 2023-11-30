import { VehicleCard } from "@/components/molecules";
import { vehicleData } from "@/lib/data";

export default function RequestVehiclePage():JSX.Element {
  return (
    <div className="flex gap-10">
      {/* Content Left */}
        <div className="relative w-1/2 bg-cover grid  bg-[url('/src/responsive/dekstop/assets/FormImg/req-bg.webp')]">
          <div className="absolute bottom-0 font-bold text-white text-5xl xl:text-5xl px-8 z-10 mb-20">
            Request
            <br />
            Perawatan
          </div>
          <div className="absolute rounded-xl -z-1 bottom-0 left-0 w-full h-[60%] [background:linear-gradient(180deg,rgba(244,180,0,0)_0%,rgb(244,180,0)_100%)]"></div>
        </div>
      {/* Content Left End */}

      {/* Content Right */}
      <div className="w-1/2 px-10 mt-24">
        <span className="font-medium text-[#898989] text-lg xl:text-1xl">List Kendaraan:</span>
        <div className='w-full mt-12 flex-col grid gap-2 place-items-center justify-center h-[25rem] xl:h-[20rem] overflow-y-auto'>
            {vehicleData.map((vehicle) => (
                <VehicleCard vehicleData={vehicle} key={vehicle.id} />
            ))}
        </div>
      </div>
    </div>
  )
}
