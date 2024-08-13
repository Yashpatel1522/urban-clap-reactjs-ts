import { Navigate } from "react-router-dom";

export const ProtectedRoutes = (props: {
  element: JSX.Element;
  allowedRoles: Array<string>;
}) => {
  const user: Record<string, unknown> = JSON.parse(
    localStorage.getItem("creads") ?? "[]"
  );

  let role: string = "";

  if (user.refresh == undefined) {
    return <Navigate to="/signin" />;
  }

  if (user?.is_superuser) {
    role = "admin";
  } else if (user?.is_staff) {
    role = "sp";
  } else {
    role = "user";
  }

  if (props.allowedRoles != undefined && role != "") {
    if (!props.allowedRoles.includes(role)) {
      return <Navigate to="/unauthorised" />;
    }
  }
  return props.element;
};
