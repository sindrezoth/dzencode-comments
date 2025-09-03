import { useContext, useState, useRef, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const SignIn = ({ closeHandle, signToggle }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [{ isLoading, error }, setFetchState] = useState({
    isLoading: false,
    error: null,
  });
  const inputRef = useRef(null);

  const { setAuthed, setAccessToken } = useContext(AuthContext);

  async function submitHandle(e) {
    e.preventDefault();

    setFetchState((prev) => ({ ...prev, isLoading: true }));
    const { data, loading, error } = await axios
      .post("/api/signin", {
        usernameOrEmail,
      })
      .catch((error) => {
        setFetchState({ isLoading: false, error: error.response.data.message });
      });

    if (data && !loading && !error) {
      const { user, accessToken } = data;
      setAuthed(user);
      setAccessToken(accessToken);
      setUsernameOrEmail("");
      closeHandle();
    }
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
        {error && <p>{error}</p>}
        <form className="sign-form" onSubmit={submitHandle}>
          <label htmlFor="usernameoremail">username або email</label>
          <input
            id="usernameoremail"
            value={usernameOrEmail}
            ref={inputRef}
            placeholder="email або username"
            pattern="(^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$)|([\w\-]{5,20})"
            title="username повинен мати 6-20 символів (латиниця верхній або нижній регістр та '_')"
            required
            onChange={(e) => setUsernameOrEmail(e.target.value)}
          />
          {
            <button disabled={isLoading} type="submit">
              {isLoading ? "почекайте" : "увійти"}
            </button>
          }
        </form>
      </div>
      <div className="modal-footer">
        <p className="sign-toggle">
          немає акаунту? <button onClick={signToggle}>зареєструватись</button>
        </p>
      </div>
    </>
  );
};

export default SignIn;
