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
import { useMutation, useQuery } from "@tanstack/react-query";
import { getVehiclesByMaintenancesStatusFn } from "@/api/services/vehicle";
import { format } from "date-fns";
import { da, id } from "date-fns/locale";
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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormProvider, useForm } from "react-hook-form";
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
import { privateApi } from "@/api";

export default function AdminPartPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = React.useState(false);
  const [selectedPartId, setSelectedPartId] = React.useState("");

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
      accessorKey: "name",
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
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "ageInMonth",
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
        <div className="">{row.getValue("ageInMonth")} Bulan</div>
      ),
    },
    {
      accessorKey: "maintenancePrice",
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
        <div className="capitalize">Rp. {row.getValue("maintenancePrice")}</div>
      ),
    },
    {
      accessorKey: "maintenanceServicePrice",
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
        <div className="capitalize">
          Rp. {row.getValue("maintenanceServicePrice")}
        </div>
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
        <div className="capitalize">
          {row.getValue("vehicleType") || "General"}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              onClick={() => {
                setIsUpdateOpen(true);
                setSelectedPartId((row.original as any).id);
                partById.refetch();
              }}
              className="cursor-pointer !bg-yellow-500/90 hover:!bg-yellow-500/75"
            >
              <p>Update</p>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  asChild
                  size="sm"
                  className="cursor-pointer !bg-red-500/90 hover:!bg-red-500/75"
                >
                  <p>Hapus</p>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Apakah yakin ingin menghapus?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={async () =>
                      await deletePart.mutateAsync((row.original as any).id)
                    }
                    className="!bg-red-500/90 hover:!bg-red-500/75"
                  >
                    Hapus
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];

  const parts = useQuery({
    queryKey: ["parts"],
    queryFn: async () => {
      return (await privateApi.get("vehicles/parts")).data;
    },
  });

  const partById = useQuery({
    queryKey: ["parts", selectedPartId],
    queryFn: async () => {
      return (await privateApi.get(`vehicles/parts/${selectedPartId}`)).data;
    },
    enabled: isUpdateOpen,
  });

  const addPart = useMutation({
    mutationFn: async (data: typeof defaultFormValue) => {
      return (
        await privateApi.post(`vehicles/parts`, {
          ...data,
          vehicleType: data.vehicleType === "general" ? null : data.vehicleType,
        })
      ).data;
    },
    onSuccess: () => {
      setIsAddOpen(false);
      parts.refetch();
      methodsAdd.reset();
    },
  });

  const updatePart = useMutation({
    mutationFn: async (data: typeof defaultFormValue) => {
      return (
        await privateApi.put(`vehicles/parts`, {
          ...data,
          partId: selectedPartId,
          vehicleType: data.vehicleType === "general" ? null : data.vehicleType,
        })
      ).data;
    },
    onSuccess: () => {
      setIsUpdateOpen(false);
      parts.refetch();
    },
  });

  const deletePart = useMutation({
    mutationFn: async (partId: string) => {
      return (await privateApi.delete(`vehicles/parts`, { data: { partId } }))
        .data;
    },
    onSuccess: () => {
      parts.refetch();
    },
  });

  const [defaultFormValue] = React.useState(() => ({
    name: "",
    ageInMonth: "",
    maintenancePrice: "",
    maintenanceServicePrice: "",
    vehicleType: "general",
  }));

  const methodsAdd = useForm<typeof defaultFormValue>();

  const methodsUpdate = useForm({
    defaultValues: defaultFormValue,
  });

  React.useEffect(() => {
    if (!!partById.data) {
      type KeysType = keyof typeof defaultFormValue;
      const keys = Object.keys(
        methodsUpdate.formState.defaultValues ?? {}
      ) as Array<KeysType>;

      for (const key of keys) {
        methodsUpdate.setValue(key, partById.data[key]);
      }
    }
  }, [partById.data, methodsUpdate.setValue]);

  const table = useReactTable({
    data: parts.data ?? [],
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
      <Button
        className="bg-green-600/90 hover:bg-green-600/75 mb-3"
        onClick={() => setIsAddOpen(true)}
      >
        Tambahkan Komponen
      </Button>
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
      {/* Add Parts Modal */}
      <Dialog open={isAddOpen}>
        <DialogContent className="w-4/5">
          <DialogHeader className="flex flex-col items-center justify-center">
            <DialogTitle className="text-2xl font-semibold">
              Tambahkan Komponen
            </DialogTitle>
          </DialogHeader>
          <FormProvider {...methodsAdd}>
            <form
              onSubmit={methodsAdd.handleSubmit(async (data) => {
                await addPart.mutateAsync(data);
              })}
              className="flex flex-col gap-5 w-full pb-4"
            >
              <_Input
                type="text"
                placeholder="Nama Komponen"
                name="name"
                label="Nama Komponen"
                isFill={methodsAdd.watch().name}
              />
              <_Input
                type="number"
                placeholder="Umur Komponen"
                name="ageInMonth"
                label="Umur Komponen"
                isFill={methodsAdd.watch().ageInMonth}
              />
              <_Input
                type="number"
                placeholder="Harga Perawatan"
                name="maintenancePrice"
                label="Harga Perawatan"
                isFill={methodsAdd.watch().maintenancePrice}
              />
              <_Input
                type="number"
                placeholder="Harga  Jasa"
                name="maintenanceServicePrice"
                label="Harga Jasa"
                isFill={methodsAdd.watch().maintenanceServicePrice}
              />
              <_Input
                name="vehicleType"
                label="Jenis Kendaraan"
                isFill={methodsAdd.watch().vehicleType}
                placeholder="Pilih jenis kendaraan"
                type="select"
              >
                <option value="matic">Matic</option>
                <option value="manual">Manual</option>
                <option value="general">General</option>
              </_Input>
              <div className="flex self-end gap-2">
                <_Button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="!py-5 !bg-red-500/90 hover:!bg-red-500/75"
                >
                  Batal
                </_Button>
                <_Button type="submit" className="!py-5">
                  Tambahkan Komponen
                </_Button>
              </div>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
      {/* Update Part Modal */}
      <Dialog open={isUpdateOpen}>
        <DialogContent className="w-4/5">
          <DialogHeader className="flex flex-col items-center justify-center">
            <DialogTitle className="text-2xl font-semibold">
              Update Komponen
            </DialogTitle>
          </DialogHeader>
          <FormProvider {...methodsUpdate}>
            <form
              onSubmit={methodsUpdate.handleSubmit(async (data) => {
                await updatePart.mutateAsync(data);
              })}
              className="flex flex-col gap-5 w-full pb-4"
            >
              <_Input
                type="text"
                placeholder="Nama Komponen"
                name="name"
                label="Nama Komponen"
                isFill={methodsUpdate.watch().name}
              />
              <_Input
                type="number"
                placeholder="Umur Komponen"
                name="ageInMonth"
                label="Umur Komponen"
              />
              <_Input
                type="number"
                placeholder="Harga Perawatan"
                name="maintenancePrice"
                label="Harga Perawatan"
              />
              <_Input
                type="number"
                placeholder="Harga  Jasa"
                name="maintenanceServicePrice"
                label="Harga Jasa"
              />
              <_Input
                name="vehicleType"
                label="Jenis Kendaraan"
                isFill={methodsUpdate.watch().vehicleType}
                placeholder="Pilih jenis kendaraan"
                type="select"
              >
                <option value="matic">Matic</option>
                <option value="manual">Manual</option>
                <option value="general">General</option>
              </_Input>
              <div className="flex self-end gap-2">
                <_Button
                  type="button"
                  onClick={() => setIsUpdateOpen(false)}
                  className="!py-5 !bg-red-500/90 hover:!bg-red-500/75"
                >
                  Batal
                </_Button>
                <_Button type="submit" className="!py-5">
                  Update Komponen
                </_Button>
              </div>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}
