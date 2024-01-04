import "./AdminDashboardPage.scss";
import {
  ActifityVehicleCard,
  ActiveUsersCard,
  PendingVehicleCard,
  RequestedMaintenanceVehicleCard,
  TypeVehicleCard,
} from "./AdminDashboardCards";

export default function AdminDashboardPage() {
  return (
    <main className="wrapper mb-10">
      <div className="box1">
        <ActiveUsersCard />
      </div>
      <div className="box2">
        <PendingVehicleCard />
      </div>
      <div className="box3">
        <RequestedMaintenanceVehicleCard />
      </div>
      <div className="box4">
        <TypeVehicleCard />
      </div>
      <div className="box5">
        <ActifityVehicleCard />
      </div>
    </main>
  );
}
