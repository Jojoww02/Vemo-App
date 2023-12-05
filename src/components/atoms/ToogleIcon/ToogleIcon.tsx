import React from "react";
import { cn } from "@/lib/utils/style";

interface Props {
  isOpen?: boolean;
  className?: string;
  iconOpen: React.ReactNode;
  iconClose: React.ReactNode;
  onClick?: () => void;
}

export default function ToogleIcon({
  isOpen,
  className = "",
  iconOpen,
  iconClose,
  onClick,
}: Props): JSX.Element {
  return (
    <div className={cn("cursor-pointer", className)} onClick={onClick}>
      {!isOpen ? iconOpen : iconClose}
    </div>
  );
}
