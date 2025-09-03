import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router";
import ModalSignContext from "../../context/ModalSignContext";

const ReplyBtn = ({ commentId }) => {
  const { authed } = useContext(AuthContext);
  const { openSignIn, openSignUp } = useContext(ModalSignContext);
  return (
    <div>
      {authed ? (
        <Link to={`/comment/${commentId}/reply`}>Відповісти</Link>
      ) : (
        <p>
          щоб відповісти Вам треба
          <button
            className="comment-block-reply-btns"
            onClick={() => openSignUp()}
          >
            Зареєструватись
          </button>
          або
          <button
            className="comment-block-reply-btns"
            onClick={() => openSignIn()}
          >
            Увійти
          </button>
        </p>
      )}
    </div>
  );
};

export default ReplyBtn;
