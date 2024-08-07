import { authroute } from "./Authroutes";
import { AuthProvider } from "../hooks/UseAuth";
import { useRoutes } from "react-router-dom";
import { ProtectedRoutes } from "../hooks/ProtectedRoutes";
import Layout from "../layouts/Layout";

const Main = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <ProtectedRoutes element={<Layout />}></ProtectedRoutes>,
      // children: [...servicesRoutes, ...Customer, ...Admin],
    },
    ...authroute,
  ]);
  return (
    <AuthProvider>
      <>{routes}</>
    </AuthProvider>
  );
};

export default Main;
