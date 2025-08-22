const CommentBlock = ({ comment }) => {
  return (
    <div className="comment-page-wrapper">
      <div className="comment-page-header">
        <p>{comment.username}</p>
      </div>
      <p className="comment-page-body">{comment.text}</p>
    </div>
  );
};

export default CommentBlock;
