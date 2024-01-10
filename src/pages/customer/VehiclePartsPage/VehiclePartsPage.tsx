import React from "react";
import PartVehicleCard from "@/components/molecules/PartVehicleCard";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DASHBOARD_PAGE, VEHICLE_DETAILS_PAGE } from "@/lib/constants/routes";
import { Button, Input } from "@/components/atoms";
import { FormProvider, useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { IConditionParts, IPartResponse, IVehicleResponse } from "@/api/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  getPartByVehicleIdFn,
  getVehicleByIdFn,
  getVehiclePartsConditionFn,
} from "@/api/services/vehicle";
import useMutateVehicle from "@/hooks/mutations/useMutateVehicle";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface RequestMaintenanceVehicle {
  contact: string;
  description: string;
}

export default function VehiclePartsPage(): JSX.Element {
  const { vehicleId } = useParams();
  const navigate = useNavigate();

  // client state
  const [checkedItems, setCheckedItems] = React.useState<string[]>([]);
  const [selectAll, setSelectAll] = React.useState(false);

  const methods = useForm<RequestMaintenanceVehicle>();

  // fetch vehicle by id
  const { data: vehicle, isSuccess: isVehicleSuccess } =
    useQuery<IVehicleResponse>({
      queryKey: ["vehicle", vehicleId],
      queryFn: async () => await getVehicleByIdFn(vehicleId),
    });

  // fetch part by vehicle id
  const { data: parts } = useQuery<IPartResponse[], Error>({
    queryKey: ["parts", ["vehicleId", vehicleId]],
    queryFn: async () => await getPartByVehicleIdFn(vehicleId),
  });

  // fetch condition part by vehicle id
  const { data: conditionParts } = useQuery<IConditionParts[], Error>({
    queryKey: ["conditionParts", ["vehicleId", vehicleId]],
    queryFn: async () => await getVehiclePartsConditionFn(vehicleId),
  });

  const { requestMaintenance } = useMutateVehicle();

  // handle success request maintenance
  React.useEffect(() => {
    requestMaintenance.isSuccess && navigate(DASHBOARD_PAGE);
  }, [requestMaintenance.isSuccess]);

  const onSubmitHandler = async (data: RequestMaintenanceVehicle) => {
    await requestMaintenance.mutateAsync({
      ...data,
      vehicleId,
      listPartId: checkedItems,
    });
  };

  const handleCheckboxChange = (id: string) => {
    if (checkedItems.includes(id)) {
      setCheckedItems((prev) => prev.filter((item) => item !== id));
    } else {
      setCheckedItems((prev) => [...prev, id]);
    }
  };

  const handleSelectAll = () => {
    const allIds = conditionParts!
      .filter((conditionPart) => conditionPart.condition <= 60)
      .map((conditionPart) => conditionPart.partId);
    setCheckedItems(selectAll ? [] : allIds);
    setSelectAll((prev) => !prev);
  };

  const totalMaintenancePrice = parts
    ?.filter((part) => checkedItems.includes(part.id))
    .reduce((total, part) => total + part.maintenancePrice, 0)
    .toLocaleString("id-ID", { style: "currency", currency: "IDR" });

  const totalMaintenanceServicePrice = parts
    ?.filter((part) => checkedItems.includes(part.id))
    .reduce((total, part) => total + part.maintenanceServicePrice, 0)
    .toLocaleString("id-ID", { style: "currency", currency: "IDR" });

  const convertToNumber = (priceString: string | undefined) => {
    if (!priceString) return 0;
    const cleanedPrice = priceString.replace(/[^\d]/g, "");
    return parseFloat(cleanedPrice) / 100;
  };

  const price1 = convertToNumber(totalMaintenancePrice);
  const price2 = convertToNumber(totalMaintenanceServicePrice);

  const total = price1 + price2;




  return (
    <div className="w-full relative">
      <div className="pt-5 px-10  w-full mb-5">
        <Link to={VEHICLE_DETAILS_PAGE(vehicleId!)} className=" w-[5rem]">
          <img
            src={"/Icon-arrow.svg"}
            alt=""
            className="absolute top-6 left-0 lg:left-5 xl:w-[2rem]  md:w-32 xl:h-[2rem] w-[1.4rem] h-[1.5rem] cursor-pointer"
          />
        </Link>
        <div className="flex justify-center font-bold md:text-4xl xl:text-4xl text-3xl">
          <h1 className="">Kondisi Part</h1>
        </div>
      </div>
      <div className="relative">
        {isVehicleSuccess && vehicle.status !== "requested" && (
          <button
            className="absolute -right-1 -top-[3.2rem] md:-top-10 lg:-top-16 items-center text-[9px] xs:text-base md:text-lg text-white bg-primary rounded-lg px-2 py-[7px] xs:py-1"
            onClick={handleSelectAll}
          >
            {selectAll ? "Batal" : "Pilih Semua"}
          </button>
        )}
        <div className="flex flex-wrap mx-auto items-center md:w-[70%] lg:w-full lg:justify-evenly pt-5 gap-2">
          {conditionParts?.map((conditionPart) => (
            <PartVehicleCard
              key={conditionPart.partId}
              data={conditionPart}
              checked={checkedItems.includes(conditionPart.partId)}
              onCheckboxChange={() =>
                handleCheckboxChange(conditionPart.partId)
              }
              isCheck={vehicle?.status !== "requested"}
              isAdmin={false}
            />
          ))}
        </div>
      </div>
      {/* Button */}
      <div className="w-full flex place-items-center pt-7 px-14 xs:px-24 sm:px-20 lg:px-48 mb-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="button"
              className="py-6 text-white rounded-md text-base bg-primary xl:text-lg font-medium w-full"
              disabled={
                checkedItems.length <= 0 || vehicle?.status === "requested"
              }
            >
              {vehicle?.status === "requested" ? (
                <p className="text-xs md:text-base">
                  Perawatan kendaraan sedang diproses
                </p>
              ) : (
                "Request Perawatan"
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="w-4/5 bg-white">
            <DialogHeader className="flex flex-col items-center justify-center">
              <DialogTitle className="text-2xl font-semibold">
                Form Request Perawatan
              </DialogTitle>
              <DialogDescription className="text-center">
                Silahkan isi form berikut untuk merequest perawatan kendaraan
              </DialogDescription>
            </DialogHeader>
            <div className="w-full flex flex-col px-7">
              <FormProvider {...methods}>
                <form autoComplete="off" className="flex flex-col gap-5">
                  <Input
                    name="contact"
                    label="Email / Nomor Telepon"
                    isFill={methods.watch().contact}
                    placeholder="Masukan Email / Nomor Telepon"
                    type="text"
                  />
                  <Input
                    name="description"
                    label="Catatan untuk Mekanik"
                    isFill={methods.watch().description}
                    placeholder="Masukan catatan disini..."
                    type="textarea"
                    className="h-24"
                  />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="w-full">Lihat estimasi harga</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-[95%]">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Estimasi Harga</AlertDialogTitle>
                        <AlertDialogDescription className="overflow-x-auto">
                          <Table className="text-[.65rem] xs:text-base">
                            <TableCaption className="text-xs xs:text-base text-start">
                              *Perhatian : Harga bisa lebih murah dari estimasi
                            </TableCaption>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Nama Komponen</TableHead>
                                <TableHead>Harga Perawatan</TableHead>
                                <TableHead className="text-right">
                                  Harga Jasa
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {parts
                                ?.filter((part) =>
                                  checkedItems.includes(part.id)
                                )
                                .map((part) => (
                                  <TableRow key={part.id}>
                                    <TableCell>{part.name}</TableCell>
                                    <TableCell>
                                      {part.maintenancePrice.toLocaleString(
                                        "id-ID",
                                        { style: "currency", currency: "IDR" }
                                      )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                      {part.maintenanceServicePrice.toLocaleString(
                                        "id-ID",
                                        { style: "currency", currency: "IDR" }
                                      )}
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                              <TableRow>
                                <TableCell>Total</TableCell>
                                <TableCell>{totalMaintenancePrice}</TableCell>
                                <TableCell className="text-right">
                                  {totalMaintenanceServicePrice}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell className="text-right">
                                  {total.toLocaleString("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                  })}
                                </TableCell>
                              </TableRow>
                            </TableFooter>
                          </Table>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-primary hover:bg-primary/80"
                          onClick={methods.handleSubmit(onSubmitHandler)}
                        >
                          Kirim
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </form>
              </FormProvider>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
