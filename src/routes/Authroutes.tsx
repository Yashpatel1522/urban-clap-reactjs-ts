import CheckUserLogin from "../components/common/CheckUserLogin";
import NotFound from "../pages/Authentication/Notfound/NotFound";
import Forgetpassword from "../pages/Authentication/forgetpassword/Forgetpassword";
import Resetpassword from "../pages/Authentication/forgetpassword/Resetpassword";
import Login from "../pages/Authentication/login/Login";
import Hanldelogout from "../pages/Authentication/logout/Hanldelogout";
import Registration from "../pages/Authentication/registration/Registation";

export const authroute: Array<{
  path: string;
  element: JSX.Element;
}> = [
  {
    path: "/signin",
    element: <CheckUserLogin element={<Login />} />,
  },
  {
    path: "/signup",
    element: <Registration />,
  },
  {
    path: "/forget-password",
    element: <Forgetpassword />,
  },
  {
    path: "/reset_password",
    element: <Resetpassword />,
  },
  {
    path: "/logout",
    element: <Hanldelogout />,
  },
  {
    path: "/unauthorised",
    element: <NotFound />,
  },
];
