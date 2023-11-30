import { Routes, Route } from "react-router-dom";
import Layout from "./components/templates/Layout/Layout";
import { DashboardPage, ListVehiclesPage, ProfilePage, HomePage, LoginPage, } from "@/pages";

export default function App() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/vehicles" element={<ListVehiclesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}
