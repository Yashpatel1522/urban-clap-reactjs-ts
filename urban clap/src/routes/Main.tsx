import { authroute } from "./Authroutes";
import { AuthProvider } from "../hooks/UseAuth";
import { useRoutes } from "react-router-dom";
import { ProtectedRoutes } from "../hooks/ProtectedRoutes";
import Layout from "../layouts/Layout";
import "bootstrap/dist/css/bootstrap.css";
import servicesRoutes from "./Serviceprovider";
import Admin from "./Admin";
import "../pages/customers/showservices.css";
import Customer from "./Customer";
import React from "react";
import NotFound from "../pages/Authentication/Notfound/NotFound";
import { ProtectedRoutesMain } from "../hooks/ProtectedRoutesMain";
const Main = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <ProtectedRoutesMain
          element={<Layout />}
          allowedRoles={["admin", "sp", "user"]}
        ></ProtectedRoutesMain>
      ),
      children: [...servicesRoutes, ...Admin, ...Customer],
    },
    ...authroute,
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <AuthProvider>
      <React.Fragment>{routes}</React.Fragment>
    </AuthProvider>
  );
};

export default Main;
