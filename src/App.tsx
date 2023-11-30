import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/templates/Layout/Layout";
import {
  DashboardPage,
  ListVehiclesPage,
  ProfilePage,
  HomePage,
  LoginPage,
  ForgotPasswordPage,
} from "@/pages";
import { PrivateRoute } from "./components/templates";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/forgot-password/request"
          element={<ForgotPasswordPage />}
        />
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/vehicles" element={<ListVehiclesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
