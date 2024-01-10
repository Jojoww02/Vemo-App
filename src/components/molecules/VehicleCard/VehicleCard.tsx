import { Link, useNavigate } from "react-router-dom";
import { Info, Timer } from "lucide-react";
import { Tooltip, VehicleCondition, VehicleIcon } from "@/components/atoms";
import { IVehicleResponse } from "@/api/types";
import {
  REQUEST_MAINTENANCE_VEHICLE_PAGE,
  VEHICLE_DETAILS_PAGE,
  VEHICLE_PARTS_PAGE,
} from "@/lib/constants/routes";

interface Props {
  vehicleData: IVehicleResponse;
}

export default function VehicleCard({ vehicleData }: Props): JSX.Element {
  const navigate = useNavigate()

  const isRequestMaintenancePage = window.location.pathname === REQUEST_MAINTENANCE_VEHICLE_PAGE;
  
  return vehicleData.status === "pending" ? (
    <div className="w-full gap-2 flex-col text-center border-dashed rounded-2xl border-[3px] h-24 sm:h-28 md:h-[7.8rem] lg:h-[8.5rem] flex justify-center items-center text-white text-xs xs:text-base lg:text-xl">
      <Timer className="text-white" size={25} />
      <h1 className="text-white text-xs xs:text-sm w-4/5 ">{`Kendaraan ${vehicleData.vehicleName} dengan plat ${vehicleData.licensePlate} anda sedang status pending `}</h1>
    </div>
  ) : (
    
    <div className="flex px-4 py-5 md:py-2 gap-10 w-full lg:px-8 bg-white rounded-xl shadow-[0px_3px_7px_5px_#00000040]" onClick={() => isRequestMaintenancePage && navigate(VEHICLE_PARTS_PAGE(vehicleData.vehicleId))}>
      <div className="self-center pt-2">
        <VehicleIcon type={vehicleData.vehicleType} />
      </div>
      <div className="pt-2 w-full">
        <h1 className="font-semibold text-base xs:text-lg lg:text-xl md:text-2xl tracking-wide sm:mb-1 md:mb-0">
          {vehicleData.vehicleName}
        </h1>
        <h3 className="font-semibold text-[.6rem] xs:text-xs md:text-lg lg:text-lg lg:pb-3 text-[#898989]">
          {vehicleData.licensePlate}
        </h3>
        <div className="w-full py-2 flex justify-start items-center xs:justify-between xs:gap-2">
          {vehicleData.status === "requested" ? (
            <div className="overflow-hidden w-14 md:w-20">
              <div className="animate-marquee whitespace-nowrap w-full text-[11px] xs:text-sm">
                Sedang diproses untuk perawatan kendaraan
              </div>
            </div>
          ) : (
            <VehicleCondition condition={vehicleData.condition} />
          )}
          {window.location.pathname !== REQUEST_MAINTENANCE_VEHICLE_PAGE && (
            <div className="lg:pr-5 z-50">
              <Tooltip text="Lihat Detail Kendaraan">
                <Link
                  to={VEHICLE_DETAILS_PAGE(vehicleData.vehicleId)}
                  className="flex items-center justify-center px-2 py-1 text-center bg-[#F4B400] text-white rounded-lg scale-75 xs:scale-90 lg:scale-110"
                >
                  <Info size={18} className="mr-1" />
                  <p className="text-xs">Detail</p>
                </Link>
              </Tooltip>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
