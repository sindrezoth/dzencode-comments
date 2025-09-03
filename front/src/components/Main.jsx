import { useContext, useEffect } from "react";
import NewCommentForm from "./NewCommentForm";
import CommentsTable from "./commentsTable/CommentsTable";
import CommentPage from "./commentPage/CommentPage";
import { Routes, Route, Navigate } from "react-router";
import ReplyTo from "./ReplyTo";
import AuthBeforeReply from "./account/AuthBeforeReply";
import Error404 from "./Error404";
import LinkToOutside from "./LinkToOutside";

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/linkto/:url" element={<LinkToOutside />} />
        <Route exact path="/comment/new" element={<NewCommentForm />} />
        <Route
          path="/comments-table"
          element={<Navigate to="/comments-table/1" />}
        />
        <Route path="/comments-table/:page" element={<CommentsTable />} />
        <Route path="/comment/:id" element={<CommentPage commentId={60} />} />
        <Route path="/comment/:id/reply" element={<AuthBeforeReply />}>
          <Route index element={<ReplyTo />} />
        </Route>
        <Route exact path="/" element={<Navigate to="/comments-table/1" />} />
        <Route exact path="/not-found" element={<Error404 />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </main>
  );
};

export default Main;
