import { ProtectedRoutes } from "../hooks/ProtectedRoutes";
import Profiles from "../pages/Authentication/Profiles";
import Notification from "../pages/customers/Notifications";
import Addcategory from "../pages/serviceproviders/Addcategory";
import Addservices from "../pages/serviceproviders/Addservices";
import Addslot from "../pages/serviceproviders/Addslot";
import Appointment from "../pages/serviceproviders/Appointment";
import Category from "../pages/serviceproviders/Category";
import Dashboard from "../pages/serviceproviders/Dashboard";
import Showservices from "../pages/serviceproviders/Showservices";
import Slot from "../pages/serviceproviders/Slot";

const servicesRoutes: Array<{
  path: string;
  element: JSX.Element;
}> = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoutes element={<Dashboard />} allowedRoles={["sp", "admin"]} />
    ),
  },
  {
    path: "/addservices",
    element: (
      <ProtectedRoutes
        element={<Addservices />}
        allowedRoles={["sp", "admin"]}
      />
    ),
  },
  {
    path: "/services",
    element: (
      <ProtectedRoutes
        element={<Showservices />}
        allowedRoles={["sp", "admin", "user"]}
      />
    ),
  },
  {
    path: "/category",
    element: (
      <ProtectedRoutes element={<Category />} allowedRoles={["sp", "admin"]} />
    ),
  },
  {
    path: "/addcategory",
    element: (
      <ProtectedRoutes
        element={<Addcategory />}
        allowedRoles={["sp", "admin"]}
      />
    ),
  },
  {
    path: "/appointment",
    element: (
      <ProtectedRoutes
        element={<Appointment />}
        allowedRoles={["sp", "admin"]}
      />
    ),
  },
  {
    path: "/slot",
    element: (
      <ProtectedRoutes element={<Slot />} allowedRoles={["sp", "admin"]} />
    ),
  },
  {
    path: "/addslot",
    element: (
      <ProtectedRoutes element={<Addslot />} allowedRoles={["sp", "admin"]} />
    ),
  },
  {
    path: "/notification",
    element: (
      <ProtectedRoutes
        element={<Notification />}
        allowedRoles={["sp", "admin", "user"]}
      />
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoutes element={<Profiles />} allowedRoles={["sp", "admin","user"]} />
    ),
  },
];

export default servicesRoutes;
