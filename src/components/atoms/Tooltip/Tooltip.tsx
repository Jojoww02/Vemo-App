import React from "react";
import {
  Tooltip as _Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IProps {
  children: React.ReactNode;
  text: string;
  open?: boolean;
}

export default function Tooltip(props: IProps): JSX.Element {
  return (
    <TooltipProvider>
      <_Tooltip open={props.open}>
        <TooltipTrigger>{props.children}</TooltipTrigger>
        <TooltipContent className="bg-slate-600 hidden lg:block">
          {props.text}
        </TooltipContent>
      </_Tooltip>
    </TooltipProvider>
  );
}
