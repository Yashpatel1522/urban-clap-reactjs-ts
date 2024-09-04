import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import { ProtectedRoutesMain } from "../hooks/ProtectedRoutesMain";

const Layout = () => {
  return (
    <div className="d-flex">
      <ProtectedRoutesMain element={<Sidebar />} allowedRoles={["admin", "user", "sp"]} />
      <div className="add-form" style={{ width: "81%", marginTop: '5%' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
