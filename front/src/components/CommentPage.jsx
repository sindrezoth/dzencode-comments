import axios from "axios";
import { useEffect, useState } from "react";

const CommentPage = () => {
  const [comment, setComment] = useState(null);
  useEffect(() => {
    async function getComment() {
      const result = await axios.get("/api/comments/random");

      if (result.data) {
        setComment(result.data.comment);
        console.log(result.data.comment);
      }
    }

    getComment();
  }, []);

  return <div>{comment ? <p>{comment.text}</p> : <p>Loading...</p>}</div>;
};

export default CommentPage;
