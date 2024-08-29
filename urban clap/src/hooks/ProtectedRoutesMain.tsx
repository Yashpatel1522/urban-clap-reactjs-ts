import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

export const ProtectedRoutesMain = (props: {
    element: JSX.Element;
    allowedRoles: Array<string> | "";
}) => {
    const navigate = useNavigate()
    const credentialsReduxData = useSelector(
        (state: { credentials: { credentials: Record<string, unknown> } }) =>
            state.credentials.credentials
    );
    console.log(credentialsReduxData, "gggggggggggggggggggggggggggggggggggg")
    let role: string = "";
    useEffect(
        (): void => {
            console.log("first")
            if (credentialsReduxData == null) {
                return navigate("/signin")
            } else {
                if (credentialsReduxData?.is_superuser || credentialsReduxData?.is_staff) {
                    navigate("/dashboard")
                } else {
                    navigate("/all-services")
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
