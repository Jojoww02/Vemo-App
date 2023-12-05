import { Outlet } from "react-router-dom";
import { SideNav, TopBar } from "@/components/organisms";

export default function Layout() {
  return (
    <main className="2xl:container h-screen flex lg:px-4">
      <div className="flex w-full h-full gap-4">
        <SideNav />
        <div className="lg:mt-5 w-full relative overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-100">
          <TopBar />
          <div className="xs:w-[480px] xs:mx-auto md:w-full md:px-8">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
}