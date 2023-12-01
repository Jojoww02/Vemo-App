import type { RouteObject } from "react-router-dom";
import * as APP from "@/lib/constants/routes";
import { AuthRouteGuard, PrivateRouteGuard } from "@/lib/guard";
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
} from "@/pages";

const publicRoutes: RouteObject = {
  children: [
    {
      path: APP.NOT_FOUND_PAGE,
      element: <NotFoundPage />,
    },
  ],
};

const authRoutes: RouteObject = {
  element: <AuthRouteGuard />,
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
  ],
};

const privateRoutes: RouteObject = {
  element: <PrivateRouteGuard />,
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

const routes: RouteObject[] = [publicRoutes, authRoutes, privateRoutes];

export default routes;
