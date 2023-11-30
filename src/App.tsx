import { Routes, Route } from "react-router-dom";
import Layout from "./components/templates/Layout/Layout";
import { 
  DashboardPage, 
  ListVehiclesPage, 
  ProfilePage, 
  HomePage, 
  LoginPage, 
  ForgotPasswordPage, 
} from "@/pages";

export default function App() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password/request" element={<ForgotPasswordPage />} />
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/vehicles" element={<ListVehiclesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}
