import CommentBlock from "./CommentBlock";

const ReplyList = ({getComment, replyList}) => {
  return (
      <section className="comment-page-reply-list">
      {
        replyList ? 
          <ul>
            {replyList.map((comment) => (
              <li onClick={() => getComment(comment.commentId)} className="comment-page-reply">
                <CommentBlock comment={comment} />
              </li>
            ))}
          </ul>
          : <p>Loading...</p>
      }
      </section>
  );
}

export default ReplyList;
