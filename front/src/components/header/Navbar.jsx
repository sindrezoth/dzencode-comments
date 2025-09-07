import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import AuthContext from "../../context/AuthContext";
import ModalSignContext from "../../context/ModalSignContext";

const Navbar = () => {
  const [isOpened, setIsOpened] = useState(false);
  const { authed, logout } = useContext(AuthContext);
  const { openSignIn } = useContext(ModalSignContext);

  useEffect(() => {
    function dropdownOnClick(event) {
      if (!event.target.matches(".dropbtn")) {
        setIsOpened(false);
      }
    }

    window.addEventListener("click", dropdownOnClick);
    return () => window.removeEventListener("click", dropdownOnClick);
  }, []);

  return (
    <div className="dropdown">
      <button onClick={() => setIsOpened((p) => !p)} className="dropbtn">
        X
      </button>
      <nav className={`navbar-container ${isOpened ? "show" : ""}`}>
        <ul>
          <li>
            <NavLink to="/comments-table">Коментарі</NavLink>
          </li>
          {authed && (
            <li>
              <NavLink to="/comment/new">Створити</NavLink>
            </li>
          )}
          <li>
            <NavLink to="generate">Згенерувати</NavLink>
          </li>
          <li>
            <div className="header-authed">
              {authed && <p>{authed.username}</p>}
            </div>
            {!authed && <button onClick={openSignIn}>Увійти</button>}
            {authed && <button onClick={logout}>Вийти</button>}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
