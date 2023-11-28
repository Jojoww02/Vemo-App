import { ButtonProps, Button as _Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Props extends ButtonProps {
  children: any;
  className?: string;
  to?: string;
}

export default function Button({
  children,
  className,
  to = "",
  ...rest
}: Props): JSX.Element {
  return (
    <_Button {...rest} className={"bg-[#F4B400] hover:bg-[#F4B400]/80"}>
      {children}
    </_Button>
  );
}
