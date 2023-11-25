import { Outlet } from "react-router-dom";
import { SideNav, TopBar } from "../organisms";

export default function Layout() {
  return (
    <main className="2xl:container h-screen flex px-4">
      <div className="flex w-full h-full gap-4">
        <SideNav />
        <div className="mt-5 w-full relative overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-100">
          <TopBar />
          <div className="bg-violet-400 h-full rounded">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
}
