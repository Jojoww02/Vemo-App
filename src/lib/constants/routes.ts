import { IVehicleStatus } from "@/api/types";

/* CUSTOMER PAGES ROUTES */
export const NOT_FOUND_PAGE = "*";
export const INDEX_PAGE = "/";
export const LOGIN_PAGE = "/login";
export const REGISTER_USER_PAGE = "/register";
export const DASHBOARD_PAGE = "/dashboard";
export const ABOUT_US_PAGE = "/about/vemo";
export const VEHICLE_LIST_PAGE = "/vehicles";
export const VEHICLE_PARTS_PAGE = (vehicleId: string | undefined) => `/vehicles/${vehicleId}/parts`;
export const REGISTER_VEHICLE_PAGE = "/vehicles/register";
export const VEHICLE_DETAILS_PAGE = (vehicleId: string) => `/vehicles/details/${vehicleId}`;
export const REQUEST_MAINTENANCE_VEHICLE_PAGE = "/vehicles/maintenance/request"; // -> nanti ganti
export const FORGOT_PASSWORD_REQUEST_PAGE = "/forgot-password";
export const FORGOT_PASSWORD_PAGE = (token: string) => `/forgot-password/${token}`; // -> perlu ganti (?)
export const PROFILE_PAGE = "/profile";
export const UPDATE_PROFILE_PAGE = "/profile/update";
export const CHANGE_PASSWORD_PAGE = "/profile/update/password";
export const NOTIFICATION_PAGE = "/notifications";
export const NOTIFICATION_DETAILS_PAGE = (notificationId: string) => `/notifications/${notificationId}`;
export const VERIFY_PASSWORD_PAGE = "/verify/password";
export const VERIFY_OTP_PAGE = "/verify/otp";

/* ADMIN PAGES ROUTES */
const ADMIN_PAGE = "/admin";
export const ADMIN_DASHBOARD_PAGE = `${ADMIN_PAGE}/dashboard`;
export const ADMIN_APPROVE_MAINTENANCE_PAGE = `${ADMIN_PAGE}/maintenances`;
export const ADMIN_VEHICLES = `${ADMIN_PAGE}/vehicles/pending`;
export const ADMIN_DETAILS_MAINTENANCE_VEHICLE_PAGE = (vehicleId: string | undefined) => `${ADMIN_PAGE}/maintenances/${vehicleId}`;

// ========================================================================================================================================

/* AUTH SERVICES */
export const LOGIN_SERVICE = "auth/login";
export const REFRESH_TOKEN_SERVICE = (accessToken: string | null) => `auth/refresh?accessToken=${accessToken}`;
export const VERIFY_PASSWORD_USER_SERVICE = (password: string) => `auth/password?verify=${password}`;
export const FORGOT_PASSWORD_REQUEST_SERVICE = (email: string) => `auth/password/reset?email=${email}`;
export const FORGOT_PASSWORD_SERVICE = "auth/password/reset";
export const SEND_OTP_SERVICE = (email: string) => `auth/otp?email=${email}`;
export const VERIFY_OTP_SERVICE = (otp: number) => `auth/otp?verify=${otp}`;
export const LOGOUT_SERVICE = "auth/logout";

/* USERS SERVICES */
export const REGISTER_USER_SERVICE = "users";
export const UPDATE_USER_SERVICE = "users";
export const GET_CURRENT_USER_SERVICE = "users/me";
export const CHANGE_PASSWORD_SERVICE = "users/password";
export const UPDATE_PHOTO_PROFILE_SERVICE = "users/photo";
export const GET_ACTIVE_USERS = "/users/active";

/* VEHICLE SERVICE */
export const REGISTER_VEHICLE_SERVICE = "vehicles";
export const GET_VEHICLES_BY_USERID_SERVICE = (userId: string) => `vehicles?userId=${userId}`;
export const GET_VEHICLES_BY_STATUS_SERVICE = (status: IVehicleStatus) => `vehicles?status=${status}`;
export const GET_VEHICLE_BY_ID_SERVICE = (vehicleId: string | undefined) => `vehicles/${vehicleId}`;
export const APPROVE_VEHICLE_SERVICE = (vehicleId: string | undefined) => `vehicles/approve/${vehicleId}`;
export const REQUEST_MAINTENANCE_SERVICE = "vehicles/maintenance";
export const GET_PARTS_BY_VEHICLEID = (vehicleId: string | undefined) => `vehicles/parts?vehicleId=${vehicleId}`;
export const ADMIN_COUNT_VEHICLES = "/vehicles/count";

/* NOTIFICATION SERVICE */
export const GET_NOTIFICATIONS_SERVICE = "notifications";
export const GET_COUNT_UNREAD_NOTIFICATIONS_SERVICE = "notifications?count=true&unread=true";
export const READ_NOTIFICATION_SERVICE = "notifications/read";
export const DELETE_NOTIFICATIONS_SERVICE = "notifications";
export const GET_NOTIFICATIONS_DETAILS_SERVICE = (notificationId: string | undefined) => `notifications/${notificationId}`;
