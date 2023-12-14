import { Link } from "react-router-dom";
import { Button } from "@/components/atoms";
import { LOGIN_PAGE, REGISTER_USER_PAGE } from "@/lib/constants/routes";
import LandingImage from "../../assets/homeLanding/landing-image.webp";
import GradientWhiteMobile from "../../assets/homeLanding/linear-gradient-white-mobile.svg";

export default function HomePageMobile(): JSX.Element {
  return (
    <div className="w-full h-screen relative overflow-y-hidden">
      <div className="relative top-0 sm:hidden">
        <img src={LandingImage} alt="" className="w-full" />
      </div>
      <div className="flex flex-col items-center sm:grid sm:place-items-center text-dark text-center sm:bg-[url('/src/assets/homeLanding/landing-image.webp')] sm:bg-cover sm:h-full sm:relative">
        <div className="hidden sm:block sm:absolute sm:w-full sm:h-screen sm:top-0 sm:left-0 sm:bg-black sm:bg-opacity-30"></div>
        <div className="w-full absolute bottom-0">
          <div>
            <img
              src={GradientWhiteMobile}
              alt=""
              className="w-full sm:hidden"
            />
          </div>
          <div className="w-full bg-white py-8 -mt-1 sm:hidden">
            <h1 className="text-5xl font-bold sm:hidden">Welcome!</h1>
            <p className="text-xl font-medium my-2 sm:text-2xl sm:hidden">to</p>
            <div className="flex items-center justify-center gap-2 mb-12 sm:hidden">
              <img src="/src/assets/iconVemo.svg" alt="" className="w-[15%]" />
              <h3 className="text-2xl font-semibold text-primary italic sm:text-3xl">
                VEMO
              </h3>
            </div>
            <div className="sm:hidden w-full px-10 flex flex-col gap-3 mb-4">
              <Button asChild className="py-6 text-lg font-semibold">
                <Link to={REGISTER_USER_PAGE} className="w-full">
                  Register
                </Link>
              </Button>
              <Button
                asChild
                className="py-6 text-lg font-semibold bg-dark hover:bg-dark/80"
              >
                <Link to={LOGIN_PAGE} className="w-full">
                  Log In
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex sm:flex-col sm:justify-evenly sm:items-center sm:bg-white sm:z-10 sm:pt-10 sm:w-1/2 sm:rounded-[2rem]">
          <div>
            <h1 className="text-5xl font-bold mt-5 ">Welcome!</h1>
            <p className="text-xl font-medium my-2 sm:text-3xl">to</p>
            <div className="flex items-center justify-center mb-12">
              <img src="/src/assets/iconVemo.svg" alt="" className="w-[27%]" />
              <h3 className="text-2xl font-semibold text-primary italic sm:text-3xl">
                VEMO
              </h3>
            </div>
            <div className="flex flex-col gap-3 mb-12">
              <Button asChild className="py-6 text-lg font-semibold">
                <Link to={REGISTER_USER_PAGE} className="w-full">
                  Register
                </Link>
              </Button>
              <Button
                asChild
                className="py-6 text-lg font-semibold bg-dark hover:bg-dark/80"
              >
                <Link to={LOGIN_PAGE} className="w-full">
                  Log In
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
