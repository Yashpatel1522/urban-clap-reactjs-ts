import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CheckUserLogin = (props: { element: JSX.Element }) => {
  const navigate = useNavigate();
  const credentialsReduxData = useSelector(
    (state: { credentials: { credentials: Record<string, unknown> } }) =>
      state.credentials.credentials
  );

  useEffect(() => {
    if (credentialsReduxData?.is_superuser || credentialsReduxData?.is_staff) {
      navigate("/dashboard");
    } else if (
      credentialsReduxData?.is_superuser == false &&
      credentialsReduxData?.is_staff == false
    ) {
      navigate("/all-services");
    }
  }, []);
  return props.element;
};

export default CheckUserLogin;
