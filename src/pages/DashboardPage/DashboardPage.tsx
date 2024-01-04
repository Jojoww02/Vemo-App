import React from "react";
import { FeatureCard, VehicleCard } from "@/components/molecules";
import { featuresData } from "@/lib/data";
import { useQuery } from "@tanstack/react-query";
import { getVehiclesByUserIdFn } from "@/api/services/vehicle";
import { IUserResponse, IVehicleResponse } from "@/api/types";
import { BadgeAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { VEHICLE_LIST_PAGE } from "@/lib/constants/routes";
import useVehicleList from "@/hooks/useVehicleList";

export default function DashboardPage(): JSX.Element {
  const navigate = useNavigate();
  const { setIsVehicleListEnabled } = useVehicleList();

  const { data: user } = useQuery({ queryKey: ["me"] });
  const { data: vehicles, isSuccess } = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () =>
      await getVehiclesByUserIdFn((user as IUserResponse).userId),
  });

  React.useEffect(() => {
    if (isSuccess && vehicles && vehicles.length > 2) {
      setIsVehicleListEnabled(true);
    } else {
      setIsVehicleListEnabled(false);
    }
  }, [isSuccess]);

  return (
    <React.Fragment>
      <div className="relative p-4 md:p-7 md:px-10 rounded-2xl shadow-[0px_0px_7px_#00000040] bg-[#898989]">
        <div className="w-full flex justify-between mb-3">
          <p className="text-white text-xs md:text-xl">Daftar kendaraan :</p>
          {isSuccess && vehicles && vehicles.length > 2 && (
            <p
              className="text-[10px] md:text-lg text-white cursor-pointer hover:text-yellow-300 hover:underline transition ease-linear"
              onClick={() => navigate(VEHICLE_LIST_PAGE)}
            >
              Lihat semua kendaraan
            </p>
          )}
        </div>
        <div
          className={`flex flex-col xs:px-8 md:px-0 md:flex-row items-center gap-4 md:gap-6`}
        >
          {isSuccess &&
            (vehicles.length > 0 ? (
              // Jika ada 2 kendaraan
              vehicles.length >= 2 ? (
                (vehicles as IVehicleResponse[])
                  .slice(0, 2)
                  .map((vehicle: IVehicleResponse) => (
                    <VehicleCard
                      vehicleData={vehicle}
                      key={vehicle.vehicleId}
                    />
                  ))
              ) : (
                <>
                  {/* Jika hanya ada 1 kendaraan */}
                  {(vehicles as IVehicleResponse[])
                    .slice(0, 1)
                    .map((vehicle: IVehicleResponse) => (
                      <VehicleCard
                        vehicleData={vehicle}
                        key={vehicle.vehicleId}
                      />
                    ))}
                  <div className="w-full border-dashed rounded-2xl border-[3px] h-24 sm:h-28 md:h-[7.8rem] lg:h-32 flex justify-center items-center ">
                    <p className="text-white text-xs xs:text-base lg:text-lg  px-4">
                      Daftarkan kendaraan kedua anda
                    </p>
                  </div>
                </>
              )
            ) : (
              // Jika tidak ada kendaraan
              <div className="w-full py-4 flex flex-col items-center text-center gap-4">
                <BadgeAlert className="text-white" size={50} />
                <h1 className="text-white sm:text-xl lg:w-[29rem]">
                  Opps! anda belum mendaftarkan kendaraan anda, daftar dulu yuk!
                </h1>
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center w-full mt-5 gap-5 md:gap-10 mb-10">
        {featuresData.map((feature, index) => (
          <FeatureCard
            image={feature.image}
            title={feature.title}
            key={index}
            path={feature.path}
          />
        ))}
      </div>
    </React.Fragment>
  );
}
