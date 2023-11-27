import * as React from "react";
import { cn } from "@/lib/utils";

import ArrowSideBar from "../../atoms/ArrowSideBar";

const SideNav: React.FC = () => {
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
        <ArrowSideBar open={isOpen} />
      </div>
    </div>
  );
};

export default SideNav;
