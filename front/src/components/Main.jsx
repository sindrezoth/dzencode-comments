import CommentsList from "./CommentsList";
import NewCommentForm from "./NewCommentForm";
import Login from "./Login";
import useFetch from "../hooks/useFetch";
import { useContext, useEffect } from "react";
import ModalSignContext from "../context/ModalSignContext";
import AuthContext from "../context/AuthContext";

const Main = () => {
  const { authed } = useContext(AuthContext);
  const { openSignUp, openSignIn } = useContext(ModalSignContext);

  return (
    <main>
      {
        !authed && 
          <>

            <button onClick={openSignUp}>
              SignUp
            </button>
            <button onClick={openSignIn}>
              SignIn
            </button>
          </>
      }
      {/* <Login /> */}
      {/* <DialogForm header="Увійти в акаунт" footer="або зареєструйся"> */}
      {/*   <h1>HEEELLOOO</h1> */}
      {/*   <h2>hey</h2> */}
      {/* <CommentsList /> */}
      {/* <NewCommentForm /> */}
    </main>
  );
};

export default Main;
