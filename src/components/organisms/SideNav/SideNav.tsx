import * as React from "react";
import { cn } from "@/lib/utils/style";
import { ArrowIcon } from "@/components/atoms";
import { Separator } from "@/components/ui/separator";
import {
  IconLogout2,
  IconUserSquareRounded,
  IconLayoutCollage,
} from "@tabler/icons-react";
import IconVemo from "../../../assets/iconVemo.svg";
import { History, Info } from "lucide-react";
import { ABOUT_US_PAGE, DASHBOARD_PAGE, INDEX_PAGE, PROFILE_PAGE } from "@/lib/constants/routes";

const sideBarItem = [
  { title: "Dashboard", icon: <IconLayoutCollage size={35} />, navigateTo:(DASHBOARD_PAGE), },
  { title: "Profile", icon: <IconUserSquareRounded size={35}  />, navigateTo:(PROFILE_PAGE) },
  { title: "Services", icon: <History size={35} />, navigateTo:(INDEX_PAGE) },
  { title: "About Us", icon: <Info size={35} />,  navigateTo:(ABOUT_US_PAGE) },
];

export default function SideNav() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div
      className={cn(
        "relative my-5 ml-5 p-5 pt-8 hidden lg:block rounded-3xl border-2 shadow-md duration-300 w-24 z-50",
        isOpen && "w-72"
      )}
    >
      <ArrowIcon
        open={isOpen}
        className="absolute -right-6 top-16 cursor-pointer bg-white text-[#898989] z-50"
        onClick={() => setIsOpen(!isOpen)}
      />

      <div className="absolute left-5 flex gap-2 z-50">
        <img src={IconVemo} alt="icon vemo" width={50} className="cursor-pointer"/>
        {isOpen && (
          <h1 className="text-3xl font-semibold italic text-[#898989] pt-1">
            VEMO
          </h1>
        )}
      </div>

      <Separator className="w-full flex mt-16 bg-[#898989]" />

      <div className="flex flex-col absolute mt-7 left-7 gap-5 text-[#898989]">
        {sideBarItem.map((item, index) => (
          <div
            key={index}
            className={cn(
              "flex cursor-pointer font-medium text-lg items-center"
            )}
            onClick={() => item.navigateTo && (window.location.href = item.navigateTo)}
          >
            {item.icon}
            <span className={cn("ml-5", !isOpen && "hidden")}>
              {item.title}
            </span>
          </div>
        ))}
      </div>

      <div className="absolute bottom-10 left-6 text-[#898989] cursor-pointer font-medium text-lg flex items-center">
        <IconLogout2 size={35} />
        <span className={cn("ml-5", !isOpen && "hidden")}>Logout</span>
      </div>
    </div>
  );
}
