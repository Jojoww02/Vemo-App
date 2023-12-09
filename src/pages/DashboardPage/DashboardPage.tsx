import { Tooltip } from "@/components/atoms";
import { FeatureCard, VehicleCard } from "@/components/molecules";
import { IconCircleArrowUpRightFilled } from "@tabler/icons-react";
import { featuresData } from "@/lib/data";
import { useQuery } from "@tanstack/react-query";
import { getVehiclesByUserIdFn } from "@/api/services/vehicle";
import { IUserResponse, IVehicleResponse } from "@/api/types";
import { BadgeAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { VEHICLE_LIST_PAGE } from "@/lib/constants/routes";

export default function DashboardPage(): JSX.Element {
  const navigate = useNavigate();
  const { data: user } = useQuery({ queryKey: ["me"] });
  const { data: vehicles, isSuccess } = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => await getVehiclesByUserIdFn((user as IUserResponse).userId),
  });

  return (
     <>
      <div className="relative p-4 md:p-7 md:px-10 rounded-2xl shadow-[0px_0px_7px_#00000040] bg-[#898989]">
        <div className="hidden md:block absolute right-2 top-2">
          <Tooltip text="View All Vehicles">
            <IconCircleArrowUpRightFilled
              size={27}
              className="text-white hover:scale-125 duration-500"
              type="button"
              onClick={() => navigate(VEHICLE_LIST_PAGE)}
            />
          </Tooltip>
        </div>
        <div
          className={`flex flex-col xs:px-8 md:px-0 md:flex-row items-center gap-4 md:gap-6`}
        >
          {isSuccess &&
            (vehicles.length > 0 ? (
              vehicles.length >= 2 ? (
                (vehicles as IVehicleResponse[])
                  .slice(0, 2)
                  .map((vehicle: IVehicleResponse) => (
                    <VehicleCard vehicleData={vehicle} key={vehicle.id} />
                  ))
              ) : (
                <>
                  {(vehicles as IVehicleResponse[])
                    .slice(0, 1)
                    .map((vehicle: IVehicleResponse) => (
                      <VehicleCard vehicleData={vehicle} key={vehicle.id} />
                    ))}
                  {/* Vehicle Pending Card  */}
                  <div className="w-full border-dashed rounded-2xl border-[3px] h-24 sm:h-28 md:h-[7.8rem] lg:h-32 flex justify-center items-center ">
                    <p className="text-white text-xs xs:text-base lg:text-lg  px-4">Daftarkan kendaraan kedua anda</p>
                  </div>
                </>
              )
            ) : (
              <div className="w-full flex flex-col items-center text-center gap-4">
                <BadgeAlert className="text-white" size={50} />
                <h1 className="text-white sm:text-xl">
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
    </>
  );
}
