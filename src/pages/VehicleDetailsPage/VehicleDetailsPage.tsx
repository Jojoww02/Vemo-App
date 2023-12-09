import { getVehicleByIdFn } from "@/api/services/vehicle";
import { IVehicleResponse } from "@/api/types";
import useMobile from "@/hooks/useMobile";
import { VehicleDetailPageMobile } from "@/mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconBike, IconCalendarEvent, IconUser } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Button, VehicleIcon } from "@/components/atoms";
import { VEHICLE_PARTS_PAGE } from "@/lib/constants/routes";

export default function VehicleDetailsPage() {
  const { vehicleId } = useParams();
  const navigate = useNavigate();

  const { data: vehicle, isSuccess } = useQuery<IVehicleResponse>({
    queryKey: ["vehicle", vehicleId],
    queryFn: async () => await getVehicleByIdFn(vehicleId),
  });

  const detailsService = [
    {
      item: "Aki",
      qty: 1,
      price: 250000,
    },
    {
      item: "Busi",
      qty: 1,
      price: 12000,
    },
    {
      item: "Mesin",
      qty: 1,
      price: 30000,
    },
    {
      item: "Oli",
      qty: 1,
      price: 80000,
    },
  ];

  const motorcyleInformation = {
    name: "Maulvi Ilmullah",
    vehicle: "Jupiter mx old",
    date: Date.now(),
  };

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const isMobileResponsive = useMobile();
  return (
    <>
      {/* {isMobileResponsive ? ( */}
        <div className="w-full flex gap-5 flex-col lg:flex-row">
          <div className="lg:w-1/2 bg-[#F7F8F9] rounded-xl py-5 px-5 h-full min-h-[660px]">
            <div className="w-full flex flex-col justify-center items-center">
              <VehicleIcon type={isSuccess ? (vehicle as IVehicleResponse).type : "matic"} />
              <h1 className="font-semibold text-xl mt-4 devide mb-5">{isSuccess && (vehicle as IVehicleResponse).name}</h1>
            </div>
            <div>
              <Tabs defaultValue="account" className="w-full flex flex-col justify-center">
                <TabsList className="w-full h-11 text-dark bg-gray-200">
                  <TabsTrigger value="account" className="w-full h-full data-[state=active]:bg-primary/80 data-[state=active]:text-white">
                    Information
                  </TabsTrigger>
                  <TabsTrigger value="password" className="w-full h-full data-[state=active]:bg-primary/80 data-[state=active]:text-white">
                    History Service
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  <div className="text-start pl-6 mt-10 sm:text-2xl flex flex-col gap-6">
                    <h1 className="font-semibold text-2xl sm:text-2xl">Motorcycle Information</h1>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <IconUser />
                        <h4 className="text-xl">Owner Name :</h4>
                      </div>
                      <div className="text-lg">{isSuccess && (vehicle as IVehicleResponse).ownerName}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <IconBike />
                        <h4 className="text-xl">Vehicle Name And Type :</h4>
                      </div>
                      <div className="text-lg">
                        {isSuccess && (vehicle as IVehicleResponse).name} | {isSuccess && (vehicle as IVehicleResponse).type}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <IconCalendarEvent />
                        <h4 className="text-xl">Date Vehicle Purchase :</h4>
                      </div>
                      <div className="text-lg">{isSuccess && format(new Date((vehicle as IVehicleResponse).purchasingDate), "dd MMMM yyyy", { locale: id })}</div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="password">
                  {" "}
                  <div className="text-start pl-6 mt-5">
                    <div className="flex flex-col">
                      <h1 className="list-disc text-xl pt-5 p font-bold sm:text-2xl">Riwayat Service</h1>
                      <ul className="list-disc text-base pt-5 px-2 font-light sm:text-lg">
                        <li className="border-b-2 w-[90%] sm:w-[60%]">
                          20 Januari 2023 -{" "}
                          <span className="text-primary cursor-pointer" onClick={onOpenModal}>
                            See Details
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <div className="lg:w-1/2 lg:bg-[#F7F8F9] rounded-xl py-5 px-5 h-full min-h-[660px]">
            <h1 className="text-[#898989] py-2 px-4 text-lg">Condiotion Part :</h1>
            <div className="w-full px-2 flex mt-7 mb-10 flex-col gap-5 justify-center h-[28rem]  overflow-y-auto">
              <div className="flex gap-4">
                <img src={"/machine.svg"} alt="" className="w-24" />
                <p className="font-bold text-xl">Mesin Motor</p>
              </div>
              <div className="flex gap-4">
                <img src={"/oil.svg"} alt="" className="w-24" />
                <p className="font-bold text-xl">Oli Motor</p>
              </div>
              <div className="flex gap-4">
                <img src={"/busi.svg"} alt="" className="w-24" />
                <p className="font-bold text-xl">Busi Motor</p>
              </div>
              <div className="flex gap-4">
                <img src={"/aki.svg"} alt="" className="w-24" />
                <p className="font-bold text-xl">Aki Motor</p>
              </div>
              <div className="flex gap-4">
                <img src={"/chain.svg"} alt="" className="w-24" />
                <p className="font-bold text-xl">Rantai Motor</p>
              </div>
              <div className="flex gap-4">
                <img src={"/rem.svg"} alt="" className="w-24" />
                <p className="font-bold text-xl">Rem Motor</p>
              </div>
            </div>
            <div className="w-full flex flex-col justify-center px-10 ">
              <Button onClick={() => navigate(VEHICLE_PARTS_PAGE)}>Request Perawatan</Button>
            </div>
          </div>
        </div>
      {/* ) : (
        <VehicleDetailPageMobile />
       )} */}
    </>
  );
}
