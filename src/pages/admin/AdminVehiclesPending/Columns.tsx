import { IVehicleResponse } from "@/api/types";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Check, Info, Loader2, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useVehiclesPending } from "./useVehiclesPending";
import useMutateVehicle from "@/hooks/mutations/useMutateVehicle";
import React from "react";
import { Input, Button as _Button } from "@/components/atoms";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

export default function Columns() {
  const { vehiclesPendingQuery } = useVehiclesPending();
  const { approveVehicle } = useMutateVehicle();

  const methods = useForm();

  const { toast } = useToast();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleApproveVehicle = async (vehicle: IVehicleResponse) => {
    await approveVehicle.mutateAsync(vehicle.vehicleId);
    await vehiclesPendingQuery.refetch();
    toast({
      title: `${vehicle.vehicleName} |  ${vehicle.licensePlate}`,
      description: "Berhasil menerima kendaraan",
    });
  };

  const columns: ColumnDef<IVehicleResponse>[] = [
    {
      id: "index",
      enableHiding: false,
      header: "No",
      cell: ({ row }) => {
        const { index } = row;
        return <span>{index + 1}</span>;
      },
    },
    {
      accessorKey: "vehicleName",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Nama Kendaraan
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("vehicleName")}</div>,
    },
    {
      accessorKey: "ownerName",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Pemilik Kendaraan
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("ownerName")}</div>,
    },
    {
      accessorKey: "licensePlate",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Plat Nomor
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="uppercase">{row.getValue("licensePlate")}</div>,
    },
    {
      accessorKey: "vehicleType",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Tipe Kendaraan
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="capitalize">{row.getValue("vehicleType")}</div>,
    },
    {
      accessorKey: "purchasingDate",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Tanggal Pembelian
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div>
          {format(new Date(row.getValue("purchasingDate")), "dd MMMM yyyy", {
            locale: id,
          })}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const vehicle = row.original;

        return (
          <React.Fragment>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Buka menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Info size={15} className="ml-2 mr-3" />
                  <p>Detail</p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleApproveVehicle(vehicle)}>
                  <Check size={15} className="ml-2 mr-3" />
                  {vehiclesPendingQuery.isLoading || approveVehicle.isPending ? <Loader2 className="animate-spin" /> : <p>Terima</p>}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="pl-2 flex items-center mt-1 mb-2 ">
                    <X size={15} className="ml-2 mr-3"  />
                      <p className="text-[0.9rem]">Tolak</p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="w-96 flex flex-col justify-center items-center">
                    <FormProvider {...methods}>
                      <form autoComplete="off" onSubmit={methods.handleSubmit(onSubmit)}>
                        <DialogHeader>
                          <DialogTitle>Alasannya?</DialogTitle>
                          <DialogDescription>Alasan kenapa harus menolak kendaraan ini</DialogDescription>
                        </DialogHeader>
                        <div className="w-full mt-10">
                          <div>
                            <Input name="description" label="Alasannya kenapa" placeholder="Masukan catatan disini..." type="textarea" className="h-24" />
                          </div>
                        </div>
                        <DialogFooter className="sm:flex sm:justify-center mt-4">
                          <_Button type="submit">Kirim</_Button>
                        </DialogFooter>
                      </form>
                    </FormProvider>
                  </DialogContent>
                </Dialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </React.Fragment>
        );
      },
    },
  ];

  return { columns };
}
