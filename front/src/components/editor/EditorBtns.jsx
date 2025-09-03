const EditorBtns = ({
  selectedTags,
  setSelectedTags,
  selection,
  setSelection,
  setComment,
  setSelectionAfterBtnClick,
  textareaRef,
}) => {
  function removeTags(tagName, text) {
    let result = text;
    setSelectionAfterBtnClick({ start: selection.start, end: selection.ent });

    if (selectedTags.list.length) {
      const st = selectedTags.list.filter((e) => e[1] === tagName);

      result = text.slice(0, selectedTags.start + st[0].index);

      for (let i = 0; i < st.length; i++) {
        if (tagName !== "a") {
          const ketchup = [
            ...text
              .slice(
                selectedTags.start + st[i].index,
                selectedTags.start + st[i].index + st[i][0].length,
              )
              .matchAll(/<(.*)>([\s\S\n]*)<\/\1>/g),
          ][0];

          setSelectionAfterBtnClick((prev) => ({
            start: prev.start - ketchup[1].length,
            end: prev.start - ketchup[1].length,
          }));

          result += ketchup[2] || "";
        } else {
          result +=
            [
              ...text
                .slice(
                  selectedTags.start + st[i].index,
                  selectedTags.start + st[i].index + st[i][0].length,
                )
                .matchAll(/<a href=('|")(.*)\1>.*<\/a>/g),
            ][0][2] || "";
        }

        result += text.slice(
          selectedTags.start + st[i].index + st[i][0].length,
          selectedTags.start + st[i + 1]?.index ||
            st[i].index + st[i][0].length,
        );
      }

      result += text.slice(
        selectedTags.start +
          st[st.length - 1].index +
          st[st.length - 1][0].length,
      );
    } else {
      if (tagName !== "a") {
        result = text.slice(0, selection.start);
        result += `<${tagName}>`;
        result += text.slice(selection.start, selection.end);
        result += `</${tagName}>`;
        result += text.slice(selection.end);
      } else {
        result = text.slice(0, selection.start);
        result += `<${tagName} href="${text.slice(selection.start, selection.end)}">`;
        result += text.slice(selection.start, selection.end);
        result += `</${tagName}>`;
        setSelectionAfterBtnClick({ start: result.length, end: result.length });
        result += text.slice(selection.end);
      }
    }

    return result;
  }

  return (
    <div>
      <button
        type="button"
        disabled={
          !!selectedTags.list.length &&
          selectedTags.list.map((st) => st[1]).includes("code")
        }
        className={`selection-formatting-btn ${selectedTags.list.map((st) => st[1]).includes("strong") ? "crossed" : ""}`}
        onClick={() => {
          setComment((prev) => {
            return removeTags("strong", prev);
          });
          setSelectedTags((prev) => ({ ...prev, list: [] }));
        }}
      >
        b
      </button>
      <button
        type="button"
        disabled={
          !!selectedTags.list.length &&
          selectedTags.list.map((st) => st[1]).includes("code")
        }
        className={`selection-formatting-btn ${selectedTags.list.map((st) => st[1]).includes("i") ? "crossed" : ""}`}
        onClick={() => {
          setComment((prev) => {
            return removeTags("i", prev);
          });
          setSelection({ start: 0, end: 0 });
          setSelectedTags((prev) => ({ ...prev, list: [] }));
        }}
      >
        i
      </button>
      <button
        type="button"
        disabled={
          !selectedTags.list
            .map((st) => st[1])
            .some((t) => t === "i" || t === "strong") &&
          !!selectedTags.list.length
        }
        className={`selection-formatting-btn ${selectedTags.list.map((st) => st[1]).includes("code") ? "crossed" : ""}`}
        onClick={() => {
          setComment((prev) => {
            return removeTags("code", prev);
          });
          setSelection({ start: 0, end: 0 });
          setSelectedTags((prev) => ({ ...prev, list: [] }));
        }}
      >
        code
      </button>
      <button
        type="button"
        disabled={
          !selectedTags.list.map((st) => st[1]).includes("a") &&
          !!selectedTags.list.length
        }
        className={`selection-formatting-btn ${selectedTags.list.map((st) => st[1]).includes("a") ? "crossed" : ""}`}
        onClick={() => {
          setComment((prev) => {
            return removeTags("a", prev);
          });
          setSelection({ start: 0, end: 0 });
          setSelectedTags((prev) => ({ ...prev, list: [] }));
          textareaRef.current.focus();
        }}
      >
        a
      </button>
    </div>
  );
};

export default EditorBtns;
