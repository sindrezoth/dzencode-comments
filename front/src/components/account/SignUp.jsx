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
      console.log(data);
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
        <form onSubmit={submitHandle}>
          <label htmlFor="username">username</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="email">email</label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">submit</button>
        </form>
      </div>
      <div className="modal-footer">
        <h3>
          вже є акаунт? <button onClick={signToggle}>увійти</button>
        </h3>
      </div>
    </>
  );
};

export default SignUp;
