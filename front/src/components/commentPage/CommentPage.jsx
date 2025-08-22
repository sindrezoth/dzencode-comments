import axios from "axios";
import { useEffect, useState } from "react";
import ReplyList from "./ReplyList";
import CommentBlock from "./CommentBlock";

const CommentPage = ({ commentId }) => {
  const [comment, setComment] = useState(null);
  const [replyList, setReplyList] = useState([]);

  async function getComment(id) {
    let result = await axios.get(`/api/comments/${id}`);

    if (result.data) {
      setComment(result.data);
      console.log(result.data);
    }

    console.log(result.data.replyIds[0])
    if(result.data.replyIds[0]) {
      result = await axios.get(
        `/api/comments?commentsIds=${result.data.replyIds.join(",")}`,
      );

      if (result.data) {
        setReplyList(result.data);
      }
    }
    else {
      setReplyList([]);
    }
  }

  useEffect(() => {
    getComment(commentId);
  }, []);

  return (
    <div className="comment-page">
      {comment ? (
        <>
          <CommentBlock comment={comment} />
          <ReplyList getComment={getComment} replyList={replyList} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CommentPage;
