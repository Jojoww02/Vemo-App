import { IVehicleStatus } from "@/api/types";

/* CUSTOMER PAGES ROUTES */
export const NOT_FOUND_PAGE = "*";
export const INDEX_PAGE = "/";
export const LOGIN_PAGE = "/login";
export const REGISTER_USER_PAGE = "/register";
export const DASHBOARD_PAGE = "/dashboard";
export const ABOUT_US_PAGE = "/about/vemo";
export const VEHICLE_LIST_PAGE = "/vehicles";
export const VEHICLE_PARTS_PAGE = "/vehicles/parts";
export const REGISTER_VEHICLE_PAGE = "/vehicles/register";
export const VEHICLE_DETAILS_PAGE = (vehicleId: string) => `/vehicles/details/${vehicleId}`;
export const REQUEST_MAINTENANCE_VEHICLE_PAGE = "/request-maintenance"; // -> nanti ganti
export const FORGOT_PASSWORD_REQUEST_PAGE = "/forgot-password";
export const FORGOT_PASSWORD_PAGE = (token: string) => `/forgot-password/${token}`; // -> perlu ganti (?)
export const PROFILE_PAGE = "/profile";
export const UPDATE_PROFILE_PAGE = "/profile/update";
export const CHANGE_PASSWORD_PAGE = "/profile/update/password";
export const NOTIFICATION_PAGE = "/notifications";
export const NOTIFICATION_DETAILS_PAGE = "/notifications/details"; // -> nanti ganti
export const VERIFY_PASSWORD_PAGE = "/verify/password";
export const VERIFY_OTP_PAGE = "/verify/otp";

/* ADMIN PAGES ROUTES */
const ADMIN_PAGE = "/admin";
export const ADMIN_DASHBOARD_PAGE = `${ADMIN_PAGE}/dashboard`;

/* AUTH SERVICES */
export const LOGIN_SERVICE = "auth/login";
export const REGISTER_SERVICE = "auth/register";
export const REFRESH_TOKEN_SERVICE = "auth/refresh-token";
export const SEND_OTP_SERVICE =  (email: string) => `auth/otp?email=${email}`;
export const VERIFY_OTP_SERVICE = (otp: number) => `auth/otp/verify?otp=${otp}`;
export const FORGOT_PASSWORD_SERVICE = "auth/forgot-password";
export const FORGOT_PASSWORD_REQUEST_SERVICE = (email: string) => `auth/forgot-password?email=${email}`;
export const LOGOUT_SERVICE = "auth/logout";

/* USERS SERVICES */
export const UPDATE_USER_SERVICE = "users";
export const GET_CURRENT_USER_SERVICE = "users/me";
export const VERIFY_PASSWORD_USER_SERVICE = (password: string) => `users/password/verify?password=${password}`;
export const CHANGE_PASSWORD_SERVICE = "users/password";

/* VEHICLE SERVICE */
export const REGISTER_VEHICLE_SERVICE = "vehicles";
export const GET_VEHICLES_BY_USERID_SERVICE = (userId: string) => `vehicles?userId=${userId}`;
export const GET_VEHICLE_BY_ID_SERVICE = (vehicleId: string | undefined) => `vehicles/${vehicleId}`;
export const GET_VEHICLES_BY_STATUS_SERVICE = (status: IVehicleStatus) => `vehicles/${status}`;
export const APPROVE_VEHICLE_SERVICE = "vehicles/approve";
