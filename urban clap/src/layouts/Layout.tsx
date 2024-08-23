import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="add-form" style={{ width: "81%", marginTop: '5%' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
