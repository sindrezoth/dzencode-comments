import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const SignUp = ({ closeHandle, signToggle }) => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const { setAuthed, setAccessToken } = useContext(AuthContext);

  // console.log(authed);
  async function submitHandle(e) {
    e.preventDefault();

    // console.log(username, email);
    const headers = {
      "Content-Type": "application/json",
      authorization: "JWT fefege...",
    };
    const { data, loading, error } = await axios.post(
      "/api/signup",
      {
        username,
        email,
      },
      {
        headers,
        withCredentials: true,
      },
    );

    if (data && !error && !loading) {
      if (data.user) {
        setAuthed(data.user);
        setAccessToken(data.accessToken);
        setData(data);
        closeHandle();
      }
    } else {
      setData(null);
    }

    // console.log("submit");
  }

  return (
    <>
      <div className="modal-header">
        <span className="close" onClick={closeHandle}>
          &times;
        </span>
        <h2>Реєстрація</h2>
      </div>
      <div className="modal-body">
        <form className="sign-form" onSubmit={submitHandle}>
          <label htmlFor="username">username</label>
          <input
            autoFocus
            id="username"
            value={username}
            placeholder="username"
            pattern="[\w\-]{5,20}"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="email">email</label>
          <input
            id="email"
            value={email}
            placeholder="email"
            type="email"
            pattern="^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">зареєструватись</button>
        </form>
      </div>
      <div className="modal-footer">
        <p className="sign-toggle">
          вже є акаунт? <button onClick={signToggle}>увійти</button>
        </p>
      </div>
    </>
  );
};

export default SignUp;
