import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import userT from "../types/userT";
import { useDispatch } from "react-redux";
import { addCredentials } from "../reducer/userdata";
export interface IAuth {
  login: () => void;
}
const AuthContext = createContext<IAuth | null>(null);

export const AuthProvider = (props: { children: JSX.Element }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (userd: userT) => {
    dispatch(addCredentials(userd));
    if (userd.is_staff || userd.is_superuser) {
      navigate("/dashboard");
    } else if (userd.is_superuser == false && userd.is_staff == false) {
      navigate("/all-services");
    } else {
      navigate("/signin");
    }
  };

  const value = useMemo(
    () => ({
      login,
    }),
    []
  );
  return (
    <AuthContext.Provider value={value as unknown as IAuth}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
