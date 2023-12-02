import { NotificationIcon } from "@/components/atoms";
import { Link, useNavigate } from "react-router-dom";
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
import { useState } from "react";
import useLogoutUser from "@/hooks/useLogoutUser";

interface SideBarItem {
  title: string;
  icon: React.ReactNode;
  path: string;
}

export default function TopBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleIconClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleClick = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleCloseSheet = () => {
    setIsOpen(false);
  };

  const { handleLogoutUser } = useLogoutUser();

  const sideBarItem: SideBarItem[] = [
    {
      title: "Dashboard",
      icon: <IconLayoutCollage size={35} />,
      path: "/dashboard",
    },
    {
      title: "Profile",
      icon: <IconUserSquareRounded size={35} />,
      path: "/profile",
    },
    { title: "Services", icon: <History size={35} />, path: "/dashboard" },
    { title: "About Us", icon: <Info size={35} />, path: "/about-us" },
  ];
  return (
    <header className="bg-white w-full h-20 mb-2 sticky top-0 flex justify-between items-center px-6 md:px-10 z-40">
      <span className="flex justify-center items-center">
        <Sheet open={isOpen}>
          <SheetTrigger asChild>
            <Menu
              className="text-slate-900 lg:hidden mr-4 xs:scale-125 lg:scale-150"
              onClick={handleIconClick}
            />
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
                  onClick={handleCloseSheet}
                />
              </SheetClose>
            </SheetHeader>
            <div className="w-full h-[0.05rem] mt-7 bg-[#898989]" />
            <div className="flex flex-col mt-10 gap-7 text-[#898989]">
              {sideBarItem.map((item, index) => (
                <Link
                  to={item.path}
                  key={index}
                  className={cn(
                    "flex cursor-pointer font-medium text-lg items-center"
                  )}
                  onClick={() => handleClick(item.path)}
                >
                  {item.icon}
                  <span className="ml-5">{item.title}</span>
                </Link>
              ))}
            </div>
            <div className="w-full h-[0.05rem] bg-[#898989] mt-10" />
            <div
              className="flex mt-7 flex-row text-[#898989] cursor-pointer font-medium text-lg items-center"
              onClick={handleLogoutUser}
            >
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
