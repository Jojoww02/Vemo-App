import { getUserByIdFn } from "@/api/services/users";
import {
  getMaintenancesVehiclesByVehicleIdFn,
  getVehicleByIdFn,
  getVehiclePartsConditionFn,
} from "@/api/services/vehicle";
import {
  IConditionParts,
  IMaintenanceVehicleResponse,
  IUserResponse,
  IVehicleResponse,
} from "@/api/types";
import { Button, Input, Tooltip } from "@/components/atoms";
import PartVehicleCard from "@/components/molecules/PartVehicleCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import useMutateVehicle from "@/hooks/mutations/useMutateVehicle";
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
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminDetailsMaintenanceVehiclePage() {
  const { vehicleId } = useParams();
  const [isSuccessPaste, setIsSuccessPaste] = React.useState(false);
  const ADMIN_PAGE = "/admin";
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const methods = useForm<{description: string}>();

  const { vehicleByStatus, partPrice } = useMutateVehicle();

  const { vehicleDone } = useMutateVehicle();
  const { vehicleCancel } = useMutateVehicle();

  React.useEffect(() => {
    isSuccessPaste && setTimeout(() => setIsSuccessPaste(false), 500);
  }, [isSuccessPaste, setIsSuccessPaste]);

  const handlePasteClick = () => {
    const ticketValue = maintenanceVehicle?.maintenanceVehicle.ticket || "";
    navigator.clipboard.writeText(ticketValue.toUpperCase());
    setIsSuccessPaste(true);
  };

  const { data: vehicle } = useQuery<IVehicleResponse, Error>({
    queryKey: ["vehicle", vehicleId],
    queryFn: async () => await getVehicleByIdFn(vehicleId),
  });

  const { data: user, isSuccess } = useQuery<IUserResponse, Error>({
    queryKey: ["vehicleUser", vehicle?.userId],
    queryFn: async () => await getUserByIdFn(vehicle?.userId || ""),
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

  const handleDeleteOptionClick = async () => {
    await vehicleByStatus.mutateAsync({
      vehicleId,
      status: "service",
    });
  };

  const handleDoneClick = async () => {
    const maintenanceVehicleId = maintenanceVehicle?.maintenanceVehicle.id;
    const maintenanceParts = maintenanceVehicle?.maintenanceParts;

    const maintenancePartIds: string[] =
      maintenanceParts?.map((part) => part.id) || [];

    await vehicleDone.mutateAsync({
      maintenanceVehicleId: maintenanceVehicleId,
      maintenancePartIds,
    });
  };

  const handleDeclineVehicle = async ({description}: {description:string}) => {
    // Assuming maintenanceVehicle is already declared and holds the necessary data
    const maintenanceVehicleId = maintenanceVehicle?.maintenanceVehicle.id;

    if (maintenanceVehicleId) {
      await vehicleCancel.mutateAsync({
        maintenanceVehicleId,
        status: "decline",
        description
      });
    } else {
      console.error("maintenanceVehicleId is undefined");
    }
  };
  const handleCancelVehicle = async ({description}: {description:string}) => {
    // Assuming maintenanceVehicle is already declared and holds the necessary data
    const maintenanceVehicleId = maintenanceVehicle?.maintenanceVehicle.id;

    if (maintenanceVehicleId) {
      await vehicleCancel.mutateAsync({
        maintenanceVehicleId,
        status: "cancel",
        description,
      });
    } else {
      console.error("maintenanceVehicleId is undefined");
    }
  };

  if (vehicleByStatus.isSuccess) {
    queryClient.invalidateQueries({
      queryKey: ["vehicle", vehicleId],
    });
    queryClient.invalidateQueries({
      queryKey: ["maintenanceVehicle", vehicleId],
    });
  }

  partPrice.isSuccess &&
    queryClient.invalidateQueries({
      queryKey: ["maintenanceVehicle", vehicleId],
    });
    

  vehicleDone.isSuccess && navigate(`${ADMIN_PAGE}/maintenances/`);
  vehicleCancel.isSuccess && navigate(`${ADMIN_PAGE}/maintenances/`);

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
                        {isSuccess &&
                          maintenanceVehicle?.maintenanceVehicle.ticket}
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
        <div className="w-1/2 bg-[#F7F8F9] rounded-2xl px-5 py-4">
          <div className="flex gap-8">
            <div className="flex flex-col gap-8 w-full">
              <div className="flex gap-5 w-full">
                <IconNote size={30} />
                <div className="w-full">
                  <h1 className="font-medium">Catatan :</h1>
                  <div className="bg-gray-400/25 rounded-lg h-40 w-full p-2 text-dark">
                    <p>
                      {isSuccess &&
                        maintenanceVehicle?.maintenanceVehicle?.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-5">
                <IconAddressBook size={30} />
                <div>
                  <h1 className="font-medium">Kontak yang bisa dihubungi :</h1>
                  <p>
                    {isSuccess &&
                      maintenanceVehicle?.maintenanceVehicle?.contact}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Separator className="mt-7" />
      <div className="flex flex-wrap mx-auto items-center md:w-[70%] lg:w-full lg:justify-evenly pt-5 gap-2">
        {isSuccess &&
          maintenanceVehicle?.maintenanceParts?.map((maintenancePart) =>
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
                  isCheck={vehicle?.maintenanceStatus !== "requested"}
                  isAdmin={true}
                  isEdit={
                    maintenanceVehicle.maintenanceVehicle.status === "service"
                  }
                />
              ))
          )}
      </div>
      <div className="my-10">
        {isSuccess &&
        maintenanceVehicle?.maintenanceVehicle?.status === "requested" ? (
          <div className="text-center flex mt-4 mb-10 gap-10">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-1/2 py-6 bg-red-400 hover:bg-red-400/80">
                  Tolak Service
                </Button>
              </DialogTrigger>
              <DialogContent className="w-4/5">
                <DialogHeader className="flex flex-col items-center justify-center">
                  <DialogTitle className="text-2xl font-semibold">
                    Mengedit
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    Alasan kenapa menolak kendaraan 
                  </DialogDescription>
                </DialogHeader>
                <FormProvider {...methods}>
                  <form
                    onSubmit={methods.handleSubmit(handleDeclineVehicle)}
                    className="flex flex-col justify-center"
                  >
                    <Input
                      name="description"
                      label="Alasannya kenapa"
                      placeholder="Masukan catatan disini..."
                      type="textarea"
                      className="h-24"
                    />
                    <div className="flex justify-center mt-10 w-full">
                      <Button type="submit" className="text-base">
                        Kirim
                      </Button>
                    </div>
                  </form>
                </FormProvider>
              </DialogContent>
            </Dialog>
            <Button
              className="w-1/2 py-6"
              onClick={methods.handleSubmit(handleDeleteOptionClick)}
            >
              Service
            </Button>
          </div>
        ) : (
          <div className="text-center flex mt-4 mb-10 gap-10">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="w-1/2 py-6 bg-red-400 hover:bg-red-400/80"
                  // onClick={methods.handleSubmit(handleDeleteOptionClick)}
                >
                  Batalkan Service
                </Button>
              </DialogTrigger>
              <DialogContent className="w-4/5">
                <DialogHeader className="flex flex-col items-center justify-center">
                  <DialogTitle className="text-2xl font-semibold">
                    Mengedit
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    Alasan kenapa Membatalkan kendaraan 
                  </DialogDescription>
                </DialogHeader>
                <FormProvider {...methods}>
                  <form
                    onSubmit={methods.handleSubmit(handleCancelVehicle)}
                    className="flex flex-col justify-center"
                  >
                    <Input
                      name="description"
                      label="Alasannya kenapa"
                      placeholder="Masukan catatan disini..."
                      type="textarea"
                      className="h-24"
                    />
                    <div className="flex justify-center mt-10 w-full">
                      <Button type="submit" className="text-base">
                        Kirim
                      </Button>
                    </div>
                  </form>
                </FormProvider>
              </DialogContent>
            </Dialog>

            <Button className="w-1/2 py-6" onClick={handleDoneClick}>
              Selesai Service
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
