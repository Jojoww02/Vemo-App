import React from "react";
import zod from "zod";
import { FormProvider, useForm } from "react-hook-form";
import gradient from "../../assets/requestPageImage/gradient-img.svg";
import ImageVehicle from "../../assets/requestPageImage/register-vehicle-mobile-image.png";
import { useQuery } from "@tanstack/react-query";
import useMutateVehicle from "@/hooks/useMutateVehicle";
import { AlertForm, Button, Input } from "@/components/atoms";
import { VehicleType } from "@/lib/types";
import { IUserResponse, IVehicleResponse } from "@/api/types";
import { useNavigate } from "react-router-dom";
import { getVehiclesByUserIdFn } from "@/api/services/vehicle";
import { DASHBOARD_PAGE } from "@/lib/constants/routes";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterVehicleSchema = zod.object({
  fullName: zod.string().min(1, "Nama diperlukan").min(3, "Nama harus lebih dari 3 karakter").max(50, "Password harus kurang dari 50 karakter"),
  vehicleName: zod.string().min(1, "Nama kendaraan diperlukan").min(3, "Nama kendaraan harus lebih dari 3 karakter").max(50, "Password harus kurang dari 50 karakter"),
  vehicleType: zod.string().refine((value) => ["matic", "manual"].includes(value), {
    message: "Pilih jenis kendaraan yang valid",
  }),
  purchasingDate: zod.string().min(1, "Tanggal pembelian kendaraan tidak valid"),
  licensePlate: zod.string().min(1, "Plat kendaraan diperlukan"),
  lastMaintenance: zod.string().refine((value) => !isNaN(new Date(value).getTime()), {
    message: "Tanggal terakhir perawatan kendaraan tidak valid",
  }),
});
export type RegisterVehicle = zod.TypeOf<typeof RegisterVehicleSchema>;

export default function RegisterVehiclePageMobile() {
  const navigate = useNavigate();
  const methods = useForm<RegisterVehicle>({
    resolver: zodResolver(RegisterVehicleSchema),
  });
  const { data: user } = useQuery<IUserResponse>({ queryKey: ["me"] });
  const { registerVehicle } = useMutateVehicle();

  async function handleRegisterVehicle(data: RegisterVehicle) {
    registerVehicle.mutateAsync({
      ownerName: data.fullName,
      vehicleName: data.vehicleName,
      vehicleType: data.vehicleType as VehicleType,
      licensePlate: data.licensePlate,
      purchasingDate: new Date(data.purchasingDate).toISOString(),
      userId: (user as IUserResponse).userId,
      lastMaintenance: calculateMonthsAgo(data.lastMaintenance.toString()),
    });
  }

  const { data: vehicles, isSuccess } = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => await getVehiclesByUserIdFn((user as IUserResponse).userId),
  });

  React.useEffect(() => {
    if (registerVehicle.isSuccess) {
      navigate(DASHBOARD_PAGE);
    }
  }, [registerVehicle.isSuccess]);

  const calculateMonthsAgo = (selectedDate: string) => {
    const currentDate: Date = new Date();
    const selectedDateObject: Date = new Date(selectedDate);

    const timeDiff: number = currentDate.getTime() - selectedDateObject.getTime();
    const monthsAgo: number = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30.44));

    return monthsAgo;
  };

  return (
    <main className="flex flex-col gap-8 mb-10">
      <div>
        <div className="relative w-full flex flex-col justify-center items-center">
          <div className="w-full h-full bg-black z-50"></div>
          <img src={ImageVehicle} alt="" className="w-full max-w-md -z-10" />
          <img src={gradient} alt="" className="absolute w-full max-w-md -bottom-[1px] sm:hidden " />
          <h1 className="absolute bottom-4 left-5 xs:left-10 text-2xl text-white font-bold z-10 w-2/3 xs:w-4/5 xs:text-4xl sm:text-6xl sm:w-[50%] sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:text-center sm:flex sm:items-center sm:justify-center">
            Daftarkan Kendaraan Anda
          </h1>
        </div>
      </div>

      <div className="w-full mb-2 justify-center flex">
        <div className="max-w-md w-full mt-5 px-4">
          <FormProvider {...methods}>
            <form autoComplete="off" onSubmit={methods.handleSubmit(handleRegisterVehicle)} className="flex-col flex gap-6">
              {registerVehicle.isError && <AlertForm title={(registerVehicle.error as any).response.data.message} description={(registerVehicle.error as any).response.data.errors} />}
              <Input name="fullName" label="Nama Lengkap" isFill={methods.watch().fullName} placeholder="Input your name" type="text" />
              <Input name="vehicleName" label="Nama Kendaraan" isFill={methods.watch().vehicleName} placeholder="Input your email" type="text" />
              <Input name="vehicleType" label="Jenis Kendaraan" isFill={methods.watch().vehicleType} placeholder="Pilih jenis kendaraan" type="select">
                <option value="matic">Matic</option>
                <option value="manual">Manual</option>
              </Input>
              <Input name="purchasingDate" label="Tanggal Pembelian Kendaraan" isFill={methods.watch().purchasingDate?.toString()} placeholder="Input your password" type="date" />
              <Input name="licensePlate" label="Plat Nomor" isFill={methods.watch().licensePlate} placeholder="Confirm your password" type="text" />
              <Input name="lastMaintenance" label="Perawatan Terakhir" isFill={methods.watch().lastMaintenance?.toString()} type="date" />
              <div className="flex flex-col gap-2 mt-7">
                <Button className="py-6 text-lg font-semibold" type="submit" isLoading={registerVehicle.isPending} disabled={isSuccess && (vehicles as IVehicleResponse[]).some((vehicle) => vehicle.status === "pending")}>
                  Kirim
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </main>
  );
}
