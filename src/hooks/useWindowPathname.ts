import React from "react";
import { ADMIN_DASHBOARD_PAGE } from "@/lib/constants/routes";

export default function useWindowPathname() {
  const [isWindow] = React.useState(
    window.location.pathname !== ADMIN_DASHBOARD_PAGE &&
      typeof window !== "undefined"
  );
  return isWindow;
}
