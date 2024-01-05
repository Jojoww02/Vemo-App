import { getVehiclesByUserIdFn } from "@/api/services/vehicle";
import { IUserResponse, IVehicleResponse } from "@/api/types";
import { VehicleCard } from "@/components/molecules";
import { useQuery } from "@tanstack/react-query";
import { BadgeAlert } from "lucide-react";

export default function VehicleListPage(): JSX.Element {
  const { data: user } = useQuery({ queryKey: ["me"] });
  const {
    data: vehicles,
    isSuccess,
    isPending,
  } = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => await getVehiclesByUserIdFn((user as IUserResponse).userId),
  });

  return (
    <div className="md:w-[480px] md:mx-auto bg-[#898989] shadow-[0px_0px_7px_#00000040] p-4 rounded-2xl my-10">
      <div className="flex flex-col xs:px-8 md:px-0 gap-4 md:gap-6 ">
        {isPending ? (
          <p>Loading...</p>
        ) : isSuccess && vehicles ? (
          (vehicles as IVehicleResponse[]).map((vehicle: IVehicleResponse) => <VehicleCard vehicleData={vehicle} key={vehicle.vehicleId} />)
        ) : (
          <div className="w-full flex flex-col items-center text-center gap-4">
            <BadgeAlert className="text-white" size={50} />
            <h1 className="text-white sm:text-xl">Opps! Anda belum mendaftarkan kendaraan Anda, daftar dulu yuk!</h1>
          </div>
        )}
      </div>
    </div>
  );
}
