import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowIcon } from "@/components/atoms";
import { Separator } from "@/components/ui/separator";
import { IconLayoutBoard, IconUserFilled, IconHistory, IconInfoSquareRoundedFilled, IconLogout2 } from "@tabler/icons-react";
import IconVemo from "../../../assets/iconVemo.svg";

export default function SideNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div
      className={cn(
        "relative rounded-3xl my-5 ml-5 border-2 shadow-md p-5 pt-8 duration-300 w-24 z-50",
        isOpen && "w-72"
      )}
    >
      <div
        className="absolute -right-6 top-16 cursor-pointer bg-white text-[#898989]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ArrowIcon open={isOpen} />
      </div>
      <div className="absolute left-6">
        <img src={IconVemo} alt="" className="w-[80%]" />
      </div>
      <Separator className="w-full flex mt-20 bg-[#898989]"/>
      {/* icon */}
      <div className="flex-col absolute flex mt-7 left-6 gap-7">
          <IconLayoutBoard size={35} style={{ color: "#898989", cursor: "pointer" }}/>
          <IconUserFilled size={35} style={{ color: "#898989", cursor: "pointer" }}/>
          <IconHistory size={35} style={{ color: "#898989", cursor: "pointer" }}/>
          <IconInfoSquareRoundedFilled size={35} style={{ color: "#898989", cursor: "pointer" }}/>
      </div>
      <div className="flex absolute bottom-10 left-5">
        <IconLogout2 size={35} style={{ color: "#898989", cursor: "pointer" }}/>
      </div>
    </div>
  );
}
