import { Link } from "react-router";
import CommentBlock from "./CommentBlock";

const ReplyList = ({ replyList }) => {
  return (
    <section className="comment-page-reply-list">
      <ul>
        {replyList.map((comment) => (
          <Link to={`/comment/${comment.commentId}`}>
            <li className="comment-page-reply">
              <CommentBlock comment={comment} />
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
};

export default ReplyList;
