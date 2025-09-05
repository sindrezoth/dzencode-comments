import { Link, useLocation } from "react-router";
import { traverse } from "../../helpers/traverseComment";
import FormattedComment from "../editor/FormattedComment";
import ReplyBtn from "./ReplyBtn";
import ImageModal from "./ImageModal";

const CommentBlock = ({ comment }) => {
  const { pathname } = useLocation();

  return (
    <div className="comment-page-wrapper">
      {!pathname.includes(comment.commentId) ? (
        <Link to={`/comment/${comment.commentId}`}>
          <div className="comment-page-header">
            <p>{comment.username}</p>
          </div>
        </Link>
      ) : (
        <div className="comment-page-header">
          <p>{comment.username}</p>
          {comment.replyTo && (
            <p>
              це відповідь&nbsp;
              <Link to={`/comment/${comment.replyTo}`}>цьому кометарю</Link>
            </p>
          )}
        </div>
      )}
      <div className="comment-page-body">
        <FormattedComment commentParts={traverse(comment.text)} />
        <div>
          {comment.attachedFilePath &&
            [/.png$/, /.gif$/, /.jpg$/].some((rgx) =>
              rgx.test(comment.attachedFilePath),
            ) && (
              <ImageModal>
                {(variant, openHandle) => (
                  <img
                    onClick={openHandle}
                    className={`comment-${variant}-image`}
                    alt={`attached image to comment with id: ${comment.commentId}`}
                    src={`/api/${comment.attachedFilePath}`}
                  />
                )}
              </ImageModal>
            )}
          {comment.attachedFilePath &&
            [/.txt$/].some((rgx) => rgx.test(comment.attachedFilePath)) && (
              <a targer="blank" href={`/api/${comment.attachedFilePath}`}>
                прикріплений файл
              </a>
            )}
        </div>
      </div>
      {!pathname.includes("reply") && (
        <ReplyBtn commentId={comment.commentId} />
      )}
    </div>
  );
};

export default CommentBlock;
