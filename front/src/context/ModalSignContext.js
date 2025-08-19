import { createContext } from "react";

const ModalSignContext = createContext({
  state: "closed",
  openSignUp: () => {},
  openSignIn: () => {},
  close: () => {}
});

export default ModalSignContext;
