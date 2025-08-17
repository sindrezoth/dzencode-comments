import { useEffect, useRef, useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const SignDialog = () => {
  const [isSignIn, setIsSignIn] = useState(true);
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
  });

  function closeHandle() {
    modalRef.current.style.display = "none";
  }

  function signToggle() {
    setIsSignIn((prev) => !prev);
  }

  return (
    <>
      <div id="myModal" className="modal" ref={modalRef}>
        <div className="modal-content">
          {isSignIn ? (
            <SignIn closeHandle={closeHandle} signToggle={signToggle} />
          ) : (
            <SignUp closeHandle={closeHandle} signToggle={signToggle} />
          )}
        </div>
      </div>
      <button onClick={() => (modalRef.current.style.display = "block")}>
        open
      </button>
    </>
  );
};

export default SignDialog;
