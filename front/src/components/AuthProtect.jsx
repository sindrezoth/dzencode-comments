import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router";

const AuthProtect = ({ children }) => {
  const { authed } = useContext(AuthContext);
  if (!authed) {
    return <Navigate to="/comments-table" />;
  } else {
    return children;
  }
};

export default AuthProtect;
