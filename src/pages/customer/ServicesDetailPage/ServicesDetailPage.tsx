import {
  getMaintenancesDetailByMaintenanceIdFn,
  getVehicleByIdFn,
  getVehiclePartsConditionFn,
} from "@/api/services/vehicle";
import {
  IConditionParts,
  IMaintenanceVehicleResponse,
  IUserResponse,
  IVehicleResponse,
} from "@/api/types";
import { Button, Tooltip } from "@/components/atoms";
import PartVehicleCard from "@/components/molecules/PartVehicleCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import useMutateVehicle from "@/hooks/mutations/useMutateVehicle";
import { SERVICES_PAGE } from "@/lib/constants/routes";
import {
  IconAutomaticGearbox,
  IconCheck,
  IconClipboard,
  IconManualGearbox,
  IconNote,
} from "@tabler/icons-react";
import { IconTicket } from "@tabler/icons-react";
import { IconAddressBook } from "@tabler/icons-react";
import { IconBike } from "@tabler/icons-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ServicesDetailPage() {
  const queryClient = useQueryClient();
  const [isSuccessPaste, setIsSuccessPaste] = React.useState(false);
  const { vehicleId, maintenanceId } = useParams();
  const { vehicleByStatus } = useMutateVehicle();
  const navigate = useNavigate();

  React.useEffect(() => {
    isSuccessPaste && setTimeout(() => setIsSuccessPaste(false), 500);
  }, [isSuccessPaste, setIsSuccessPaste]);

  const handlePasteClick = () => {
    const ticketValue = maintenanceVehicle?.maintenanceVehicle.contact || "";
    navigator.clipboard.writeText(ticketValue.toUpperCase());
    setIsSuccessPaste(true);
  };

  const { data: vehicle } = useQuery<IVehicleResponse, Error>({
    queryKey: ["vehicle", vehicleId],
    queryFn: async () => await getVehicleByIdFn(vehicleId),
  });
  const { data: user } = useQuery({ queryKey: ["me"] });
  
  const { data: maintenanceVehicle } = useQuery<
    IMaintenanceVehicleResponse,
    Error
  >({
    queryKey: ["maintenanceVehicle", maintenanceId],
    queryFn: async () => await getMaintenancesDetailByMaintenanceIdFn(maintenanceId),
  });

  const { data: conditionParts } = useQuery<IConditionParts[], Error>({
    queryKey: ["partsRequest", ["vehicleId", vehicleId]],
    queryFn: async () => await getVehiclePartsConditionFn(vehicleId),
  });

  if (vehicleByStatus.isSuccess) {
    queryClient.invalidateQueries({
      queryKey: ["vehicle", vehicleId],
    });
    queryClient.invalidateQueries({
      queryKey: ["maintenanceVehicle", vehicleId],
    });
  }

  return (
    <div className="w-full px-3">
      <div className="w-full flex">
        <div className="w-1/2 flex flex-col">
          <div className="flex flex-col gap-2">
            <h1>Informasi Kendaraan</h1>
            <div className="flex gap-4 items-center mt-4">
              <div className="ml-2 flex flex-col gap-5">
                <div className="flex gap-5">
                  <IconTicket size={30} />
                  <div>
                    <h1 className="font-medium text-gray-500">
                      Tiket Perawatan
                    </h1>
                    <span className="flex gap-2 items-center">
                      <p className="text-lg text-dark font-semibold uppercase">
                        {maintenanceVehicle?.maintenanceVehicle.ticket}
                      </p>
                      <Tooltip text={"Berhasil menyalin"} open={isSuccessPaste}>
                        {isSuccessPaste ? (
                          <IconCheck
                            size={20}
                            className="text-gray-600 cursor-pointer"
                          />
                        ) : (
                          <IconClipboard
                            size={20}
                            className="text-gray-600 cursor-pointer"
                            onClick={handlePasteClick}
                          />
                        )}
                      </Tooltip>
                    </span>
                  </div>
                </div>
                <div className="flex gap-5">
                  <IconBike size={30} />
                  <div>
                    <h1 className="font-medium text-gray-500">
                      Nama Kendaraan
                    </h1>
                    <p className="text-lg text-dark font-semibold">
                      {(vehicle as IVehicleResponse)?.vehicleName}
                    </p>
                  </div>
                </div>
                <div className="flex gap-5">
                  {(vehicle as IVehicleResponse)?.vehicleType === "matic" ? (
                    <IconAutomaticGearbox size={30} />
                  ) : (
                    <IconManualGearbox size={30} />
                  )}
                  <div>
                    <h1 className="font-medium text-gray-500">
                      Tipe Kendaraan
                    </h1>
                    <p className="text-lg text-dark font-semibold capitalize">
                      {(vehicle as IVehicleResponse)?.vehicleType}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-4 gap-4">
              <h1>Owner</h1>
              <div className="flex font-medium text-lg items-center">
                <Avatar className="w-14 h-14">
                  <AvatarImage src={`/PhotoProfile/${(user as IUserResponse)?.photo}`} />
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
        <div className="w-1/2 bg-[#F7F8F9] rounded-2xl px-5 py-4">
          <div className="flex gap-8">
            <div className="flex flex-col gap-8 w-full">
              <div className="flex gap-5 w-full">
                <IconNote size={30} />
                <div className="w-full">
                  <h1 className="font-medium">Catatan :</h1>
                  <div className="bg-gray-400/25 rounded-lg h-40 w-full p-2 text-dark">
                    <p>{maintenanceVehicle?.maintenanceVehicle.description}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-5">
                <IconAddressBook size={30} />
                <div>
                  <h1 className="font-medium">Kontak yang bisa dihubungi :</h1>
                  <p>{maintenanceVehicle?.maintenanceVehicle.contact}</p>
                </div>
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
                conditiondata={requestPart}
                maintenancePartData={maintenancePart}
                maintenanceVehicleData={maintenanceVehicle.maintenanceVehicle}
                checked={false}
                onCheckboxChange={() => {}}
                isAdmin={true}
              />
            ))
        )}
      </div>
      <div className="my-10">
        <Button onClick={() => navigate(SERVICES_PAGE)}>Kembali</Button>
      </div>
    </div>
  );
}
