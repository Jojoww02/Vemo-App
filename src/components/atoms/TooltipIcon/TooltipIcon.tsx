import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IProps {
  children: React.ReactNode;
  text: string;
}

export default function TooltipIcon(props: IProps): JSX.Element {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{props.children}</TooltipTrigger>
        <TooltipContent>{props.text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
