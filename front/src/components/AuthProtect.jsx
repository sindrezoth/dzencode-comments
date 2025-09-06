import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";

const AuthProtect = () => {
  const { authed } = useContext(AuthContext);
  if (!authed) {
    return <Navigate to="/comments-table"/>;
  } else {
    return <Outlet />;
  }
};

export default AuthProtect;
