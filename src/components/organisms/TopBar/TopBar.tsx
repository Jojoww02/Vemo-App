import { NotificationIcon } from "@/components/atoms";
import { Link } from "react-router-dom";
import { History, Info, Menu } from "lucide-react";
import {
  IconLayoutCollage,
  IconSquareRoundedChevronLeftFilled,
  IconUserSquareRounded,
} from "@tabler/icons-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import IconVemo from "../../../assets/iconVemo.svg";
import { cn } from "@/lib/utils/style";
import { IconLogout2 } from "@tabler/icons-react";

export default function TopBar() {
  const sideBarItem = [
    { title: "Dashboard", icon: <IconLayoutCollage size={35} /> },
    {
      title: "Profile",
      icon: <IconUserSquareRounded size={35} />,
      path: "/vehicles",
    },
    { title: "Services", icon: <History size={35} /> },
    { title: "About Us", icon: <Info size={35} /> },
  ];
  return (
    <header className="bg-white w-full h-20 mb-2 sticky top-0 flex justify-between items-center px-6 md:px-10 z-40">
      <span className="flex justify-center items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Menu className="text-slate-900 lg:hidden mr-4 xs:scale-125 lg:scale-150" />
          </SheetTrigger>
          <SheetContent className="w-72">
            <SheetHeader className="flex flex-row font-semibold italic items-center justify-between">
              <img src={IconVemo} alt="vemo-icon" className="w-[20%]" />
              <SheetTitle className="text-2xl text-[#F4B400] pr-20">
                VEMO
              </SheetTitle>
              <SheetClose>
                <IconSquareRoundedChevronLeftFilled
                  size={35}
                  style={{ color: "#898989" }}
                />
              </SheetClose>
            </SheetHeader>
            <div className="w-full h-[0.05rem] mt-7 bg-[#898989]" />
            <div className="flex flex-col mt-10 gap-7 text-[#898989]">
              {sideBarItem.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex cursor-pointer font-medium text-lg items-center"
                  )}
                >
                  {item.icon}
                  <span className="ml-5">{item.title}</span>
                </div>
              ))}
            </div>
            <div className="w-full h-[0.05rem] bg-[#898989] mt-10" />
            <div className="flex mt-7 flex-row text-[#898989] cursor-pointer font-medium text-lg items-center">
              <IconLogout2 size={35} />
              <span className="ml-5">Log Out</span>
            </div>
          </SheetContent>
        </Sheet>
        <Link to={"/dashboard"}>
          <h1 className="font-bold text-[#F4B400] text-xl xs:text-2xl lg:text-3xl italic">
            Dashboard
          </h1>
        </Link>
      </span>

      <NotificationIcon notificationCount={12} />
    </header>
  );
}
