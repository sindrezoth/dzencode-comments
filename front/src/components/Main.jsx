import NewCommentForm from "./NewCommentForm";
import Login from "./Login";
import useFetch from "../hooks/useFetch";
import { useContext, useEffect } from "react";
import ModalSignContext from "../context/ModalSignContext";
import AuthContext from "../context/AuthContext";
import CommentsTable from "./commentsTable/CommentsTable";
import CommentPage from "./commentPage/CommentPage";
import { Routes, Route, Navigate } from "react-router";

const Main = () => {
  const { authed } = useContext(AuthContext);
  const { openSignUp, openSignIn } = useContext(ModalSignContext);

  return (
    <main>
      <Routes>
        <Route path="/comment/new" element={<NewCommentForm replyTo={1}/>} />
        <Route path="/comment/:id" element={<CommentPage commentId={60} />} />
        <Route path="/comments-table" element={<Navigate to="/comments-table/1"/>} />
        <Route path="/comments-table/:page" element={<CommentsTable />} />
      </Routes>
      {/* <NewCommentForm /> */}
    </main>
  );
};

export default Main;
