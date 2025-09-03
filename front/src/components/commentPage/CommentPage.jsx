import axios from "axios";
import { useEffect, useState } from "react";
import ReplyList from "./ReplyList";
import CommentBlock from "./CommentBlock";
import { useNavigate, useParams } from "react-router";

const CommentPage = () => {
  const [comment, setComment] = useState(null);
  const [replyList, setReplyList] = useState([]);
  const { id: commentId } = useParams();
  const navigate = useNavigate();

  async function getComment(id) {
    try {
      let result = await axios.get(`/api/comments/${id}`);

      if (result.data) {
        setComment(result.data);
      }

      if (result.data.replies) {
        setReplyList(result.data.replies);
      } else {
        setReplyList([]);
      }
    }
    catch(err) {
      if(err.status === 404) {
        navigate("/not-found");
      }
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
          {!!replyList.length && <ReplyList replyList={replyList} />}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CommentPage;
