import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [authed, setAuthed] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    async function tryAuth() {
      const headers = {
        "Content-Type": "application/json",
      };

      if (accessToken) {
        headers.authorization = `Bearer ${accessToken}`;
      }

      await axios
        .get("/api/auth", {
          withCredentials: true,
          headers: headers,
        })
        .then(({ data }) => {
          setAuthed(data.user);
          if (data.accessToken) {
            setAccessToken(data.accessToken);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Увійдіть в аккаунт для більших можливостей!");
          setIsLoading(false);
        });
    }

    tryAuth();
  }, []);

  async function logout() {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/logout");

      setAuthed(null);
      if (data.accessToken) {
        setAccessToken(data.accessToken);
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        authed,
        setAuthed,
        accessToken,
        setAccessToken,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
