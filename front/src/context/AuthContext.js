import { createContext } from "react";

const AuthContext = createContext({
  authed: null,
  setAuthed: () => {},
  accessToken: null,
  setAccessToken: () => {},
  logout: () => {}
});

export default AuthContext;
