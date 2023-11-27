import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/atoms/shadcn.ui/Tooltip";

import { IconCircleArrowUpRightFilled } from "@tabler/icons-react";

import { VehicleCard } from "@/components/molecules";

const carData = [
  { id: 1, name: "Beat Honda 2021", plate: "B 1234 SBO", status: "Good " },
  { id: 2, name: "Beat Honda 2021", plate: "B 1234 SBO", status: "Good " },
];

const DashboardVehicles: React.FC = () => {
  return (
    <main className="bg-[#898989] p-7 rounded-2xl px-10 relative shadow-[0px_0px_7px_#00000040]">
      <div className="absolute right-2 top-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IconCircleArrowUpRightFilled
                size={27}
                className="text-white hover:scale-125 duration-500"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>View All Vehicles</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex justify-between gap-6">
        {carData.map((car) => (
          <VehicleCard vehicleData={car} key={car.id} />
        ))}
      </div>
    </main>
  );
};

export default DashboardVehicles;
