import { getUserByIdFn } from "@/api/services/users";
import {
  getMaintenancesVehiclesByVehicleIdFn,
  getVehicleByIdFn,
  getVehiclePartsConditionFn,
} from "@/api/services/vehicle";
import {
  IConditionParts,
  IMaintenanceVehicle,
  IMaintenanceVehicleResponse,
  IUserResponse,
  IVehicleResponse,
} from "@/api/types";
import PartVehicleCard from "@/components/molecules/PartVehicleCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { IconBike } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function AdminDetailsMaintenanceVehiclePage() {
  const { vehicleId } = useParams();

  const { data: vehicle } = useQuery<IVehicleResponse, Error>({
    queryKey: ["vehicle", vehicleId],
    queryFn: async () => await getVehicleByIdFn(vehicleId),
  });

  const { data: user } = useQuery<IUserResponse, Error>({
    queryKey: ["vehicleUser", vehicle?.userId],
    queryFn: async () => await getUserByIdFn(vehicle?.userId),
  });

  const { data: maintenanceVehicle } = useQuery<
    IMaintenanceVehicleResponse,
    Error
  >({
    queryKey: ["maintenanceVehicle", vehicleId],
    queryFn: async () => await getMaintenancesVehiclesByVehicleIdFn(vehicleId),
  });

  const { data: conditionParts } = useQuery<IConditionParts[], Error>({
    queryKey: ["partsRequest", ["vehicleId", vehicleId]],
    queryFn: async () => await getVehiclePartsConditionFn(vehicleId),
  });

  console.log(maintenanceVehicle?.maintenanceParts);

  return (
    <div className="w-full px-3">
      <div className="w-full flex">
        <div className="w-1/2 flex flex-col mt-10">
          <div className="flex flex-col gap-4 font-semibold text-xl">
            <h1>Motorcycle Information</h1>
            <div className="flex items-center">
              <IconBike size={30} />
              <h1 className="text-xl pl-3 font-normal">
                Nama Kendaraan Dan Tipe :
              </h1>
            </div>
            <div className="flex flex-col text-lg font-medium">
              {(vehicle as IVehicleResponse)?.vehicleName} |{" "}
              {(vehicle as IVehicleResponse)?.vehicleType}
            </div>
            <div className="flex flex-col mt-7 gap-4">
              <h1>Request By</h1>
              <div className="flex font-medium text-lg items-center">
                <Avatar className="w-14 h-14">
                  <AvatarImage src={`/PhotoProfile/${user?.photo}`} />
                  <AvatarFallback>
                    <img src="/user-profile-icon.svg" alt="" />
                  </AvatarFallback>
                </Avatar>
                <div className="ml-5">
                  <p>{(user as IUserResponse)?.name}</p>
                  <p className="text-base font-normal text-gray-600">
                    {(user as IUserResponse)?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex flex-col bg-[#F7F8F9] rounded-2xl justify-evenly mt-10 px-5">
          <div className="flex flex-col gap-3 font-semibold text-xl">
            <h1 className="mt-3">User Notes:</h1>
            <p className="font-normal text-lg">
              {maintenanceVehicle?.maintenanceVehicle?.description}
            </p>
          </div>
          <div className="flex flex-col gap-3 font-semibold text-xl">
            <h1>Email / Phone Number :</h1>
            <p className="font-normal text-lg">
              {maintenanceVehicle?.maintenanceVehicle.contact}
            </p>
          </div>
        </div>
      </div>
      <Separator className="mt-7" />
      <div className="flex flex-wrap mx-auto items-center md:w-[70%] lg:w-full lg:justify-evenly pt-5 gap-2">
        {maintenanceVehicle?.maintenanceParts.map((maintenancePart) =>
          conditionParts
            ?.filter((x) => x.partId === maintenancePart.partId)
            .map((requestPart) => (
              <PartVehicleCard
                key={requestPart.partId}
                data={requestPart}
                maintenanceData={maintenancePart}
                checked={false}
                onCheckboxChange={() => {}}
                isCheck={false}
                isAdmin={true}
              />
            ))
        )}
      </div>
    </div>
  );
}
