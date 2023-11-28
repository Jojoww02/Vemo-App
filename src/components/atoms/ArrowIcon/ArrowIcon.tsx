import {
  IconSquareRoundedChevronLeftFilled,
  IconSquareRoundedChevronRightFilled,
} from "@tabler/icons-react";

interface IProps {
  open: boolean;
}

export default function ArrowIcon({ open }: IProps) {
  return open ? (
    <IconSquareRoundedChevronLeftFilled size={40} />
  ) : (
    <IconSquareRoundedChevronRightFilled size={40} />
  );
}
