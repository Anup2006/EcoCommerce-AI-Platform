import { Outlet } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout.jsx";

export default function App() {

  return (
    <div className="app">
      <DashboardLayout>
        <Outlet/>
      </DashboardLayout>
    </div>
  );
}