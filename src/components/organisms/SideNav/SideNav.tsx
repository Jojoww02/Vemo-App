import React from "react";
import { IconLogout2, IconUserSquareRounded, IconSquareRoundedChevronLeftFilled, IconSquareRoundedChevronRightFilled, IconLayoutDashboard } from "@tabler/icons-react";
import { cn } from "@/lib/utils/style";
import { ToogleIcon } from "@/components/atoms";
import { Separator } from "@/components/ui/separator";
import { History, Info, TableProperties, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useLogoutUser from "@/hooks/useLogoutUser";
import IconVemo from "@/assets/iconVemo.svg";
import { DASHBOARD_PAGE } from "@/lib/constants/routes";
import { IconMotorbike } from "@tabler/icons-react";
import useVehicleList from "@/hooks/useVehicleList";
import { useQuery } from "@tanstack/react-query";
import { IUserResponse } from "@/api/types";

export default function SideNav() {
  const navigate = useNavigate();
  const ADMIN_PAGE = "/admin";

  const { data: user } = useQuery({ queryKey: ["me"] });

  const [isSideNavOpen, setIsSideNavOpen] = React.useState(false);
  const { handleLogoutUser } = useLogoutUser();
  const { isVehicleListEnabled } = useVehicleList();

  const sideBarItem = [
    {
      title: "Profile",
      icon: <IconUserSquareRounded size={35} />,
      navigateTo: "/profile",
      show: user && (user as IUserResponse).role === "customer",
    },
    {
      title: "Services",
      icon: <History size={35} />,
      navigateTo: "/services",
      show: user && (user as IUserResponse).role === "customer",
    },
    {
      title: "About Us",
      icon: <Info size={35} />,
      navigateTo: "/about/vemo",
      show: user && (user as IUserResponse).role === "customer",
    },
    {
      title: "Dashboard",
      icon: <IconLayoutDashboard size={35} />,
      navigateTo: `${ADMIN_PAGE}/dashboard`,
      show: user && (user as IUserResponse).role === "admin",
    },
    {
      title: "Vehicles",
      icon: <IconMotorbike size={35}/>,
      navigateTo: `${ADMIN_PAGE}/vehicles/pending`,
      show: user && (user as IUserResponse).role === "admin",
    },
    {
      title: "Approve Maintenance",
      icon: <Wrench size={35} />,
      navigateTo: `${ADMIN_PAGE}/maintenances`,
      show: user && (user as IUserResponse).role === "admin",
    },
  ];

  if (isVehicleListEnabled) {
    sideBarItem.splice(1, 0, {
      title: "List kendaraan",
      icon: <IconMotorbike size={35} />,
      navigateTo: "/vehicles",
      show: user && (user as IUserResponse).role === "customer",
    });
  }

  return (
    <div
      className={cn(
        "relative my-5 ml-5 p-5 pt-8 hidden lg:block rounded-3xl border-2 shadow-md duration-300 w-24 z-50",
        isSideNavOpen && "w-72"
      )}
    >
      <span className="absolute -right-6 top-16 cursor-pointer bg-white text-[#898989] z-50 hover:scale-105 duration-500 hover:text-[#595959]">
        <ToogleIcon
          iconOpen={<IconSquareRoundedChevronRightFilled size={40} />}
          iconClose={<IconSquareRoundedChevronLeftFilled size={40} />}
          isOpen={isSideNavOpen}
          onClick={() => setIsSideNavOpen(!isSideNavOpen)}
        />
      </span>

      <div className="absolute left-5 flex gap-2 z-50">
        <img
          src={IconVemo}
          alt="icon vemo"
          width={50}
          className="cursor-pointer"
          onClick={() => navigate(DASHBOARD_PAGE)}
        />
        {isSideNavOpen && (
          <h1 className="text-3xl font-semibold italic text-[#898989] pt-1">
            VEMO
          </h1>
        )}
      </div>

      <Separator className="w-full flex mt-16 bg-[#898989]" />
      <div className="flex flex-col absolute mt-7 left-7 gap-5 text-[#898989]">
        {sideBarItem.map(
          (item, index) =>
            item.show !== false && (
              <div
                key={index}
                className={cn(
                  "flex cursor-pointer font-medium text-baseyy items-center"
                )}
                onClick={() => item.navigateTo && navigate(item.navigateTo)}
              >
                {item.icon}
                <span className={cn("ml-5", !isSideNavOpen && "hidden")}>
                  {item.title}
                </span>
              </div>
            )
        )}
      </div>
      <div
        className="absolute bottom-10 left-6 text-[#898989] cursor-pointer font-medium text-lg flex items-center"
        onClick={handleLogoutUser}
      >
        <IconLogout2 size={35} />
        <span className={cn("ml-5", !isSideNavOpen && "hidden")}>Logout</span>
      </div>
    </div>
  );
}
