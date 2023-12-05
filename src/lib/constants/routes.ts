/* PAGES ROUTES */
export const NOT_FOUND_PAGE = "*";
export const INDEX_PAGE = "/";
export const LOGIN_PAGE = "/login";
export const REGISTER_USER_PAGE = "/register";
export const DASHBOARD_PAGE = "dashboard";
export const ABOUT_US_PAGE = "about-us";
export const LIST_VEHICLE_PAGE = "vehicles";
export const FORGOT_PASSWORD_REQUEST_PAGE = "/forgot-password";
export const PROFILE_PAGE = "/profile";
export const FORGOT_PASSWORD_PAGE = (token: string) => `/forgot-password/${token}`;
export const REGISTER_VEHICLE_PAGE = "/register-vehicle";
export const REQUEST_MAINTENANCE_VEHICLE_PAGE = "/request-maintenance";
export const VEHICLE_DETAIL_PAGE = "/vehicles/details";
export const NOTIFICATION_PAGE = "/notification";
export const NOTIFICATION_DETAILS_PAGE = "/notification/detail";
export const UPDATE_PROFILE_PAGE = "/profile/update";
export const VERIFY_PASSWORD_PAGE = "/verify-password";
export const VERIFY_OTP_PAGE = "/otp";
export const CHANGE_PASSWORD_PAGE = "/change-password";

/* AUTH SERVICES */
export const LOGIN_SERVICE = "auth/login";
export const REGISTER_SERVICE = "auth/register";
export const REFRESH_TOKEN_SERVICE = "auth/refresh-token";
export const SEND_OTP_SERVICE =  (email: string) => `auth/otp?email=${email}`;
export const VERIFY_OTP_SERVICE = (otp: number) => `auth/otp/verify?otp=${otp}`;
export const FORGOT_PASSWORD_SERVICE = "auth/forgot-password";
export const FORGOT_PASSWORD_REQUEST_SERVICE = "auth/forgot-password/request";
export const LOGOUT_SERVICE = "auth/logout";

/* USERS SERVICES */
export const UPDATE_USER_SERVICE = "users";
export const GET_CURRENT_USER_SERVICE = "users/me";
export const VERIFY_PASSWORD_USER_SERVICE = (password: string) => `users/password/verify?password=${password}`;

/* VEHICLE SERVICE */
export const REGISTER_VEHICLE_SERVICE = "vehicles";
