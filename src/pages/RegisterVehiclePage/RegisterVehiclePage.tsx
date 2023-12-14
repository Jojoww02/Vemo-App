import zod from "zod";
import { getVehiclesByUserIdFn } from "@/api/services/vehicle";
import { IUserResponse, IVehicleResponse } from "@/api/types";
import { AlertForm, Button, Input } from "@/components/atoms";
import useMobile from "@/hooks/useMobile";
import useMutateVehicle from "@/hooks/useMutateVehicle";
import { DASHBOARD_PAGE } from "@/lib/constants/routes";
import { VehicleType } from "@/lib/types";
import { RegisterVehiclePageMobile } from "@/mobile";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterVehicleSchema = zod.object({
  fullName: zod.string().min(1, "Name is required")
  .min(3, "Name must be more than 3 characters")
  .max(50, "Password must be less than 50 characters"),
  vehicleName: zod.string().min(1, "Name is required")
  .min(3, "Name must be more than 3 characters")
  .max(50, "Password must be less than 50 characters"),
  vehicleType: zod.string().min(1, "Email address is required"),
  purchasingDate: zod.string().min(1, "Email address is required"),
  licensePlate: zod.string().min(1, "Plat nomor sudah terdaftar"),
  lastMaintenance: zod.number().min(1, "Tanggal terakhir perawatan kendaraan tidak valid"),
});

export type RegisterVehicle = zod.TypeOf<typeof RegisterVehicleSchema>;


export default function RegisterVehiclePage() {
  const isMobile = useMobile();
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

  // const handleRegisterVehicle = (data: any) => {
  //   // Convert the selected date to months ago
  //   const monthsAgo = calculateMonthsAgo(data.lastMaintenance);
  //   console.log("Form Data:", { ...data, lastMaintenance: monthsAgo });
  //   // ...

  //   // Your existing logic here
  // };

  const calculateMonthsAgo = (selectedDate: string) => {
    const currentDate: Date = new Date();
    const selectedDateObject: Date = new Date(selectedDate);

    const timeDiff: number = currentDate.getTime() - selectedDateObject.getTime();
    const monthsAgo: number = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30.44));

    return monthsAgo;
  };

  return (
    <>
      {isMobile ? (
        <main className="flex justify-evenly gap-10 mt-10">
          {/* Content Left Start */}
          <div className="relative w-1/2 bg-cover grid rounded-xl bg-[url('/src/assets/requestPageImage/register-vehicle-image.webp')]">
            <div className="absolute bottom-0 font-bold text-white text-4xl xl:text-5xl px-8 z-10 mb-14">
              Daftarkan
              <br />
              Kendaraan Anda
            </div>
            <div className="absolute -z-1 bottom-0 left-0 w-full h-[60%] rounded-xl [background:linear-gradient(180deg,rgba(244,180,0,0)_0%,rgb(244,180,0)_100%)]"></div>
          </div>
          {/* Content Left End */}

          {/* Content Right Start */}
          <div className="w-1/2 mb-2 justify-center flex">
            <div className="w-[80%] mt-5">
              <FormProvider {...methods}>
                <form autoComplete="off" onSubmit={methods.handleSubmit(handleRegisterVehicle)} className="flex-col flex gap-6">
                {registerVehicle.isError && (
                  <AlertForm 
                    title={(registerVehicle.error as any).response.data.message} 
                    description={(registerVehicle.error as any).response.data.errors} 
                  />
                )}
                  <Input name="fullName" label="Nama Lengkap" isFill={methods.watch().fullName} placeholder="Input your name" type="text" />
                  <Input name="vehicleName" label="Nama Kendaraan" isFill={methods.watch().vehicleName} placeholder="Input your email" type="text" />
                  <Input name="vehicleType" label="Jenis Kendaraan" isFill={methods.watch().vehicleType} placeholder="Pilih jenis kendaraan" type="select">
                    <option value="matic">Matic</option>
                    <option value="manual">Manual</option>
                  </Input>
                  <Input name="purchasingDate" label="Tanggal Pembelian Kendaraan" isFill={methods.watch().purchasingDate?.toString()} placeholder="Input your password" type="date" />
                  <Input name="licensePlate" label="Plat Nomor" isFill={methods.watch().licensePlate} placeholder="Confirm your password" type="text" />
                  <Input name="lastMaintenance" label="Terakhir Bulan" isFill={methods.watch().lastMaintenance?.toString()} placeholder="Input your password" type="date" />
                  <div className="flex flex-col gap-2 mt-7">
                    <Button className="py-6 text-lg font-semibold" type="submit" isLoading={registerVehicle.isPending} disabled={isSuccess && (vehicles as IVehicleResponse[]).some((vehicle) => vehicle.status === "pending")}>
                      Send
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
          {/* Content Right End */}
        </main>
      ) : (
        <RegisterVehiclePageMobile />
      )}
    </>
  );
}
