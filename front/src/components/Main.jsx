import { useContext, useEffect } from "react";
import NewCommentForm from "./NewCommentForm";
import CommentsTable from "./commentsTable/CommentsTable";
import CommentPage from "./commentPage/CommentPage";
import { Routes, Route, Navigate } from "react-router";
import ReplyTo from "./ReplyTo";
import AuthBeforeReply from "./account/AuthBeforeReply";
import Error404 from "./Error404";
import LinkToOutside from "./LinkToOutside";
import GenerateDataForm from "./GenerateDataForm";

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="comment">
          <Route path="new" element={<NewCommentForm />} />
          <Route path=":id" element={<CommentPage commentId={60} />} />
          <Route path=":id/reply" element={<AuthBeforeReply />}>
            <Route index element={<ReplyTo />} />
          </Route>
        </Route>

        <Route path="comments-table">
          <Route path="" element={<Navigate to="/comments-table/1?sortBy=createdAt&asc=true" />} />
          <Route path=":page" element={<CommentsTable />} />
        </Route>

        <Route path="generate" element={<GenerateDataForm />} />

        <Route path="linkto/:url" element={<LinkToOutside />} />

        <Route exact path="/" element={<Navigate to="/comments-table/1?sortBy=createdAt&asc=true" />} />

        <Route exact path="not-found" element={<Error404 />} />

        <Route path="*" element={<Error404 />} />
      </Routes>
    </main>
  );
};

export default Main;
