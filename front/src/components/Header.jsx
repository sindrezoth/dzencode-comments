import { useContext } from "react";
import ModalSignContext from "../context/ModalSignContext";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const { authed, logout } = useContext(AuthContext);
  const { openSignIn } = useContext(ModalSignContext);
  return (
    <header>
      <h1>Comments!</h1>
      <div className="auth-btns">
        {
          !authed && 
          <button onClick={openSignIn}>Увійти</button>
        }
        {
          authed && 
          <button onClick={logout}>Вийти</button>
        }
      </div>
    </header>
  );
};

export default Header;
