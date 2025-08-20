import CommentsList from "./CommentsList";
import NewCommentForm from "./NewCommentForm";
import Login from "./Login";
import useFetch from "../hooks/useFetch";
import { useContext, useEffect } from "react";
import ModalSignContext from "../context/ModalSignContext";
import AuthContext from "../context/AuthContext";
import CommentsTable from "./CommentsTable";
import CommentPage from "./CommentPage";

const Main = () => {
  const { authed } = useContext(AuthContext);
  const { openSignUp, openSignIn } = useContext(ModalSignContext);

  return (
    <main>
      <CommentPage />
      {/* <CommentsTable /> */}
      {/* <CommentsList /> */}
      {/* <NewCommentForm /> */}
    </main>
  );
};

export default Main;
