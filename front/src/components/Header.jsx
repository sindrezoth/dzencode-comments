import { Link } from "react-router";
import Navbar from "./header/Navbar";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <h1 style={{ userSelect: "none" }}>Comments!</h1>
      </Link>
      <Navbar />
    </header>
  );
};

export default Header;
