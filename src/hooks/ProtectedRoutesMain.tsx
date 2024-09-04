import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export const ProtectedRoutesMain = (props: {
    element: JSX.Element;
    allowedRoles: Array<string> | "";
}) => {
    const location = useLocation();
    const navigate = useNavigate()

    const credentialsReduxData = useSelector(
        (state: { credentials: { credentials: Record<string, unknown> } }) =>
            state.credentials.credentials
    );
    let role: string = "";
    useEffect(
        (): void => {
            if (credentialsReduxData == null) {
                return navigate("/signin")
            } else {
                if (location.pathname === "/") {
                    if (credentialsReduxData?.is_superuser || credentialsReduxData?.is_staff) {
                        navigate("/dashboard")
                    } else {
                        navigate("/all-services")
                    }
                } else {
                    navigate(location.pathname)
                }
            }

        }, []
    )
    if (credentialsReduxData) {
        if (credentialsReduxData?.is_superuser) {
            role = "admin";
        } else if (credentialsReduxData?.is_staff) {
            role = "sp";
        } else {
            role = "user";
        }
    } else {
        return <Navigate to="/signin" />;
    }

    if (props.allowedRoles != undefined && role != "") {
        if (!props.allowedRoles.includes(role)) {
            return <Navigate to="/unauthorised" />;
        }
    }
    return props.element;
};
