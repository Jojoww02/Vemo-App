import { getVehicleByIdFn, getVehiclePartsConditionFn } from "@/api/services/vehicle";
import { IParts, IVehicleResponse } from "@/api/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconBike, IconCalendarEvent, IconUser } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate, useParams } from "react-router-dom";
import { Button, VehicleIcon } from "@/components/atoms";
import { VEHICLE_PARTS_PAGE } from "@/lib/constants/routes";
import DetailVehicleCard from "@/components/molecules/DetailVehicleCard";
import { ChevronsDown } from "lucide-react";

export default function VehicleDetailsPage() {
  const { vehicleId } = useParams();
  const navigate = useNavigate();

  const validVehicleId = vehicleId || "";

  const { data: vehicle, isSuccess: isVehicleSuccess } = useQuery<IVehicleResponse>({
    queryKey: ["vehicle", vehicleId],
    queryFn: async () => await getVehicleByIdFn(vehicleId),
  });

  const { data: conditionArray, isSuccess: isConditionSuccess } = useQuery<IParts[], Error>({
    queryKey: ["parts", validVehicleId],
    queryFn: async () => await getVehiclePartsConditionFn(validVehicleId),
  });

  // const detailsService = [
  //   {
  //     item: "Aki",
  //     qty: 1,
  //     price: 250000,
  //   },
  //   {
  //     item: "Busi",
  //     qty: 1,
  //     price: 12000,
  //   },
  //   {
  //     item: "Mesin",
  //     qty: 1,
  //     price: 30000,
  //   },
  //   {
  //     item: "Oli",
  //     qty: 1,
  //     price: 80000,
  //   },
  // ];

  // const motorcyleInformation = {
  //   name: "Maulvi Ilmullah",
  //   vehicle: "Jupiter mx old",
  //   date: Date.now(),
  // };

  // const [open, setOpen] = useState(false);

  // const onOpenModal = () => setOpen(true);

  return (
    <>
      <div className="w-full md:w-[480px] md:mx-auto lg:w-full flex gap-5 flex-col lg:flex-row">
        <div className="lg:w-1/2 bg-[#F7F8F9] rounded-xl py-5 px-5">
          <div className="w-full flex flex-col justify-center items-center">
            <VehicleIcon type={isVehicleSuccess ? (vehicle as IVehicleResponse).vehicleType : "matic"} />
            <h1 className="font-semibold text-xl lg:text-2xl mt-4 devide mb-5">{isVehicleSuccess && (vehicle as IVehicleResponse).vehicleName}</h1>
          </div>
          <div className="mb-6">
            <Tabs defaultValue="information" className="w-full flex flex-col justify-center static">
              <TabsList className="w-full h-11 text-dark bg-gray-200">
                <TabsTrigger value="information" className="w-full h-full data-[state=active]:bg-primary/80 data-[state=active]:text-white">
                  Informasi
                </TabsTrigger>
                <TabsTrigger value="history" className="w-full h-full data-[state=active]:bg-primary/80 data-[state=active]:text-white">
                  Riwayat Service
                </TabsTrigger>
              </TabsList>
              <div className="pl-4">
                <TabsContent value="information">
                  <div className="text-start mt-5 sm:text-2xl flex flex-col gap-6">
                    <h1 className="font-semibold text-lg sm:text-2xl">
                      <a href="#parts">Informasi Kendaraan</a>
                    </h1>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <IconUser />
                        <h4 className="text-lg lg:text-xl">Nama Pengguna :</h4>
                      </div>
                      <div className="text-lg">{isVehicleSuccess && (vehicle as IVehicleResponse).ownerName}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <IconBike />
                        <h4 className="text-lg lg:text-xl">Nama Kendaraan Dan Tipe :</h4>
                      </div>
                      <div className="text-lg">
                        {isVehicleSuccess && (vehicle as IVehicleResponse).vehicleName} | {isVehicleSuccess && (vehicle as IVehicleResponse).vehicleType}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <IconCalendarEvent />
                        <h4 className="text-lg lg:text-xl">Tanggal Kendaraan Dibeli :</h4>
                      </div>
                      <div className="text-lg">{isVehicleSuccess && format(new Date((vehicle as IVehicleResponse).purchasingDate), "dd MMMM yyyy", { locale: id })}</div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="history">
                  <div className="text-start pl-6 mt-5">
                    <div className="flex flex-col">
                      <h1 className="list-disc text-xl pt-5 p font-bold sm:text-2xl">Riwayat Service</h1>
                      <ul className="list-disc text-base pt-5 px-2 font-light sm:text-lg">
                        <li className="border-b-2 w-[90%] sm:w-[60%]">
                          20 Januari 2023 - <span className="text-primary cursor-pointer">Lihat Detail</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
            <a href="#parts" className="w-full flex justify-center mt-10 text-primary lg:hidden">
              <ChevronsDown size={40} className="animate-bounce" />
            </a>
          </div>
        </div>
        <div className="lg:w-1/2 lg:bg-[#F7F8F9] rounded-xl py-5 px-5 h-full" id="parts">
          <h1 className="text-[#898989] py-2 px-4 text-lg">Kondisi Part :</h1>
          <div className="w-full px-2 flex mt-7 mb-10 flex-col gap-5 justify-center h-[24rem] overflow-y-auto">
            <div className="gap-4 mt-[30rem] lg:mt-[45rem] lg:gap-2 px-4">
              {isConditionSuccess && conditionArray.map((part, index) => <DetailVehicleCard key={index} title={part.partName} condition={part.condition} image={part.partName} />)}
            </div>
          </div>
          <div className="w-full flex flex-col justify-center mb-10 ">
            <Button onClick={() => navigate(VEHICLE_PARTS_PAGE(vehicleId))}>Detail Komponen</Button>
          </div>
        </div>
      </div>
    </>
  );
}
