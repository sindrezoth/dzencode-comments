import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const SignIn = ({ closeHandle, signToggle }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");

  const { authed, setAuthed, setAccessToken } = useContext(AuthContext);

  async function submitHandle(e) {
    e.preventDefault();

    const { data, loading, error } = await axios.post("/api/signin", {
      usernameOrEmail,
    });

    if (data && !loading && !error) {
      const { user, accessToken } = data;
      setAuthed(user.username);
      setAccessToken(accessToken);
      closeHandle()
    }

    console.log(data, loading, error);
  }

  return (
    <>
      <div className="modal-header">
        <span className="close" onClick={closeHandle}>
          &times;
        </span>
        <h2>Вхід в акаунт</h2>
      </div>
      <div className="modal-body">
        <form onSubmit={submitHandle}>
          <label htmlFor="usernameoremail">username or email</label>
          <input
            id="usernameoremail"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
          />
          <button type="submit">submit</button>
        </form>
      </div>
      <div className="modal-footer">
        <h3>
          немає акаунту? <button onClick={signToggle}>зареєструватись</button>
        </h3>
      </div>
    </>
  );
};

export default SignIn;
