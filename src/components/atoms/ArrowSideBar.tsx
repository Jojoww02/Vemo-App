import React from "react";
import {
  IconSquareRoundedChevronLeftFilled,
  IconSquareRoundedChevronRightFilled,
} from "@tabler/icons-react";

interface Props {
  open: boolean;
}

const ArrowSideBar: React.FC<Props> = ({ open }: Props) => {
  return open ? (
    <IconSquareRoundedChevronLeftFilled size={45} />
  ) : (
    <IconSquareRoundedChevronRightFilled size={45} />
  );
};

export default ArrowSideBar;
