import { useState, useRef, useEffect } from "react";
import FormattedComment from "./FormattedComment";
import { compute } from "../../helpers/traverseComment";

const Editor = () => {
  const [comment, setComment] = useState("");
  const [selection, setSelection] = useState({ start: null, end: null });
  const [selectedTags, setSelectedTags] = useState({
    list: [],
    start: 0,
    end: 0,
  });
  const [selectionAfterBtnClick, setSelectionAfterBtnClick] = useState({
    start: null,
    end: null,
  });
  const [showRaw, setShowRaw] = useState(true);
  const textareaRef = useRef(null);
  const [traverseComment, setTraverseComment] = useState([]);

  useEffect(() => {
    const saved = sessionStorage.getItem("comment");
    if (saved) {
      setComment(saved);
    }
  }, []);

  useEffect(() => {
    // war with selection
    // trying to place caret on right position after remove or adding text  NOT WORKING YET
    // console.log(selectedTags.start);
    // console.log(selectedTags.end);
    // console.log(selectionAfterBtnClick);
    textareaRef.current.focus();
    // console.log(selection);
    // console.log(traverseComment);
    // console.log(comment.slice(selectedTags.start, selectedTags.end));
    // console.log(selectionAfterBtnClick.start, selectionAfterBtnClick.end)
    // textareaRef.current.setSelectionRange(selectionAfterBtnClick.start, selectionAfterBtnClick.end);
  }, [selection]);

  function onChangeHandle(e) {
    // console.log(e.target.value);
    const result = compute(e.target.value);

    setTraverseComment(result);

    setSelectionAfterBtnClick({
      start: e.target.selectionStart,
      end: e.target.selectionEnd,
    });
    textareaRef.current.setSelectionRange(
      e.target.selectionStart,
      e.target.selectionEnd,
    );
    setComment(e.target.value);
    sessionStorage.setItem("comment", result.map(({ text }) => text).join(""));
  }

  function selectHandle(e) {
    const start = +e.target.selectionStart;
    const end = +e.target.selectionEnd;
    setSelection({ start, end });

    let startTag = start;
    let endTag = end ? end - 1 : 0;

    const textPartToLeft = comment.slice(0, startTag);
    startTag =
      textPartToLeft.length -
      [...textPartToLeft].reverse().findIndex((c) => c === "<") -
      1;
    const textPartToRight = comment.slice(endTag);
    endTag = endTag + textPartToRight.indexOf(">") + 1;

    let textsWithTags = comment.slice(startTag, endTag);

    if (/^<[^/.]*>$/.test(textsWithTags)) {
      const textPartToRight = comment.slice(endTag);

      endTag = endTag + textPartToRight.indexOf(">") + 1;
      textsWithTags = comment.slice(startTag, endTag);
    } else if (/^<\/.*>$/.test(textsWithTags)) {
      const textPartToLeft = comment.slice(0, startTag);

      startTag =
        textPartToLeft.length -
        [...textPartToLeft].reverse().findIndex((c) => c === "<") -
        1;
      textsWithTags = comment.slice(startTag, endTag);
    }
    setSelectedTags({
      list: [
        ...textsWithTags.matchAll(/<(.*)>(.|\n)*?<\/\1>/g),
        ...textsWithTags.matchAll(/<(a) href=("|').*\2>.*?<\/\1>/g),
      ],
      start: startTag,
      end: endTag,
    });
  }

  useEffect(() => {
    const result = compute(comment);

    setTraverseComment(result);
  }, [comment]);

  return (
    <>
      <button type="button" onClick={() => setShowRaw((p) => !p)}>
        {showRaw ? "formatted" : "raw"}
      </button>
      {showRaw ? (
        <div>
          {/* <EditorBtns */}
          {/*   selectedTags={selectedTags} */}
          {/*   setSelectedTags={setSelectedTags} */}
          {/*   selection={selection} */}
          {/*   setSelection={setSelection} */}
          {/*   setComment={setComment} */}
          {/*   setSelectionAfterBtnClick={setSelectionAfterBtnClick} */}
          {/*   textareaRef={textareaRef} */}
          {/* /> */}
          <textarea
            style={{ fontSize: "1.05rem" }}
            id="textareainput"
            onInput={onChangeHandle}
            value={comment}
            ref={textareaRef}
            onSelect={selectHandle}
          ></textarea>
        </div>
      ) : (
        <>
          <br />
          <FormattedComment commentParts={traverseComment} />
        </>
      )}
    </>
  );
};

export default Editor;
