// import { Dashboard } from "@mui/icons-material";
import ShowServices from "../pages/customers/ShowServices";
import ShowReviews from "../pages/customers/ShowReviews";
import AddAppointment from "../pages/customers/AddAppointment";
import AppointmentStatus from "../pages/customers/AppointmentStatus";
import AddReview from "../pages/customers/AddReview";
import { ProtectedRoutes } from "../hooks/ProtectedRoutes";

const Customer: Array<{
  path: string;
  element: JSX.Element;
}> = [
    {
      path: "/all-services",
      element: (
        <ProtectedRoutes
          element={<ShowServices />}
          allowedRoles={["admin", "user"]}
        />
      ),
    },
    {
      path: "/book-appointment",
      element: (
        <ProtectedRoutes
          element={<AddAppointment />}
          allowedRoles={["admin", "user"]}
        />
      ),
    },
    {
      path: "/status",
      element: (
        <ProtectedRoutes
          element={<AppointmentStatus />}
          allowedRoles={["admin", "user"]}
        />
      ),
    },
    {
      path: "/reviews",
      element: (
        <ProtectedRoutes
          element={<ShowReviews />}
          allowedRoles={["admin", "user"]}
        />
      ),
    },
    {
      path: "/addreview",
      element: (
        <ProtectedRoutes
          element={<AddReview />}
          allowedRoles={["admin", "user"]}
        />
      ),
    },
  ];

export default Customer;
