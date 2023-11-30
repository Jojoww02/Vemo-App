import { ButtonProps, Button as _Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/style";
import { IconLoader2 } from "@tabler/icons-react";
interface Props extends ButtonProps {
  children: any;
  className?: string;
  to?: string;
  isLoading?: boolean;
}

export default function Button({
  children,
  className,
  isLoading,
  ...otherProps
}: Props): JSX.Element {
  return (
    <_Button
      {...otherProps}
      className={cn("bg-primary hover:bg-primary/80", className)}
      disabled={isLoading ? true : otherProps.disabled}
    >
      <span className="flex justify-center items-center">
        {isLoading && <IconLoader2 className="animate-spin mx-2" />}
        {children}
      </span>
    </_Button>
  );
}
