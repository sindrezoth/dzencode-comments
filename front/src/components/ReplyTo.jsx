import { useParams } from "react-router";
import NewCommentForm from "./NewCommentForm";
import { useEffect, useState } from "react";
import axios from "axios";
import CommentBlock from "./commentPage/CommentBlock";

const ReplyTo = () => {
  const [replyTo, setReplyTo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function getReplyToComment() {
      try {
        const { data, statusText } = await axios.get("/api/comments/" + id);
        if (statusText === "OK") {
          setReplyTo(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getReplyToComment();
  }, []);

  return replyTo ? 
    <div className="reply-page-wrapper">
      <CommentBlock comment={replyTo} />
      <NewCommentForm replyTo={id} />
    </div>
    : <p>Loading...</p>
};

export default ReplyTo;
