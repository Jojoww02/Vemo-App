import { ButtonProps, Button as _Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface IButtonProps extends ButtonProps {
  children: any;
  className?: string;
  to?: string;
}

export default function Button({
  children,
  className,
  to = "",
  ...rest
}: IButtonProps): JSX.Element {
  return (
    <Link to={to}>
      <_Button {...rest} className={"bg-[#F4B400] hover:bg-[#F4B400]/80"}>
        {children}
      </_Button>
    </Link>
  );
}
