import React, { useState } from "react";
import image1 from "../../assets/vehicleDetail/imageMotor.png";
import { DASHBOARD_PAGE } from "@/lib/constants/routes";
import IconArrow from "../../assets/notification/Icon-arrow.svg";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/atoms";
import { Modal } from "react-responsive-modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconBike, IconCalendarEvent, IconUser } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { getVehicleById } from "@/api/services/vehicle";
import { IVehicleResponse } from "@/api/types";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function VehicleDetailPageMobile() {
  const { vehicleId } = useParams();

  const { data: vehicle, isSuccess } = useQuery<IVehicleResponse>({
    queryKey: ["vehicle", vehicleId],
    queryFn: async () => await getVehicleById(vehicleId),
  });

  console.log(vehicleId);

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

  return (
    <>
      <div className="mt-11 px-4 mb-20">
        <div className="pt-3 flex flex-col justify-center items-center text-center gap-4 bg-white">
          <img src={image1} alt="" className="" />
          <h1 className="font-semibold text-2xl mb-3 sm:text-3xl sm:mb-5">
            Beat Honda 2021
          </h1>
        </div>

        <Tabs
          defaultValue="account"
          className="w-full flex flex-col justify-center"
        >
          <TabsList className="w-full h-11 text-dark bg-gray-200">
            <TabsTrigger
              value="account"
              className="w-full h-full data-[state=active]:bg-primary/80 data-[state=active]:text-white"
            >
              Information
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className="w-full h-full data-[state=active]:bg-primary/80 data-[state=active]:text-white"
            >
              History Service
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="text-start pl-6 mt-10 sm:text-2xl flex flex-col gap-6">
              <h1 className="font-semibold text-2xl sm:text-2xl">
                Motorcycle Information
              </h1>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <IconUser />
                  <h4 className="text-xl">Owner Name :</h4>
                </div>
                <div className="text-lg">
                  {isSuccess && (vehicle as IVehicleResponse).ownerName}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <IconBike />
                  <h4 className="text-xl">Vehicle Name And Type :</h4>
                </div>
                <div className="text-lg">
                  {isSuccess && (vehicle as IVehicleResponse).ownerName} |{" "}
                  {isSuccess && (vehicle as IVehicleResponse).type}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <IconCalendarEvent />
                  <h4 className="text-xl">Date Vehicle Purchase :</h4>
                </div>
                <div className="text-lg">
                  {isSuccess &&
                    format(
                      new Date((vehicle as IVehicleResponse).purchasingDate),
                      "dd MMMM yyyy",
                      { locale: id }
                    )}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="password">
            {" "}
            <div className="text-start pl-6 mt-5">
              <div className="flex flex-col">
                <h1 className="list-disc text-xl pt-5 p font-bold sm:text-2xl">
                  Riwayat Service
                </h1>
                <ul className="list-disc text-base pt-5 px-2 font-light sm:text-lg">
                  <li className="border-b-2 w-[90%] sm:w-[60%]">
                    20 Januari 2023 -{" "}
                    <span
                      className="text-primary cursor-pointer"
                      onClick={onOpenModal}
                    >
                      See Details
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Modal open={open} onClose={onCloseModal} center>
          <div className="flex flex-col">
            <h1 className="modal py-8 text-center font-semibold text-3xl">
              Service Details
            </h1>
            <table>
              <thead>
                <tr>
                  <th className="left">Items</th>
                  <th className="center">Qty</th>
                  <th className="right">Price</th>
                </tr>
              </thead>
              <tbody>
                {detailsService.map(({ item, qty, price }, index) => (
                  <tr key={index}>
                    <td>{item}</td>
                    <td className="center">{qty}</td>
                    <td className="left">Rp. {price}</td>
                  </tr>
                ))}
                <tr>
                  <td className="border-4">Total</td>
                  <td className="border-4">
                    {detailsService.reduce((acc, item) => {
                      return acc + item.qty;
                    }, 0)}
                  </td>
                  <td className="border-4">
                    Rp.{" "}
                    {detailsService.reduce((acc, item) => {
                      return acc + item.price;
                    }, 0)}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="w-4/6 self-center my-6">
              {/* <Button onClick={onCloseModal}>
                Close
              </Button> */}
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
