import Forgetpassword from "../pages/Authentication/forgetpassword/Forgetpassword";
import Resetpassword from "../pages/Authentication/forgetpassword/Resetpassword";
import Login from "../pages/Authentication/login/Login";
import Registration from "../pages/Authentication/registration/Registation";

export const authroute = [
  {
    path: "/signin",
    element: <Login />,
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
];
