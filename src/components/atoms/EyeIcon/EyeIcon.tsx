import { IconEye, IconEyeOff } from "@tabler/icons-react";

interface Props {
  open: boolean;
  className?: string;
  onClick?: () => void;
}

export default function EyeIcon({
  open,
  className = "",
  onClick,
}: Props): JSX.Element {
  return (
    <div className={className} onClick={onClick}>
      {open ? <IconEye /> : <IconEyeOff />}
    </div>
  );
}
