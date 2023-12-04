import { Link } from "react-router-dom";
import { VehicleData } from "@/lib/types";
import { Info } from "lucide-react";
import { Tooltip, VehicleCondition, VehicleIcon } from "@/components/atoms";
import { REQUEST_MAINTENANCE_VEHICLE_PAGE } from "@/lib/constants/routes";

interface Props {
  vehicleData: VehicleData;
}

export default function VehicleCard({ vehicleData }: Props): JSX.Element {
  return (
    <div className="flex px-4 md:py-2 gap-6 w-full lg:px-8 bg-white rounded-xl shadow-[0px_3px_7px_5px_#00000040]">
      <div className="self-center">
        <VehicleIcon type={vehicleData.type} />
      </div>
      <div className="pt-4 pb-3 w-full">
        <h1 className="font-semibold text-sm xs:text-base lg:text-xl tracking-wide sm:mb-1 md:mb-0">
          {vehicleData.name}
        </h1>
        <h3 className="font-semibold text-[.6rem] xs:text-xs md:text-sm lg:text-lg lg:pb-3 text-[#898989]">
          {vehicleData.licenseNumber}
        </h3>
        <div className="w-full flex justify-between items-center gap-2">
          <div>
            <VehicleCondition condition={vehicleData.condition} />
          </div>
          {window.location.pathname !== (REQUEST_MAINTENANCE_VEHICLE_PAGE) && (
            <div className="lg:pr-5">
              <Tooltip text="View details vehicle">
                <Link
                  to=""
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
