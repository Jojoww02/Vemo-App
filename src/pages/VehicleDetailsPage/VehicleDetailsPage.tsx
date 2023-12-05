import useMobile from "@/hooks/useMobile";
import { VehicleDetailPageMobile } from "@/mobile";

export default function VehicleDetailsPage() {
  const isMobileResponsive = useMobile();
  return <>{isMobileResponsive ? <div>VehicleDetailPage</div> : <VehicleDetailPageMobile />}</>;
}
