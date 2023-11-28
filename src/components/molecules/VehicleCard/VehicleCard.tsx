import { Button, VehicleCondition, VehicleIcon } from "@/components/atoms";
import { VehicleData } from "@/lib/types";
import { Info } from "lucide-react";

interface Props {
  vehicleData: VehicleData;
}

export default function VehicleCard({ vehicleData }: Props): JSX.Element {
  return (
    <div className="flex md:px-4 md:py-2 md:gap-6 xl:gap-10 xl:px-12 w-full bg-white rounded-xl shadow-[0px_3px_7px_5px_#00000040]">
      <div className="self-center mx-4">
        <VehicleIcon type={vehicleData.type} />
      </div>
      <div className="pt-4 pb-3 w-full">
        <h1 className="font-semibold xl:text-2xl tracking-wide mb-1">
          {vehicleData.name}
        </h1>
        <h3 className="font-semibold text-xs md:text-sm xl:text-2xl md:pb-3 text-[#898989]">
          {vehicleData.licenseNumber}
        </h3>
        <div className="w-full flex justify-between items-center gap-2">
          <VehicleCondition condition={vehicleData.condition} />
          <div className="mr-7">
            <Button size="sm">
              <Info size={18} className="md:mr-2" />
              <p className="hidden md:block">Detail</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
