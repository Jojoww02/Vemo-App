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
import { Button } from "@/components/atoms";
import PartVehicleCard from "@/components/molecules/PartVehicleCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { IconNotebook } from "@tabler/icons-react";
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
          <div className="flex flex-col gap-2 ">
            <h1 className="font-semibold text-xl">Informasi Kendaraan</h1>
            <div className="flex gap-4 items-center mt-10">
              <IconBike size={40} />
              <div className="flex flex-col gap-4 ml-2">
                <div>
                  <h1 className="font-medium text-2xl text-gray-700 flex gap-4">
                    Nama Kendaraan :
                  </h1>
                  <p className="text-2xl text-gray-500">
                    {(vehicle as IVehicleResponse)?.vehicleName}
                  </p>
                </div>
                <div>
                  <h1 className="font-medium text-2xl text-gray-700 flex gap-4">
                    Type :
                  </h1>
                  <p className="text-2xl text-gray-500">
                    {(vehicle as IVehicleResponse)?.vehicleType}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-4 gap-4">
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
        <div className="flex items-center gap-8">
          <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3 font-semibold">
            <h1 className="mt-3 text-2xl">Catatan :</h1>
            <p className="font-normal text-xl">
              {maintenanceVehicle?.maintenanceVehicle?.description}
            </p>
          </div>
          <div className="flex flex-col gap-3 font-semibold text-xl">
            <h1 className=" text-2xl">Kontak yang bisa dihubungi :</h1>
            <p className="font-normal text-xl">
              {maintenanceVehicle?.maintenanceVehicle.contact}
            </p>
          </div>
          </div>
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
      <div className="text-center flex mt-4 mb-10">
        <Button className="w-1/2 py-6 bg-red-400">Batal</Button>
        <Button className="w-1/2 py-6">Selesai</Button>
      </div>
    </div>
  );
}
