import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckUserLogin = (props: { element: JSX.Element }) => {
  const navigate = useNavigate();

  const user: Record<string, unknown> = JSON.parse(
    localStorage.getItem("creads") ?? "[]"
  );

  useEffect(() => {
    if (user?.is_superuser || user?.is_staff) {
      navigate("/dashboard");
    } else if (user?.is_superuser == false && user?.is_staff == false) {
      navigate("/all-services");
    }
  }, []);
  return props.element;
};

export default CheckUserLogin;
