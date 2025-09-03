import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router";

const AuthBeforeReply = () => {
  const { authed } = useContext(AuthContext);
  const { pathname } = useLocation();
  console.log(authed);
  return authed ? (
    <Outlet />
  ) : (
    <Navigate to={pathname.replace(/\/reply$/, "")} />
  );
};

export default AuthBeforeReply;
