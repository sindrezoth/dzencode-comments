import { useState, useRef, useEffect } from "react";

function format(command) {
  document.execCommand(command, false, null);
}

const Editor = () => {
  const [comment, setComment] = useState("");
  const [showRaw, setShowRaw] = useState(false);
  const editorRef = useRef(null);

  function onChangeHandle(e) {
    console.log(editorRef.current.innerHTML);
    setComment(editorRef.current.innerHTML);
  }

  return (
    <div className="editor-wrapper">
      <div className="editor-btns">
        <button
          className="editor-btn"
          type="button"
          onClick={() => setShowRaw((prev) => !prev)}
        >
          {showRaw ? "formatted" : "raw"}
        </button>
        <button className="editor-btn" type="button">
          <b>b</b>
        </button>
        <button className="editor-btn" type="button">
          <i>i</i>
        </button>
        <button className="editor-btn" type="button">
          l
        </button>
        <button className="editor-btn" type="button">
          code
        </button>
      </div>

      <div
        className="editor"
        ref={editorRef}
        onInput={onChangeHandle}
        contentEditable={true}
      ></div>
    </div>
  );
};

export default Editor;
