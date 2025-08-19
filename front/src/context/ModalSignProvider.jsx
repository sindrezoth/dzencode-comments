import { useContext, useEffect, useRef, useState } from "react";
import ModalSignContext from "./ModalSignContext";
import AuthContext from "./AuthContext";
import SignIn from "../components/account/SignIn";
import SignUp from "../components/account/SignUp";

const ModalSignProvider = ({ children }) => {
  const { authed } = useContext(AuthContext);

  const [isSignIn, setIsSignIn] = useState("in");
  const modalRef = useRef(null);

  useEffect(() => {
    const eventHandle = function (event) {
      if (event.target == modalRef.current) {
        modalRef.current.style.display = "none";
      }
    };
    window.addEventListener("click", eventHandle);

    return () => {
      window.removeEventListener("click", eventHandle);
    };
  }, []);

  function closeHandle() {
    modalRef.current.style.display = "none";
  }

  function signToggle() {
    setIsSignIn((prev) => (prev === "in" ? "up" : "in"));
  }

  function openSignIn() {
    setIsSignIn("in");
    modalRef.current.style.display = "block";
  }

  function openSignUp() {
    setIsSignIn("up");
    modalRef.current.style.display = "block";
  }

  return (
    <ModalSignContext.Provider
      value={{
        state: !authed ? "closed" : "disabled",
        openSignUp,
        openSignIn,
        close,
      }}
    >
      <div id="myModal" className="modal" ref={modalRef}>
        <div className="modal-content">
          {isSignIn === "in" ? (
            <SignIn closeHandle={closeHandle} signToggle={signToggle} />
          ) : (
            <SignUp closeHandle={closeHandle} signToggle={signToggle} />
          )}
        </div>
      </div>
      {children}
    </ModalSignContext.Provider>
  );
};
export default ModalSignProvider;
