import React, { useState } from "react";
import image1 from "../../assets/vehicleDetail/imageMotor.png";
import { DASHBOARD_PAGE } from "@/lib/constants/routes";
import IconArrow from "../../assets/notification/Icon-arrow.svg";
import { Link } from "react-router-dom";
import { Button } from "@/components/atoms";
import { Modal } from "react-responsive-modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function VehicleDetailPageMobile() {
  const [activeTab, setActiveTab] = useState("information");

  const tabs = [
    {
      name: "Information",
      id: "information",
    },
    {
      name: "History Service",
      id: "History Service",
    },
  ];

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
    type: "Motor gigi",
    date: Date.now(),
  };

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <>
      <div className="mt-11 ">
        <div className="pt-3 flex flex-col justify-center items-center text-center gap-4 bg-white">
          <img src={image1} alt="" className="" />
          <h1 className="font-semibold text-2xl mb-3 sm:text-3xl sm:mb-5">Beat Honda 2021</h1>
        </div>
        {/* <div className="relative text-center ">
          <Link to={DASHBOARD_PAGE} className="absolute w-4 left-5 top-7 ">
            <img src={IconArrow} alt="" />
          </Link>
          {tabs.map((tab, index) => (
            <button
            type="button"
              onClick={() => setActiveTab(tab.id)}
              key={index}
              className={` text-xs px-5 py-3 sm:py-5 sm:px-7 bg-opacity-[50%] sm:text-base ${tab.id == activeTab ? "bg-primary border-b-[3px] border-primary" : "bg-[#D9D9D9] border-b-[3px] border-[#D9D9D9]"}`}
            >
              {tab.name}
            </button>
          ))}
          {activeTab == "History Service" ? (
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
          ) : (
            <div className="text-start pl-6 mt-10 sm:text-2xl">
              <h1 className="font-semibold text-xl sm:text-2xl">Motorcycle Information</h1>
              <ul className="list-disc text-base pt-5 px-2 sm:text-lg ">
                <li className="w-[90%] sm:w-[60%] border-b-2">Nama Lengkap: {motorcyleInformation.name}</li>
              </ul>
              <ul className="list-disc text-base pt-5 px-2 sm:text-lg">
                <li className=" w-[90%] border-b-2 sm:w-[60%]">Nama Kendaraan : {motorcyleInformation.vehicle} </li>
              </ul>
              <ul className="list-disc text-base pt-5 px-2 sm:text-lg">
                <li className=" w-[90%] border-b-2 sm:w-[60%]">Jenis Kendaraan : {motorcyleInformation.type} </li>
              </ul>
              <ul className="list-disc text-base pt-5 px-2 sm:text-lg">
                <li className=" w-[90%] sm:w-[60%] border-b-2">Pembelian Motor : {motorcyleInformation.date} </li>
              </ul>
            </div>
          )}
          <div className="px-4 absolute left-1/2 transform -translate-x-1/2 sm:px-20 w-full pt-10">
            <Button >
            Request Perawatan
            </Button>
          </div>
        </div> */}
        <Tabs defaultValue="account" className="w-full flex flex-col justify-center">
          <TabsList className="w-full h-11 text-dark">
            <TabsTrigger value="account" className="w-full h-full data-[state=active]:bg-yellow-400 data-[state=active]:text-white">
              Information
            </TabsTrigger>
            <TabsTrigger value="password" className="w-full h-full data-[state=active]:bg-yellow-400 data-[state=active]:text-white">
              History Service
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="text-start pl-6 mt-10 sm:text-2xl">
              <h1 className="font-semibold text-xl sm:text-2xl">Motorcycle Information</h1>
              <ul className="list-disc text-base pt-5 px-2 sm:text-lg ">
                <li className="w-[90%] sm:w-[60%] border-b-2">Nama Lengkap: {motorcyleInformation.name}</li>
              </ul>
              <ul className="list-disc text-base pt-5 px-2 sm:text-lg">
                <li className=" w-[90%] border-b-2 sm:w-[60%]">Nama Kendaraan : {motorcyleInformation.vehicle} </li>
              </ul>
              <ul className="list-disc text-base pt-5 px-2 sm:text-lg">
                <li className=" w-[90%] border-b-2 sm:w-[60%]">Jenis Kendaraan : {motorcyleInformation.type} </li>
              </ul>
              <ul className="list-disc text-base pt-5 px-2 sm:text-lg">
                <li className=" w-[90%] sm:w-[60%] border-b-2">Pembelian Motor : {motorcyleInformation.date} </li>
              </ul>
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

        <Modal open={open} onClose={onCloseModal} center>
          <div className="flex flex-col">
            <h1 className="modal py-8 text-center font-semibold text-3xl">Service Details</h1>
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
