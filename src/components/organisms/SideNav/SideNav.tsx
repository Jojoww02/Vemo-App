import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowIcon } from "@/components/atoms";
import { Separator } from "@/components/ui/separator";
import { IconLayoutBoard, IconUserFilled, IconHistory, IconInfoSquareRoundedFilled, IconLogout2 } from "@tabler/icons-react";
import IconVemo from "../../../assets/iconVemo.svg";

export default function SideNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const SideBarItem = [
    { title: "Dashboard" },
    { title: "Profile", icon: <IconUserFilled size={35} /> },
    { title: "Services", icon: <IconHistory size={35}/> },
    { title: "About Us",  icon: <IconInfoSquareRoundedFilled size={35} /> },
    { title: "Log Out", spacing: true, icon: <IconLogout2 size={35} /> }
  ] 
  return (
    <div
      className={cn(
        "relative hidden lg:block rounded-3xl my-5 ml-5 border-2 shadow-md p-5 pt-8 duration-300 w-24 z-50",
        isOpen && "w-72"
      )}
    >
      <div
        className="absolute -right-6 top-16 cursor-pointer bg-white text-[#898989]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ArrowIcon open={isOpen} />
      </div>
      <div className="items-center">
        <div className="absolute left-6">
          <img src={IconVemo} alt="" className="w-[80%]" />
        </div>
        <div className={cn(
          "absolute left-20",
          !isOpen && "hidden"
          )}
        >
          <h1 className="text-2xl font-semibold italic text-[#F4B400]">VEMO</h1>
          <p className="text-[0.75rem] font-medium text-[#1E1E1E]">The best place for your vehicle</p>
        </div>
      </div>
      
      <Separator className="w-full flex mt-20 bg-[#898989]"/>
      {/* icon */}
      <div className="flex-col absolute flex mt-7 left-6 gap-7">
          {SideBarItem.map(( item, index ) => (
            <>
              <div key={index} className={cn(
                "cursor-pointer font-medium text-[#898989] text-lg flex items-center",
                item.spacing && "mt-40"
                )}
              >
                {item.icon ? item.icon : <IconLayoutBoard size={35}/> }
                <span className={cn(
                  "ml-5",
                  !isOpen && "hidden"
                  )}
                >
                  {item.title}
                </span>
              </div>
            </>
          ))}
      </div>
    </div>
  );
}
