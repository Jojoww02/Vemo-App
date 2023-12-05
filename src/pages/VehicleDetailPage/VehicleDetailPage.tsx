import useMobileResponsive from "@/hooks/useMobileResponsive";
import { VehicleDetailPageMobile } from "@/mobile";
import React from "react";

export default function VehicleDetailPage() {
  const isMobileResponsive = useMobileResponsive();
  return <>{isMobileResponsive ? <div>VehicleDetailPage</div> : <VehicleDetailPageMobile />}</>;
}
