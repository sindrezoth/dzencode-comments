import { useContext, useState } from "react";
import Editor from "./editor/Editor";
import FileInput from "./editor/FileInput";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router";

const NewCommentForm = ({ replyTo }) => {
  const { authed } = useContext(AuthContext);
  const navigate = useNavigate();
  if(!authed) {
    navigate("/comments-table")
  }

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  async function submitHandle(e) {
    e.preventDefault();
    setLoading(true);

    const comment = localStorage.getItem("comment");
    if (comment || file) {
      const formData = new FormData();
      formData.append("user", authed);
      if (replyTo) {
        formData.append("replyTo", replyTo);
      }
      formData.append("comment", comment);
      formData.append("file", file);
      try {
        const result = await axios.post("/api/comments", formData);

        setLoading(false);
        setError(null);

        setSuccess(result.data.message);
        localStorage.removeItem("comment");
        if(replyTo) {
          navigate("/comment/" + replyTo);
        }
        else {
          console.log(result);
          navigate("/comment/" + result.data.newCommentId);
        }
      } catch (err) {
        setSuccess(null);
        setLoading(false);
        setError(err.message);
      }
    }
  }
  return (
    <>
      <div className="form-wrapper">
        <form onSubmit={submitHandle}>
          <Editor />
          <div className="form-footer">
            <FileInput selectedFile={file} setSelectedFile={setFile} />
            {error && <p>Помилка відправки: {error}</p>}
            {success && (
              <>
                <p>Успішно відправлено!</p>
                <p>{success}</p>
              </>
            )}
            {!loading && <button className="editor-submit" type="submit">Надіслати</button>}
          </div>
        </form>
      </div>
    </>
  );
};

export default NewCommentForm;
