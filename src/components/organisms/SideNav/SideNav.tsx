import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowIcon } from "@/components/atoms";
import { Separator } from "@/components/ui/separator";
import {
  IconLayoutBoard,
  IconUserFilled,
  IconHistory,
  IconInfoSquareRoundedFilled,
  IconLogout2,
} from "@tabler/icons-react";
import IconVemo from "../../../assets/iconVemo.svg";

export default function SideNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div
      className={cn(
        "relative hidden lg:block rounded-3xl my-5 ml-5 border-2 shadow-md p-5 pt-8 duration-300 w-24 z-50",
        isOpen && "w-72"
      )}
    >
      <ArrowIcon
        open={isOpen}
        className="absolute -right-6 top-16 cursor-pointer bg-white text-[#898989]"
        onClick={() => setIsOpen(!isOpen)}
      />
      <img
        src={IconVemo}
        alt="icon vemo"
        width={40}
        className="absolute left-7"
      />
      <Separator className="w-full flex mt-16 bg-[#898989]" />
      <div className="flex-col absolute flex mt-7 left-7 gap-7">
        <IconLayoutBoard
          size={35}
          style={{ color: "#898989", cursor: "pointer" }}
        />
        <IconUserFilled
          size={35}
          style={{ color: "#898989", cursor: "pointer" }}
        />
        <IconHistory
          size={35}
          style={{ color: "#898989", cursor: "pointer" }}
        />
        <IconInfoSquareRoundedFilled
          size={35}
          style={{ color: "#898989", cursor: "pointer" }}
        />
      </div>
      <div className="flex absolute bottom-10 left-6">
        <IconLogout2
          size={35}
          style={{ color: "#898989", cursor: "pointer" }}
        />
      </div>
    </div>
  );
}
