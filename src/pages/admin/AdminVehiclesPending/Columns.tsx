import { IVehicleResponse } from "@/api/types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useVehiclesPending } from "./useVehiclesPending";
import { Button } from "@/components/ui/button";
import useMutateVehicle from "@/hooks/mutations/useMutateVehicle";

export default function Columns() {
  const { vehiclesPendingQuery } = useVehiclesPending();
  const { approveVehicle } = useMutateVehicle();

  const { toast } = useToast();

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
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
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
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
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
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Plat Nomor
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="uppercase">{row.getValue("licensePlate")}</div>
      ),
    },
    {
      accessorKey: "vehicleType",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tipe Kendaraan
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("vehicleType")}</div>
      ),
    },
    {
      accessorKey: "purchasingDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Buka menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleApproveVehicle(vehicle)}>
                {vehiclesPendingQuery.isLoading || approveVehicle.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <p>Terima kendaraan</p>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <p>Detail kendaraan</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return { columns };
}
