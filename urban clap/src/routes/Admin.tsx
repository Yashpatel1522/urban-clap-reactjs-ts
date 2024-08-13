import { ProtectedRoutes } from "../hooks/ProtectedRoutes";
import Reports from "../pages/admin/Reports";
import ServiceProviders from "../pages/admin/ServiceProviders";
import ShowCustomers from "../pages/admin/ShowCustomers";

const Admin: Array<{
  path: string;
  element: JSX.Element;
}> = [
  {
    path: "/serviceproviders",
    element: (
      <ProtectedRoutes
        element={<ServiceProviders />}
        allowedRoles={["admin"]}
      />
    ),
  },
  {
    path: "/customers",
    element: (
      <ProtectedRoutes element={<ShowCustomers />} allowedRoles={["admin"]} />
    ),
  },
  {
    path: "/reports",
    element: <ProtectedRoutes element={<Reports />} allowedRoles={["admin"]} />,
  },
];

export default Admin;
