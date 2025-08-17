const SignIn = ({ closeHandle, signToggle }) => {
  function submitHandle(e) {
    e.preventDefault();

    console.log("submit");
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
          <label htmlFor="username">username</label>
          <input id="username" />
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
