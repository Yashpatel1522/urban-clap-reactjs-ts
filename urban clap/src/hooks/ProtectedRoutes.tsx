import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = (props: {
  element: JSX.Element;
  allowedRoles: Array<string>;
}) => {
  const credentialsReduxData = useSelector(
    (state: { credentials: { credentials: Record<string, unknown> } }) =>
      state.credentials.credentials
  );

  let role: string = "";

  if (credentialsReduxData.refresh == undefined) {
    return <Navigate to="/signin" />;
  }

  if (credentialsReduxData?.is_superuser) {
    role = "admin";
  } else if (credentialsReduxData?.is_staff) {
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
