import { useContext } from "react";
import ModalSignContext from "../context/ModalSignContext";
import AuthContext from "../context/AuthContext";
import { Link, NavLink } from "react-router";

const Header = () => {
  const { authed, logout } = useContext(AuthContext);
  const { openSignIn } = useContext(ModalSignContext);
  return (
    <header>
      <Link to="/">
        <h1 style={{ userSelect: "none" }}>Comments!</h1>
      </Link>
      <nav>
        <ul>
          <li>
            <NavLink to="/comments-table">Коментарі</NavLink>
          </li>
          <li>
            <NavLink to="/comment/new">Створити</NavLink>
          </li>
          <li>
            <NavLink to="generate">Згенерувати</NavLink>
          </li>
        </ul>
      </nav>
      <div className="header-authed">
        {authed && <p>Привіт, {authed.username}</p>}
        {!authed && <button onClick={openSignIn}>Увійти</button>}
        {authed && <button onClick={logout}>Вийти</button>}
      </div>
    </header>
  );
};

export default Header;
