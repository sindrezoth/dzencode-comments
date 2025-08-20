import { useState } from "react";
import Comment from "./Comment";

const CommentsList = () => {
  const [comments, setComments] = useState([1,2,3,4]);

  return (
    <ul className="comments-list">
      {
        comments.map((comment, i) => 
          <li key={i}>
            <Comment />
          </li>
        )
      }
    </ul>
  );
};

export default CommentsList;
