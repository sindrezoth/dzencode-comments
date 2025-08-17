const SignUp = ({ closeHandle, signToggle }) => {
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
        <h2>Реєстрація</h2>
      </div>
      <div className="modal-body">
        <form onSubmit={submitHandle}>
          <label htmlFor="username">username</label>
          <input id="username" />
          <label htmlFor="email">email</label>
          <input id="email" />
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
