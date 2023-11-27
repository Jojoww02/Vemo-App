import * as React from "react";
import { IconInfoCircle } from "@tabler/icons-react";

import img1 from "@/assets/dashboard/matic.svg";

interface VehicleData {
  id: number;
  name: string;
  plate: string;
  status: string;
}

interface Props {
  vehicleData: VehicleData;
}

const VehicleCard: React.FC<Props> = ({ vehicleData }: Props) => {
  return (
    <div
      key={vehicleData.id}
      className="bg-white w-2/3 rounded-xl flex gap-6 px-4 py-2 shadow-[0px_3px_7px_5px_#00000040]"
    >
      <img src={img1} alt="" className="w-26" />
      <div className="mt-4 w-full">
        <h1 className="font-semibold text-2xl tracking-wide mb-1">
          {vehicleData.name}
        </h1>
        <h3 className="font-semibold text-2xl pb-3 text-[#898989]">
          {vehicleData.plate}
        </h3>
        <div className="relative w-full flex justify-between items-center gap-2 pb-3">
          <div className="flex items-center gap-2">
            <div className="bg-[#49E102] w-5 h-5 rounded-full ring-2 ring-green-200"></div>
            <h4 className="text-base">{vehicleData.status}</h4>
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
  );
};

export default VehicleCard;
