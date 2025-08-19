import { useContext } from "react";
import ModalSignContext from "../context/ModalSignContext";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const { authed, logout } = useContext(AuthContext);
  const { openSignIn } = useContext(ModalSignContext);
  return (
    <header>
      <h1>Comments!</h1>
      {
        !authed && 
        <button onClick={openSignIn}>SignIn</button>
      }
      {
        authed && 
        <button onClick={logout}>Logout</button>
      }
    </header>
  );
};

export default Header;
