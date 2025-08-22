import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [authed, setAuthed] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    async function tryAuth() {
      const headers = {
        "Content-Type": "application/json",
      };

      if (accessToken) {
        headers.authorization = `Bearer ${accessToken}`;
      }

      try {
        const { data } = await axios.get("/api/auth", {
          withCredentials: true,
          headers: headers,
        });

        // console.log(data);
        setAuthed(data.username);
        if (data.accessToken) {
          setAccessToken(data.accessToken);
        }
      } catch (err) {
        console.log(err);
      }
    }

    tryAuth();
  }, []);

  async function logout() {
    try {
      const { data } = await axios.get("/api/logout");

      console.log(data);
      setAuthed(data.username);
      if (data.accessToken) {
        setAccessToken(data.accessToken);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider
      value={{ authed, setAuthed, accessToken, setAccessToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
