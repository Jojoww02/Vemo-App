import React from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Button as _Button } from "@/components/atoms";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IVehicleResponse } from "@/api/types";
import { useQuery } from "@tanstack/react-query";
import { getVehiclesByMaintenancesStatusFn } from "@/api/services/vehicle";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { VEHICLE_SERVICES_PAGE } from "@/lib/constants/routes";
export default function ServicesHistoryPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const navigate = useNavigate();

  const { data: pendingVehicles, isSuccess } = useQuery({
    queryKey: ["vehicles", "requested"],
    queryFn: async (): Promise<IVehicleResponse[]> => await getVehiclesByMaintenancesStatusFn("requested"),
  });

  let data: IVehicleResponse[] = [];

  if (isSuccess) {
    data = pendingVehicles;
  }

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
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Kendaraan
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
            Tanggal Service
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
      accessorKey: "status",
      header: "Status",
      cell: () => {
        return (
          <DropdownMenu>
            <div className="cursor-pointer" onClick={() => navigate(VEHICLE_SERVICES_PAGE)}>
              <p className="text-primary font-medium text-sm hover:underline">Lihat detail</p>
            </div>
          </DropdownMenu>
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
          placeholder="Cari Kendaraan..."
          value={(table.getColumn("ownerName")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("ownerName")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Riwayat service kendaraan kosong...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Sebelumnya
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Selanjutnya
          </Button>
        </div>
      </div>
    </div>
  );
}
