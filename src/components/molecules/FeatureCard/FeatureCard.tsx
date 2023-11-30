import gradient from "@/assets/dashboard/linear-gradient.svg";
import { useNavigate } from "react-router-dom";

interface IProps {
  image: string;
  title: string;
  path?: string;
}

export default function FeatureCard(props: IProps): JSX.Element {
  const { image, title, path = null } = props;
  const navigate = useNavigate()
  return (
    <div className="relative w-full md:w-1/2">
      <img
        src={image}
        alt=""
        className="rounded-3xl shadow-[4px_4px_7px_#00000040] w-full cursor-pointer"
        onClick={() => {
          path && navigate(path)
        }}
      />
      <img
        src={gradient}
        alt=""
        className="absolute -bottom-[1px] rounded-b-3xl w-full cursor-pointer"
        onClick={() => {
          path && navigate(path)
        }}
      />
      <h1 className="absolute text-4xl px-1 w-[80%] bottom-5 left-5 md:bottom-10 md:left-10 font-bold text-white cursor-pointer">
        {title}
      </h1>
    </div>
  );
}
