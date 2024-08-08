import Reports from "../pages/admin/Reports";
import ServiceProviders from "../pages/admin/ServiceProviders";
import ShowCustomers from "../pages/admin/ShowCustomers";

const Admin = [
  {
    path: "/serviceproviders",
    element: <ServiceProviders />,
  },
  {
    path: "/customers",
    element: <ShowCustomers />,
  },
  {
    path: "/reports",
    element: <Reports />,
  },
];

export default Admin;
