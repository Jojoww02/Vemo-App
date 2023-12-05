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
  RequestVehiclePage,
  NotificationPage,
  NotificationDetailsPage,
  ConfirmPasswordPage,
  UpdateProfile,
  ChangePasswordPage,
  VeriyOtpPage,
} from "@/pages";
import { RegisterPageMobile } from "@/mobile";

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
      path: APP.REGISTER_USER_PAGE,
      element: <RegisterPageMobile />,
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
        {
          path: APP.NOTIFICATION_PAGE,
          element: <NotificationPage />,
        },
        {
          path: APP.NOTIFICATION_DETAILS_PAGE,
          element: <NotificationDetailsPage />,
        },
        {
          path: APP.CONFIRMATION_PASSWORD_PAGE,
          element: <ConfirmPasswordPage />,
        },
        {
          path: APP.PROFILE_UPDATE_PAGE,
          element: <UpdateProfile />,
        },
        {
          path: APP.CHANGE_PASSWORD_PAGE,
          element: <ChangePasswordPage />,
        },
        {
          path: APP.VERIFY_OTP_PAGE,
          element: <VeriyOtpPage />,
        },
      ],
    },
  ],
};

const routes: RouteObject[] = [publicRoutes, authRoutes, privateRoutes];

export default routes;
