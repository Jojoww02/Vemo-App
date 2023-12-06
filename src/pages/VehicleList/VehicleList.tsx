import { getVehiclesByUserIdFn } from "@/api/services/vehicle";
import { IUserResponse, IVehicleResponse } from "@/api/types";
import { VehicleCard } from "@/components/molecules";
import { IconCircleArrowUpRightFilled } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { BadgeAlert } from "lucide-react";
import React from "react";

export default function VehicleList(): JSX.Element {
  const { data: vehicles } = useQuery({ queryKey: ["vehicles"] });
  return (
    <div className="md:w-[480px] md:mx-auto bg-[#898989] shadow-[0px_0px_7px_#00000040] p-4 rounded-2xl my-10">
      <div className="flex flex-col xs:px-8 md:px-0 gap-4 md:gap-6 ">
        {(vehicles as IVehicleResponse[]).map((vehicle: IVehicleResponse) => (
          <VehicleCard vehicleData={vehicle} key={vehicle.id} />
        ))}
      </div>
    </div>
  );
}
