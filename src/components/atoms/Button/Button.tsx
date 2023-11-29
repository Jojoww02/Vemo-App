import { ButtonProps, Button as _Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
interface Props extends ButtonProps {
  children: any;
  className?: string;
}

export default function Button({
  children,
  className,
  ...rest
}: Props): JSX.Element {
  return (
    <_Button {...rest} className={cn("bg-primary hover:bg-primary/80", className)}>
      {children}
    </_Button>
  );
}
