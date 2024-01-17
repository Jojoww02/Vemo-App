import React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Button as _Button } from "@/components/atoms";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Input as _Input } from "@/components/atoms";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IVehicleResponse } from "@/api/types";
import { useQuery } from "@tanstack/react-query";
import { getVehiclesByMaintenancesStatusFn } from "@/api/services/vehicle";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  ArrowRightCircle,
  Check,
  Info,
  Loader2,
  Settings,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ADMIN_DETAILS_MAINTENANCE_VEHICLE_PAGE } from "@/lib/constants/routes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormProvider, useForm } from "react-hook-form";

export default function AdminDashboardPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState<IVehicleResponse[]>([]);

  const [isUpdateOpen, setIsUpdateOpen] = React.useState(false);

  const methods = useForm<any>();
  const navigate = useNavigate();

  const { data: requestedVehicles, isSuccess: isSuccessRequested } = useQuery({
    queryKey: ["vehicles", "requested"],
    queryFn: async (): Promise<IVehicleResponse[]> =>
      await getVehiclesByMaintenancesStatusFn("requested"),
  });

  const { data: serviceVehicles, isSuccess: isSuccessService } = useQuery({
    queryKey: ["vehicles", "service"],
    queryFn: async (): Promise<IVehicleResponse[]> =>
      await getVehiclesByMaintenancesStatusFn("service"),
  });

  React.useEffect(() => {
    if (
      isSuccessRequested &&
      isSuccessService &&
      requestedVehicles &&
      serviceVehicles
    ) {
      setData([...requestedVehicles, ...serviceVehicles]);
    } else {
      setData([]);
    }
  }, [
    isSuccessRequested,
    isSuccessService,
    requestedVehicles,
    serviceVehicles,
  ]);

  const columns: ColumnDef<IVehicleResponse>[] = [
    {
      id: "index",
      enableHiding: false,
      header: "No",
      cell: ({ row }) => {
        const { index } = row;
        return <span className="text-end">{index + 1}</span>;
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
            Nama Komponen
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("vehicleName")}</div>,
    },
    {
      accessorKey: "licensePlate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Umur
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
            Harga Perawatan
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("vehicleType")}</div>
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
            Harga Jasa
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("vehicleType")}</div>
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
            Jenis Kendaraan
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("vehicleType")}</div>
      ),
    },
    // {
    //   accessorKey: "purchasingDate",
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //       >
    //         Harga service perawatan
    //         <CaretSortIcon className="ml-2 h-4 w-4" />
    //       </Button>
    //     );
    //   },
    //   cell: ({ row }) => (
    //     <div>
    //       {format(new Date(row.getValue("purchasingDate")), "dd MMMM yyyy", {
    //         locale: id,
    //       })}
    //     </div>
    //   ),
    // },
    // {
    //   accessorKey: "maintenanceStatus",
    //   header: "Status",
    //   cell: ({ row }) => (
    //     <div className="capitalize">{row.getValue("maintenanceStatus")}</div>
    //   ),
    // },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const vehicle = row.original;

        return (
          <div
          // className="cursor-pointer"
          // onClick={() =>
          //   navigate(
          //     ADMIN_DETAILS_MAINTENANCE_VEHICLE_PAGE(vehicle.vehicleId)
          //   )
          // }
          >
            <DropdownMenu>
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Buka menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsUpdateOpen(true)}>
                  <Settings size={15} className="ml-2 mr-3" />
                  <p>Update</p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <X size={15} className="ml-2 mr-3" />

                  <p>Tolak</p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search vehicle by owner name..."
          value={
            (table.getColumn("ownerName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("ownerName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Pending vehicles is empty...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      <Dialog open={isUpdateOpen}>
        <DialogContent className="w-4/5">
          <DialogHeader className="flex flex-col items-center justify-center">
            <DialogTitle className="text-2xl font-semibold">
              Mengedit
            </DialogTitle>
            <DialogDescription className="text-center">
              Silahkan requetst
            </DialogDescription>
          </DialogHeader>
          <FormProvider {...methods}>
            <form action="" className="flex flex-col gap-5">
              <_Input
                type="text"
                placeholder="Nama Komponen"
                name="editMaintenanceDate"
                label="Nama Komponen"
              />
              <_Input
                type="number"
                placeholder="Umur Komponen Kendaraan"
                name="editMaintenanceDate"
                label="Umur Komponen Kendaraan"
              />
              <_Input
                type="number"
                placeholder="Harga Perawatan"
                name="editMaintenanceDate"
                label="Harga Perawatan"
              />
              <_Input
                type="number"
                placeholder="Harga service perawatan"
                name="editMaintenanceDate"
                label="Harga service perawatan"
              />
              <_Input
                name="vehicleType"
                label="Jenis Kendaraan"
                isFill={methods.watch().vehicleType}
                placeholder="Pilih jenis kendaraan"
                type="select"
              >
                <option value="matic">Matic</option>
                <option value="manual">Manual</option>
              </_Input>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}
