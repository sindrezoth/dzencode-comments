import axios from "axios";
import { useEffect, useState } from "react";
import ReplyList from "./ReplyList";
import CommentBlock from "./CommentBlock";
import { useParams } from "react-router";

const CommentPage = () => {
  const [comment, setComment] = useState(null);
  const [replyList, setReplyList] = useState([]);
  const { id: commentId } = useParams();

  async function getComment(id) {
    let result = await axios.get(`/api/comments/${id}`);

    if (result.data) {
      setComment(result.data);
    }

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
  }, [commentId]);

  return (
    <div className="comment-page">
      {comment ? (
        <>
          <CommentBlock comment={comment} />
          {
            !!replyList.length &&
              <ReplyList replyList={replyList} />
          }
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CommentPage;
