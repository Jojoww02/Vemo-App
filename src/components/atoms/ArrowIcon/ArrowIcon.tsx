import {
  IconSquareRoundedChevronLeftFilled,
  IconSquareRoundedChevronRightFilled,
} from "@tabler/icons-react";

interface Props {
  open: boolean;
  className?: string;
  onClick?: () => void;
}

export default function ArrowIcon({ open, className = "", onClick }: Props) {
  return (
    <div className={className} onClick={onClick}>
      {open ? (
        <IconSquareRoundedChevronLeftFilled size={40} />
      ) : (
        <IconSquareRoundedChevronRightFilled size={40} />
      )}
    </div>
  );
}
