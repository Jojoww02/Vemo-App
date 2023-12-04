import type { RouteObject } from "react-router-dom";
import * as APP from "@/lib/constants/routes";
import { PrivateRoute } from "@/lib/guard";
import { Layout } from "@/components/templates";
import {
  HomePage,
  NotFoundPage,
  LoginPage,
  ForgotPasswordRequestPage,
  ForgotPasswordPage,
  DashboardPage,
  ListVehiclesPage,
  ProfilePage,
  RegisterVehiclePage,
  AboutPage,
  RequestVehiclePage,
} from "@/pages";

const publicRoute: RouteObject = {
  children: [
    {
      index: true,
      path: APP.INDEX_PAGE,
      element: <HomePage />,
    },
    {
      path: APP.LOGIN_PAGE,
      element: <LoginPage />,
    },
    {
      path: APP.FORGOT_PASSWORD_REQUEST_PAGE,
      element: <ForgotPasswordRequestPage />,
    },
    {
      path: APP.FORGOT_PASSWORD_PAGE(":token"),
      element: <ForgotPasswordPage />,
    },
    {
      path: APP.NOT_FOUND_PAGE,
      element: <NotFoundPage />,
    },
  ],
};

const privateRoute: RouteObject = {
  element: <PrivateRoute />,
  children: [
    {
      element: <Layout />,
      children: [
        {
          path: APP.DASHBOARD_PAGE,
          element: <DashboardPage />,
        },
        {
          path: APP.LIST_VEHICLE_PAGE,
          element: <ListVehiclesPage />,
        },
        {
          path: APP.PROFILE_PAGE,
          element: <ProfilePage />,
        },
        {
          path: APP.REQUEST_MAINTENANCE_VEHICLE_PAGE,
          element: <RequestVehiclePage />,
        },
        {
          path: APP.REGISTER_VEHICLE_PAGE,
          element: <RegisterVehiclePage />,
        },
        {
          path: APP.ABOUT_US_PAGE,
          element: <AboutPage />,
        },
      ],
    },
  ],
};

const routes: RouteObject[] = [publicRoute, privateRoute];

export default routes;
