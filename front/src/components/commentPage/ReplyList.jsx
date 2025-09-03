import CommentBlock from "./CommentBlock";

const ReplyList = ({ replyList }) => {
  return (
    <section className="comment-page-reply-list">
      <ul>
        {replyList.map((comment) => (
          <li className="comment-page-reply">
            <CommentBlock comment={comment} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ReplyList;
