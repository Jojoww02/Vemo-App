import { IconLock, IconLogout2, IconMailFilled, IconPencil, IconUser } from "@tabler/icons-react";
import UserProfileIcon from "../../assets/profile/user-profile-icon.svg";

export default function ProfilePage(): JSX.Element {
  return (
    <div className="md:w-[640px] md:mx-auto">
      <div className="flex-col flex ">
        <div className="flex flex-col items-center pt-5 gap-8">
          <h1 className="font-semibold text-4xl">Profile</h1>
          <img src={UserProfileIcon} alt="" className="w-20 xs:w-28 md:w-36 lg:w-40" />
          <button type="button" className="flex mt-3 text-[#0586BE] gap-2 items-center">
            <IconPencil />
            <span className="font-medium text-lg  sm:text-xl">Update Profile</span>
          </button>
        </div>
      </div>
      <div className="px-4 xs:px-0">
        <div className="flex flex-col pt-5">
          <h1 className="font-semibold text-2xl xs:text-3xl border-b pb-2 ">My Information</h1>
        </div>
        <div className="flex-col  mt-5 lg:relative">
          <div className="flex justify-between">
            <p className="font-semibold text-xl md:text-2xl ">Biodata</p>
          </div>
          <div className="flex justify-between">
            <button type="button" className="flex items-center space-x-3 mt-5 font-normal text-xl cursor-default">
              <span>
                <IconUser style={{ fontSize: "1.5rem" }} />
              </span>
              <span className="mt-1 text-lg md:text-2xl">Name</span>
            </button>
          </div>
          <p className="mt-1 text-sm md:text-xl">Putra Eka Satrya</p>
          <button type="button" className="flex items-center space-x-3 mt-7 font-normal text-lg cursor-default">
            <span>
              <IconMailFilled style={{ fontSize: "1rem" }} />
            </span>
            <p className="md:text-2xl">Email</p>
          </button>
          <p className="mt-1 md:text-xl">putraekasatrya@email.com</p>
          <div className="absolute bottom-10 lg:right-0 lg:top-0 bg-white">
            <button type="button" className="flex text-[#0586BE] gap-2 items-center">
              <IconLock />
              <span className=" text-sm ">Change Password</span>
            </button>
            <button
              type="button"
              className="mt-3 flex gap-2  items-center"
              onClick={() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.reload();
              }}
            >
              <IconLogout2 style={{ fontSize: "1.3rem" }} />
              <span className="font-medium text-sm">Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
